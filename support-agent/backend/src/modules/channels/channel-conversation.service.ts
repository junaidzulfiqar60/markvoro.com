import { Injectable } from "@nestjs/common";
import { ConversationPlatform } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { AiOrchestratorService } from "../ai/ai-orchestrator.service";

@Injectable()
export class ChannelConversationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly orchestrator: AiOrchestratorService,
  ) {}

  async findOrCreateCustomerByPhone(clientId: string, phone: string) {
    const existing = await this.prisma.customer.findFirst({ where: { clientId, phone } });
    if (existing) return existing;
    return this.prisma.customer.create({ data: { clientId, phone, optInAt: new Date() } });
  }

  async findOrCreateCustomerByPlatformId(clientId: string, key: "messengerPsid" | "instagramPsid", value: string) {
    const existing = await this.prisma.customer.findFirst({
      where: { clientId, platformIds: { path: [key], equals: value } },
    });
    if (existing) return existing;
    return this.prisma.customer.create({ data: { clientId, platformIds: { [key]: value } } });
  }

  async findOrCreateOpenConversation(clientId: string, customerId: string, platform: ConversationPlatform) {
    const existing = await this.prisma.conversation.findFirst({
      where: { clientId, customerId, platform, status: { in: ["OPEN", "ESCALATED"] } },
      orderBy: { createdAt: "desc" },
    });
    if (existing) return existing;
    return this.prisma.conversation.create({ data: { clientId, customerId, platform } });
  }

  async handleInboundText(
    clientId: string,
    customerId: string,
    platform: ConversationPlatform,
    text: string,
  ): Promise<{ replyText: string | null }> {
    const conversation = await this.findOrCreateOpenConversation(clientId, customerId, platform);
    const result = await this.orchestrator.handleIncomingMessage({
      clientId,
      customerId,
      conversationId: conversation.id,
      platform,
      text,
    });
    return { replyText: result.replyText };
  }
}
