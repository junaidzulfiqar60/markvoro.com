import { Inject, Injectable, Logger } from "@nestjs/common";
import { nanoid } from "nanoid";
import { PrismaService } from "../prisma/prisma.service";
import { EmbeddingProvider } from "./providers/embedding-provider.interface";
import { EMBEDDING_PROVIDER } from "./ai.tokens";

export interface RetrievedChunk {
  chunkText: string;
  documentTitle: string;
}

@Injectable()
export class RagService {
  private readonly logger = new Logger(RagService.name);

  constructor(
    private readonly prisma: PrismaService,
    @Inject(EMBEDDING_PROVIDER) private readonly embeddings: EmbeddingProvider,
  ) {}

  /** Splits on paragraph boundaries first, falling back to a hard character cap with overlap. */
  chunkText(text: string, maxChars = 1800, overlapChars = 200): string[] {
    const paragraphs = text
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter(Boolean);

    const chunks: string[] = [];
    let current = "";
    for (const para of paragraphs) {
      if ((current + "\n\n" + para).length <= maxChars) {
        current = current ? `${current}\n\n${para}` : para;
        continue;
      }
      if (current) chunks.push(current);
      if (para.length <= maxChars) {
        current = para;
      } else {
        // Single paragraph longer than the cap — hard-split with overlap.
        for (let i = 0; i < para.length; i += maxChars - overlapChars) {
          chunks.push(para.slice(i, i + maxChars));
        }
        current = "";
      }
    }
    if (current) chunks.push(current);
    return chunks;
  }

  async ingestDocument(documentId: string, clientId: string, text: string): Promise<void> {
    const chunks = this.chunkText(text);
    if (chunks.length === 0) {
      await this.prisma.knowledgeBaseDocument.update({
        where: { id: documentId },
        data: { status: "FAILED" },
      });
      return;
    }

    try {
      const vectors = this.embeddings.configured ? await this.embeddings.embed(chunks) : null;

      for (let i = 0; i < chunks.length; i++) {
        const id = nanoid();
        const vector = vectors?.[i] ?? null;
        if (vector) {
          await this.prisma.$executeRawUnsafe(
            `INSERT INTO "KbChunk" (id, "documentId", "clientId", "chunkText", embedding)
             VALUES ($1, $2, $3, $4, $5::vector)`,
            id,
            documentId,
            clientId,
            chunks[i],
            `[${vector.join(",")}]`,
          );
        } else {
          await this.prisma.$executeRawUnsafe(
            `INSERT INTO "KbChunk" (id, "documentId", "clientId", "chunkText", embedding)
             VALUES ($1, $2, $3, $4, NULL)`,
            id,
            documentId,
            clientId,
            chunks[i],
          );
        }
      }

      if (!vectors) {
        this.logger.warn(
          `Ingested document ${documentId} without embeddings (OPENAI_API_KEY unset) — falling back to keyword search only.`,
        );
      }

      await this.prisma.knowledgeBaseDocument.update({
        where: { id: documentId },
        data: { status: "READY" },
      });
    } catch (err) {
      this.logger.error(`Failed to ingest document ${documentId}`, err as Error);
      await this.prisma.knowledgeBaseDocument.update({
        where: { id: documentId },
        data: { status: "FAILED" },
      });
    }
  }

  async retrieveContext(clientId: string, query: string, topK = 5): Promise<RetrievedChunk[]> {
    if (this.embeddings.configured) {
      try {
        const [vector] = await this.embeddings.embed([query]);
        const rows = await this.prisma.$queryRawUnsafe<Array<{ chunkText: string; title: string }>>(
          `SELECT c."chunkText" as "chunkText", d.title as title
           FROM "KbChunk" c
           JOIN "KnowledgeBaseDocument" d ON d.id = c."documentId"
           WHERE c."clientId" = $1 AND c.embedding IS NOT NULL
           ORDER BY c.embedding <=> $2::vector
           LIMIT $3`,
          clientId,
          `[${vector.join(",")}]`,
          topK,
        );
        if (rows.length > 0) return rows.map((r) => ({ chunkText: r.chunkText, documentTitle: r.title }));
      } catch (err) {
        this.logger.error("Semantic retrieval failed, falling back to keyword search.", err as Error);
      }
    }

    // Keyword fallback — either embeddings aren't configured, or semantic search errored.
    const keywords = query
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 3)
      .slice(0, 6);
    if (keywords.length === 0) return [];

    const rows = await this.prisma.kbChunk.findMany({
      where: {
        clientId,
        OR: keywords.map((k) => ({ chunkText: { contains: k, mode: "insensitive" as const } })),
      },
      include: { document: { select: { title: true } } },
      take: topK,
    });
    return rows.map((r) => ({ chunkText: r.chunkText, documentTitle: r.document.title }));
  }
}
