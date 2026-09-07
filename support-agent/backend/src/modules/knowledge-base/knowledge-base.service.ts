import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { RagService } from "../ai/rag.service";
import { CreateDocumentDto } from "./dto/create-document.dto";

@Injectable()
export class KnowledgeBaseService {
  private readonly logger = new Logger(KnowledgeBaseService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly rag: RagService,
  ) {}

  async list(clientId: string) {
    return this.prisma.knowledgeBaseDocument.findMany({
      where: { clientId },
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true, sourceType: true, status: true, createdAt: true },
    });
  }

  async create(clientId: string, dto: CreateDocumentDto) {
    let text = dto.text;

    if (dto.sourceType === "url") {
      if (!dto.url) throw new BadRequestException("url is required for sourceType 'url'.");
      text = await this.fetchAndExtractText(dto.url);
    }

    if (!text || text.trim().length < 10) {
      throw new BadRequestException("No usable text content to ingest.");
    }

    const doc = await this.prisma.knowledgeBaseDocument.create({
      data: {
        clientId,
        title: dto.title,
        sourceType: dto.sourceType,
        rawText: text,
        status: "PROCESSING",
      },
    });

    // Fire-and-forget: ingestion runs async so the upload request returns immediately.
    // A failed ingestion lands the document in FAILED status, visible in the dashboard.
    this.rag.ingestDocument(doc.id, clientId, text).catch((err) => {
      this.logger.error(`Background ingestion failed for document ${doc.id}`, err as Error);
    });

    return doc;
  }

  async delete(clientId: string, documentId: string) {
    const doc = await this.prisma.knowledgeBaseDocument.findFirst({ where: { id: documentId, clientId } });
    if (!doc) throw new NotFoundException("Document not found.");
    await this.prisma.knowledgeBaseDocument.delete({ where: { id: documentId } });
    return { success: true };
  }

  private async fetchAndExtractText(url: string): Promise<string> {
    let parsed: URL;
    try {
      parsed = new URL(url);
    } catch {
      throw new BadRequestException("Invalid URL.");
    }
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      throw new BadRequestException("Only http(s) URLs are supported.");
    }

    const response = await fetch(parsed.toString(), { signal: AbortSignal.timeout(10_000) });
    if (!response.ok) throw new BadRequestException(`Could not fetch that URL (status ${response.status}).`);
    const html = await response.text();

    // Minimal, dependency-free HTML→text: strip scripts/styles/tags, collapse whitespace.
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    return text.slice(0, 50_000); // cap a single page's contribution
  }
}
