import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AnthropicProvider } from "./providers/anthropic.provider";
import { OpenAiProvider } from "./providers/openai.provider";
import { LLMProvider, ChatMessage } from "./providers/llm-provider.interface";
import { AGENT_TOOLS } from "./tools/tool-definitions";
import { ToolDispatcherService } from "./tools/tool-dispatcher.service";
import { RagService } from "./rag.service";
import { buildSystemPrompt } from "./system-prompt.builder";
import { ConversationPlatform } from "@prisma/client";

const MAX_TOOL_ITERATIONS = 4;
const HISTORY_WINDOW = 12;

export interface IncomingMessageParams {
  clientId: string;
  customerId: string;
  conversationId: string;
  platform: ConversationPlatform;
  text: string;
}

export interface OrchestratorResult {
  replyText: string | null;
  handedOff: boolean;
}

@Injectable()
export class AiOrchestratorService {
  private readonly logger = new Logger(AiOrchestratorService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly anthropic: AnthropicProvider,
    private readonly openai: OpenAiProvider,
    private readonly tools: ToolDispatcherService,
    private readonly rag: RagService,
  ) {}

  private providerFor(name: string | undefined): LLMProvider {
    return name === "openai" ? this.openai : this.anthropic;
  }

  private fallbackProviderFor(primary: LLMProvider): LLMProvider {
    return primary === this.anthropic ? this.openai : this.anthropic;
  }

  async handleIncomingMessage(params: IncomingMessageParams): Promise<OrchestratorResult> {
    const conversation = await this.prisma.conversation.findUniqueOrThrow({
      where: { id: params.conversationId },
    });

    await this.prisma.message.create({
      data: {
        conversationId: params.conversationId,
        sender: "CUSTOMER",
        content: params.text,
        platform: params.platform,
      },
    });

    if (conversation.mode === "HUMAN") {
      // A human already owns this thread — the AI stays quiet until it's handed back.
      return { replyText: null, handedOff: true };
    }

    const client = await this.prisma.client.findUniqueOrThrow({ where: { id: params.clientId } });
    const aiConfig = (client.aiConfig as Record<string, unknown>) ?? {};
    const provider = this.providerFor(aiConfig.provider as string | undefined);

    const retrieved = await this.rag.retrieveContext(params.clientId, params.text);
    const systemPrompt = buildSystemPrompt(client.businessName, aiConfig, retrieved);

    const history = await this.prisma.message.findMany({
      where: { conversationId: params.conversationId },
      orderBy: { createdAt: "desc" },
      take: HISTORY_WINDOW,
    });
    const messages: ChatMessage[] = history
      .reverse()
      .map((m) => ({
        role: m.sender === "CUSTOMER" ? "user" : m.sender === "AI" ? "assistant" : "assistant",
        content: m.content,
      }));

    let handedOff = false;
    let finalText = "";

    try {
      for (let iteration = 0; iteration < MAX_TOOL_ITERATIONS; iteration++) {
        const chatInput = {
          systemPrompt,
          messages,
          tools: AGENT_TOOLS,
          model: aiConfig.model as string | undefined,
        };
        let output;
        try {
          output = await provider.chat(chatInput);
        } catch (primaryErr) {
          // A configured second provider is a resilience net, not a routing choice —
          // only reached when the primary genuinely errors (bad key, outage, no credits).
          const fallback = this.fallbackProviderFor(provider);
          this.logger.warn(
            `${provider.name} failed, retrying once with ${fallback.name}: ${(primaryErr as Error).message}`,
          );
          output = await fallback.chat({ ...chatInput, model: undefined });
        }

        if (output.content) finalText += (finalText ? "\n" : "") + output.content;

        if (output.toolCalls.length === 0) break;

        messages.push({ role: "assistant", content: output.content });

        for (const call of output.toolCalls) {
          const result = await this.tools.execute(call, {
            clientId: params.clientId,
            customerId: params.customerId,
            conversationId: params.conversationId,
            platform: params.platform,
          });
          messages.push({
            role: "tool",
            content: result.resultForModel,
            toolCallId: result.toolCallId,
            toolName: result.toolName,
          });
          if (result.handoffTriggered) handedOff = true;
        }

        if (handedOff) break;
      }
    } catch (err) {
      this.logger.error("AI provider call failed", err as Error);
      finalText =
        "Sorry — our AI assistant isn't fully set up yet. A team member will follow up with you shortly.";
    }

    if (finalText) {
      await this.prisma.message.create({
        data: {
          conversationId: params.conversationId,
          sender: "AI",
          content: finalText,
          platform: params.platform,
        },
      });
    }

    return { replyText: finalText || null, handedOff };
  }
}
