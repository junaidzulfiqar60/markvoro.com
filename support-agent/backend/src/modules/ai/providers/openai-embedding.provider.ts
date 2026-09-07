import { Injectable } from "@nestjs/common";
import OpenAI from "openai";
import { EmbeddingProvider } from "./embedding-provider.interface";

@Injectable()
export class OpenAiEmbeddingProvider implements EmbeddingProvider {
  readonly dimensions = 1536;
  private client: OpenAI | null = null;

  get configured(): boolean {
    return Boolean(process.env.OPENAI_API_KEY);
  }

  async embed(texts: string[]): Promise<number[][]> {
    if (!this.configured) {
      throw new Error("OPENAI_API_KEY is not set — knowledge-base embeddings are unavailable.");
    }
    if (!this.client) this.client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await this.client.embeddings.create({
      model: "text-embedding-3-small",
      input: texts,
    });
    return response.data.map((d) => d.embedding);
  }
}
