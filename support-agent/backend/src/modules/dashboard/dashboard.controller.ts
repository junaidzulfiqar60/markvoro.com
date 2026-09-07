import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../common/jwt-auth.guard";
import { RolesGuard } from "../../common/roles.guard";
import { CurrentUser } from "../../common/current-user.decorator";
import { SessionPayload } from "../../common/auth.types";
import { assertTenantAccess } from "../../common/tenant.util";
import { DashboardService } from "./dashboard.service";

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("clients/:clientId/dashboard")
export class DashboardController {
  constructor(private readonly dashboard: DashboardService) {}

  @Get("overview")
  overview(@CurrentUser() user: SessionPayload, @Param("clientId") clientId: string) {
    assertTenantAccess(user, clientId);
    return this.dashboard.overview(clientId);
  }
}
