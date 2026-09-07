import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../common/jwt-auth.guard";
import { RolesGuard } from "../../common/roles.guard";
import { Roles } from "../../common/roles.decorator";
import { CurrentUser } from "../../common/current-user.decorator";
import { SessionPayload } from "../../common/auth.types";
import { assertTenantAccess } from "../../common/tenant.util";
import { ChannelsService } from "./channels.service";
import { ConnectInstagramDto, ConnectMessengerDto, ConnectWhatsAppDto } from "./dto/connect-channel.dto";

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("clients/:clientId/channels")
export class ChannelsSettingsController {
  constructor(private readonly channels: ChannelsService) {}

  @Get()
  status(@CurrentUser() user: SessionPayload, @Param("clientId") clientId: string) {
    assertTenantAccess(user, clientId);
    return this.channels.getStatus(clientId);
  }

  @Roles("CLIENT_ADMIN")
  @Post("whatsapp")
  connectWhatsApp(
    @CurrentUser() user: SessionPayload,
    @Param("clientId") clientId: string,
    @Body() dto: ConnectWhatsAppDto,
  ) {
    assertTenantAccess(user, clientId);
    return this.channels.connectWhatsApp(clientId, dto.phoneNumberId, dto.wabaId, dto.accessToken, dto.displayPhoneNumber);
  }

  @Roles("CLIENT_ADMIN")
  @Post("messenger")
  connectMessenger(
    @CurrentUser() user: SessionPayload,
    @Param("clientId") clientId: string,
    @Body() dto: ConnectMessengerDto,
  ) {
    assertTenantAccess(user, clientId);
    return this.channels.connectMessenger(clientId, dto.pageId, dto.accessToken, dto.pageName);
  }

  @Roles("CLIENT_ADMIN")
  @Post("instagram")
  connectInstagram(
    @CurrentUser() user: SessionPayload,
    @Param("clientId") clientId: string,
    @Body() dto: ConnectInstagramDto,
  ) {
    assertTenantAccess(user, clientId);
    return this.channels.connectInstagram(clientId, dto.igBusinessId, dto.accessToken, dto.username);
  }

  @Roles("CLIENT_ADMIN")
  @Delete(":channel")
  disconnect(
    @CurrentUser() user: SessionPayload,
    @Param("clientId") clientId: string,
    @Param("channel") channel: "whatsapp" | "messenger" | "instagram",
  ) {
    assertTenantAccess(user, clientId);
    return this.channels.disconnect(clientId, channel);
  }
}
