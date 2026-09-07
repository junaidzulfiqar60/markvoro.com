import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async overview(clientId: string) {
    const [
      totalConversations,
      openConversations,
      totalLeads,
      newLeads,
      kbDocuments,
      openTickets,
      upcomingAppointments,
      recentConversations,
    ] = await Promise.all([
      this.prisma.conversation.count({ where: { clientId } }),
      this.prisma.conversation.count({ where: { clientId, status: "OPEN" } }),
      this.prisma.lead.count({ where: { clientId } }),
      this.prisma.lead.count({ where: { clientId, status: "NEW" } }),
      this.prisma.knowledgeBaseDocument.count({ where: { clientId, status: "READY" } }),
      this.prisma.supportTicket.count({ where: { clientId, status: { in: ["OPEN", "IN_PROGRESS"] } } }),
      this.prisma.appointment.count({ where: { clientId, status: "CONFIRMED", scheduledAt: { gte: new Date() } } }),
      this.prisma.conversation.findMany({
        where: { clientId },
        orderBy: { updatedAt: "desc" },
        take: 5,
        include: { customer: { select: { name: true, phone: true } } },
      }),
    ]);

    return {
      totalConversations,
      openConversations,
      totalLeads,
      newLeads,
      kbDocuments,
      openTickets,
      upcomingAppointments,
      recentConversations,
    };
  }
}
