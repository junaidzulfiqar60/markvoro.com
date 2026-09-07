export type ChatRole = "system" | "user" | "assistant" | "tool";

export interface ChatMessage {
  role: ChatRole;
  content: string;
  // Set when role === "tool": which tool call this message answers.
  toolCallId?: string;
  toolName?: string;
}

export interface ToolDefinition {
  name: string;
  description: string;
  parameters: Record<string, unknown>; // JSON Schema
}

export interface ToolCall {
  id: string;
  name: string;
  arguments: Record<string, unknown>;
}

export interface LLMChatInput {
  systemPrompt: string;
  messages: ChatMessage[];
  tools: ToolDefinition[];
  temperature?: number;
  /** Provider-specific model id; each provider falls back to its own sensible default. */
  model?: string;
}

export interface LLMChatOutput {
  content: string;
  toolCalls: ToolCall[];
}

export interface LLMProvider {
  readonly name: string;
  chat(input: LLMChatInput): Promise<LLMChatOutput>;
}
