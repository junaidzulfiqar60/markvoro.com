import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class TicketsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    clientId: string,
    customerId: string,
    description: string,
    priority: "LOW" | "NORMAL" | "HIGH" | "URGENT" = "NORMAL",
  ) {
    const client = await this.prisma.client.findUniqueOrThrow({ where: { id: clientId } });
    const slug = client.businessName
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 6) || "MKV";
    const count = await this.prisma.supportTicket.count({ where: { clientId } });
    const ticketNumber = `TCK-${slug}-${String(count + 1).padStart(4, "0")}`;

    return this.prisma.supportTicket.create({
      data: { clientId, customerId, description, priority, ticketNumber },
    });
  }

  async list(clientId: string, status?: string) {
    return this.prisma.supportTicket.findMany({
      where: { clientId, ...(status ? { status: status as never } : {}) },
      orderBy: { createdAt: "desc" },
      include: {
        customer: { select: { name: true, phone: true, email: true } },
        assignedTo: { select: { name: true } },
      },
    });
  }

  async update(
    clientId: string,
    ticketId: string,
    data: { status?: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED"; priority?: "LOW" | "NORMAL" | "HIGH" | "URGENT"; assignedToId?: string },
  ) {
    const ticket = await this.prisma.supportTicket.findFirst({ where: { id: ticketId, clientId } });
    if (!ticket) throw new NotFoundException("Ticket not found.");
    return this.prisma.supportTicket.update({ where: { id: ticketId }, data });
  }
}
