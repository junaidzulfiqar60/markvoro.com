import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AiOrchestratorService } from "../ai/ai-orchestrator.service";

@Injectable()
export class WidgetService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly orchestrator: AiOrchestratorService,
  ) {}

  private async resolveClient(widgetKey: string) {
    const client = await this.prisma.client.findUnique({ where: { widgetKey } });
    if (!client || client.status === "SUSPENDED") {
      throw new NotFoundException("This chat widget is not available.");
    }
    return client;
  }

  private async findOrCreateCustomer(clientId: string, sessionId: string) {
    const existing = await this.prisma.customer.findFirst({
      where: { clientId, platformIds: { path: ["webSessionId"], equals: sessionId } },
    });
    if (existing) return existing;
    return this.prisma.customer.create({
      data: { clientId, platformIds: { webSessionId: sessionId } },
    });
  }

  private async findOrCreateOpenConversation(clientId: string, customerId: string) {
    const existing = await this.prisma.conversation.findFirst({
      where: { clientId, customerId, platform: "WEB", status: { in: ["OPEN", "ESCALATED"] } },
      orderBy: { createdAt: "desc" },
    });
    if (existing) return existing;
    return this.prisma.conversation.create({
      data: { clientId, customerId, platform: "WEB" },
    });
  }

  async getHistory(widgetKey: string, sessionId: string) {
    const client = await this.resolveClient(widgetKey);
    const customer = await this.prisma.customer.findFirst({
      where: { clientId: client.id, platformIds: { path: ["webSessionId"], equals: sessionId } },
    });
    if (!customer) return { messages: [] };

    const conversation = await this.prisma.conversation.findFirst({
      where: { clientId: client.id, customerId: customer.id, platform: "WEB" },
      orderBy: { createdAt: "desc" },
    });
    if (!conversation) return { messages: [] };

    const messages = await this.prisma.message.findMany({
      where: { conversationId: conversation.id },
      orderBy: { createdAt: "asc" },
    });
    return { messages, mode: conversation.mode };
  }

  async sendMessage(widgetKey: string, sessionId: string, text: string) {
    const client = await this.resolveClient(widgetKey);
    const customer = await this.findOrCreateCustomer(client.id, sessionId);
    const conversation = await this.findOrCreateOpenConversation(client.id, customer.id);

    const result = await this.orchestrator.handleIncomingMessage({
      clientId: client.id,
      customerId: customer.id,
      conversationId: conversation.id,
      platform: "WEB",
      text,
    });

    return result;
  }
}
