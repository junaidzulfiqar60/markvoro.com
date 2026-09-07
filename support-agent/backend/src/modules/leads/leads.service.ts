import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UpdateLeadDto } from "./dto/update-lead.dto";

@Injectable()
export class LeadsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(clientId: string, status?: string) {
    return this.prisma.lead.findMany({
      where: { clientId, ...(status ? { status: status as never } : {}) },
      orderBy: { createdAt: "desc" },
      include: { customer: { select: { phone: true, email: true } }, assignedTo: { select: { name: true } } },
    });
  }

  async update(clientId: string, leadId: string, dto: UpdateLeadDto) {
    const lead = await this.prisma.lead.findFirst({ where: { id: leadId, clientId } });
    if (!lead) throw new NotFoundException("Lead not found.");
    return this.prisma.lead.update({ where: { id: leadId }, data: dto });
  }
}
