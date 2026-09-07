import { Injectable } from "@nestjs/common";
import OpenAI from "openai";
import { ChatCompletionMessageParam, ChatCompletionTool } from "openai/resources";
import { ChatMessage, LLMChatInput, LLMChatOutput, LLMProvider, ToolCall } from "./llm-provider.interface";

@Injectable()
export class OpenAiProvider implements LLMProvider {
  readonly name = "openai";
  private client: OpenAI | null = null;

  private getClient(): OpenAI {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not set — the AI agent cannot respond until it's configured.");
    }
    if (!this.client) this.client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    return this.client;
  }

  async chat(input: LLMChatInput): Promise<LLMChatOutput> {
    const client = this.getClient();
    const model = input.model ?? "gpt-4o-mini";

    const messages: ChatCompletionMessageParam[] = [
      { role: "system", content: input.systemPrompt },
      ...input.messages.map((m) => this.toOpenAiMessage(m)),
    ];

    const tools: ChatCompletionTool[] = input.tools.map((t) => ({
      type: "function",
      function: { name: t.name, description: t.description, parameters: t.parameters },
    }));

    const response = await client.chat.completions.create({
      model,
      temperature: input.temperature ?? 0.4,
      messages,
      tools: tools.length ? tools : undefined,
    });

    const choice = response.choices[0]?.message;
    const toolCalls: ToolCall[] = (choice?.tool_calls ?? []).map((tc) => ({
      id: tc.id,
      name: tc.function.name,
      arguments: JSON.parse(tc.function.arguments || "{}"),
    }));

    return { content: choice?.content ?? "", toolCalls };
  }

  private toOpenAiMessage(m: ChatMessage): ChatCompletionMessageParam {
    if (m.role === "tool") {
      return { role: "tool", tool_call_id: m.toolCallId!, content: m.content };
    }
    return { role: m.role, content: m.content };
  }
}
