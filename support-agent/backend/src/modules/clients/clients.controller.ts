import { Body, Controller, ForbiddenException, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../common/jwt-auth.guard";
import { RolesGuard } from "../../common/roles.guard";
import { Roles } from "../../common/roles.decorator";
import { CurrentUser } from "../../common/current-user.decorator";
import { SessionPayload } from "../../common/auth.types";
import { assertTenantAccess } from "../../common/tenant.util";
import { ClientsService } from "./clients.service";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateAiConfigDto } from "./dto/update-ai-config.dto";

function assertSuperAdmin(user: SessionPayload) {
  if (user.role !== "SUPER_ADMIN") {
    throw new ForbiddenException("Super Admin only.");
  }
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class ClientsController {
  constructor(private readonly clients: ClientsService) {}

  // Platform (Super Admin only)
  @Post("platform/clients")
  create(@CurrentUser() user: SessionPayload, @Body() dto: CreateClientDto) {
    assertSuperAdmin(user);
    return this.clients.create(dto);
  }

  @Get("platform/clients")
  listForPlatform(@CurrentUser() user: SessionPayload) {
    assertSuperAdmin(user);
    return this.clients.listForPlatform();
  }

  // Client-scoped
  @Get("clients/:clientId")
  getOne(@CurrentUser() user: SessionPayload, @Param("clientId") clientId: string) {
    assertTenantAccess(user, clientId);
    return this.clients.getById(clientId);
  }

  @Roles("CLIENT_ADMIN")
  @Patch("clients/:clientId/ai-config")
  updateAiConfig(
    @CurrentUser() user: SessionPayload,
    @Param("clientId") clientId: string,
    @Body() dto: UpdateAiConfigDto,
  ) {
    assertTenantAccess(user, clientId);
    return this.clients.updateAiConfig(clientId, dto);
  }
}
