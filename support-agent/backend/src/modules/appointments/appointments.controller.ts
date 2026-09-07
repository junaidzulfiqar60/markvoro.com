import { Body, Controller, Get, Param, Patch, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../common/jwt-auth.guard";
import { RolesGuard } from "../../common/roles.guard";
import { CurrentUser } from "../../common/current-user.decorator";
import { SessionPayload } from "../../common/auth.types";
import { assertTenantAccess } from "../../common/tenant.util";
import { AppointmentsService } from "./appointments.service";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("clients/:clientId/appointments")
export class AppointmentsController {
  constructor(private readonly appointments: AppointmentsService) {}

  @Get()
  list(
    @CurrentUser() user: SessionPayload,
    @Param("clientId") clientId: string,
    @Query("status") status?: string,
  ) {
    assertTenantAccess(user, clientId);
    return this.appointments.list(clientId, status);
  }

  @Patch(":appointmentId")
  updateStatus(
    @CurrentUser() user: SessionPayload,
    @Param("clientId") clientId: string,
    @Param("appointmentId") appointmentId: string,
    @Body() dto: UpdateAppointmentDto,
  ) {
    assertTenantAccess(user, clientId);
    return this.appointments.updateStatus(clientId, appointmentId, dto.status);
  }
}
