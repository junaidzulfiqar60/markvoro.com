import { Body, Controller, Get, Param, Patch, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../common/jwt-auth.guard";
import { RolesGuard } from "../../common/roles.guard";
import { CurrentUser } from "../../common/current-user.decorator";
import { SessionPayload } from "../../common/auth.types";
import { assertTenantAccess } from "../../common/tenant.util";
import { TicketsService } from "./tickets.service";
import { UpdateTicketDto } from "./dto/update-ticket.dto";

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("clients/:clientId/tickets")
export class TicketsController {
  constructor(private readonly tickets: TicketsService) {}

  @Get()
  list(
    @CurrentUser() user: SessionPayload,
    @Param("clientId") clientId: string,
    @Query("status") status?: string,
  ) {
    assertTenantAccess(user, clientId);
    return this.tickets.list(clientId, status);
  }

  @Patch(":ticketId")
  update(
    @CurrentUser() user: SessionPayload,
    @Param("clientId") clientId: string,
    @Param("ticketId") ticketId: string,
    @Body() dto: UpdateTicketDto,
  ) {
    assertTenantAccess(user, clientId);
    return this.tickets.update(clientId, ticketId, dto);
  }
}
