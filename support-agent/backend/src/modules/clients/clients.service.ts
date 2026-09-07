import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateAiConfigDto } from "./dto/update-ai-config.dto";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateClientDto) {
    const passwordHash = await AuthService.hashPassword(dto.adminPassword);
    return this.prisma.client.create({
      data: {
        businessName: dto.businessName,
        contactEmail: dto.contactEmail,
        contactPhone: dto.contactPhone,
        adminUsers: {
          create: {
            name: dto.adminName,
            email: dto.adminEmail,
            passwordHash,
            role: "CLIENT_ADMIN",
          },
        },
      },
      include: { adminUsers: true },
    });
  }

  async listForPlatform() {
    return this.prisma.client.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        businessName: true,
        plan: true,
        status: true,
        createdAt: true,
        _count: { select: { conversations: true, leads: true } },
      },
    });
  }

  async getById(clientId: string) {
    const client = await this.prisma.client.findUnique({ where: { id: clientId } });
    if (!client) throw new NotFoundException("Client not found.");
    return client;
  }

  async updateAiConfig(clientId: string, dto: UpdateAiConfigDto) {
    const client = await this.getById(clientId);
    const current = (client.aiConfig as Record<string, unknown>) ?? {};
    return this.prisma.client.update({
      where: { id: clientId },
      data: { aiConfig: { ...current, ...dto } },
    });
  }
}
