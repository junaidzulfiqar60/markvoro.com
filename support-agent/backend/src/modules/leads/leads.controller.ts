import { Body, Controller, Get, Param, Patch, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../common/jwt-auth.guard";
import { RolesGuard } from "../../common/roles.guard";
import { Roles } from "../../common/roles.decorator";
import { CurrentUser } from "../../common/current-user.decorator";
import { SessionPayload } from "../../common/auth.types";
import { assertTenantAccess } from "../../common/tenant.util";
import { LeadsService } from "./leads.service";
import { UpdateLeadDto } from "./dto/update-lead.dto";

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("clients/:clientId/leads")
export class LeadsController {
  constructor(private readonly leads: LeadsService) {}

  @Get()
  list(
    @CurrentUser() user: SessionPayload,
    @Param("clientId") clientId: string,
    @Query("status") status?: string,
  ) {
    assertTenantAccess(user, clientId);
    return this.leads.list(clientId, status);
  }

  @Roles("CLIENT_ADMIN", "SALES_AGENT")
  @Patch(":leadId")
  update(
    @CurrentUser() user: SessionPayload,
    @Param("clientId") clientId: string,
    @Param("leadId") leadId: string,
    @Body() dto: UpdateLeadDto,
  ) {
    assertTenantAccess(user, clientId);
    return this.leads.update(clientId, leadId, dto);
  }
}
