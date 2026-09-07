export interface EmbeddingProvider {
  readonly dimensions: number;
  readonly configured: boolean;
  embed(texts: string[]): Promise<number[][]>;
}
