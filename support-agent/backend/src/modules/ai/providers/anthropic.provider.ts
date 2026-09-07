import { Injectable, Logger } from "@nestjs/common";
import Anthropic from "@anthropic-ai/sdk";
import { ChatMessage, LLMChatInput, LLMChatOutput, LLMProvider, ToolCall } from "./llm-provider.interface";

@Injectable()
export class AnthropicProvider implements LLMProvider {
  readonly name = "anthropic";
  private readonly logger = new Logger(AnthropicProvider.name);
  private client: Anthropic | null = null;

  private getClient(): Anthropic {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error(
        "ANTHROPIC_API_KEY is not set — the AI agent cannot respond until it's configured.",
      );
    }
    if (!this.client) {
      this.client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    }
    return this.client;
  }

  async chat(input: LLMChatInput): Promise<LLMChatOutput> {
    const client = this.getClient();
    const model = input.model ?? "claude-haiku-4-5";

    const messages = input.messages
      .filter((m) => m.role !== "system")
      .map((m) => this.toAnthropicMessage(m));

    const response = await client.messages.create({
      model,
      max_tokens: 1024,
      temperature: input.temperature ?? 0.4,
      system: input.systemPrompt,
      messages,
      tools: input.tools.map((t) => ({
        name: t.name,
        description: t.description,
        input_schema: t.parameters as Anthropic.Tool.InputSchema,
      })),
    });

    let content = "";
    const toolCalls: ToolCall[] = [];
    for (const block of response.content) {
      if (block.type === "text") content += block.text;
      if (block.type === "tool_use") {
        toolCalls.push({ id: block.id, name: block.name, arguments: block.input as Record<string, unknown> });
      }
    }
    return { content, toolCalls };
  }

  private toAnthropicMessage(m: ChatMessage): Anthropic.MessageParam {
    if (m.role === "tool") {
      return {
        role: "user",
        content: [
          {
            type: "tool_result",
            tool_use_id: m.toolCallId!,
            content: m.content,
          },
        ],
      };
    }
    return { role: m.role === "assistant" ? "assistant" : "user", content: m.content };
  }
}
