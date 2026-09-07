import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ConversationsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(clientId: string, status?: string) {
    return this.prisma.conversation.findMany({
      where: { clientId, ...(status ? { status: status as never } : {}) },
      orderBy: { updatedAt: "desc" },
      include: {
        customer: { select: { name: true, phone: true, email: true } },
        assignedAgent: { select: { name: true } },
        messages: { orderBy: { createdAt: "desc" }, take: 1 },
      },
    });
  }

  async getMessages(clientId: string, conversationId: string) {
    const conversation = await this.prisma.conversation.findFirst({
      where: { id: conversationId, clientId },
    });
    if (!conversation) throw new NotFoundException("Conversation not found.");

    const messages = await this.prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
    });
    return { conversation, messages };
  }

  async sendHumanReply(clientId: string, conversationId: string, agentId: string, content: string) {
    const conversation = await this.prisma.conversation.findFirst({
      where: { id: conversationId, clientId },
    });
    if (!conversation) throw new NotFoundException("Conversation not found.");

    return this.prisma.message.create({
      data: {
        conversationId,
        sender: "HUMAN_AGENT",
        content,
        platform: conversation.platform,
      },
    });
  }

  async assign(clientId: string, conversationId: string, agentId: string) {
    const conversation = await this.prisma.conversation.findFirst({
      where: { id: conversationId, clientId },
    });
    if (!conversation) throw new NotFoundException("Conversation not found.");
    return this.prisma.conversation.update({
      where: { id: conversationId },
      data: { assignedAgentId: agentId, mode: "HUMAN" },
    });
  }

  async close(clientId: string, conversationId: string) {
    const conversation = await this.prisma.conversation.findFirst({
      where: { id: conversationId, clientId },
    });
    if (!conversation) throw new NotFoundException("Conversation not found.");
    return this.prisma.conversation.update({
      where: { id: conversationId },
      data: { status: "CLOSED" },
    });
  }

  async reopenToAi(clientId: string, conversationId: string) {
    const conversation = await this.prisma.conversation.findFirst({
      where: { id: conversationId, clientId },
    });
    if (!conversation) throw new NotFoundException("Conversation not found.");
    return this.prisma.conversation.update({
      where: { id: conversationId },
      data: { mode: "AI", status: "OPEN" },
    });
  }
}
