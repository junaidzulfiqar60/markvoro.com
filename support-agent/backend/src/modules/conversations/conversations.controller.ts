import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../common/jwt-auth.guard";
import { RolesGuard } from "../../common/roles.guard";
import { Roles } from "../../common/roles.decorator";
import { CurrentUser } from "../../common/current-user.decorator";
import { SessionPayload } from "../../common/auth.types";
import { assertTenantAccess } from "../../common/tenant.util";
import { ConversationsService } from "./conversations.service";
import { SendMessageDto } from "./dto/send-message.dto";

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("clients/:clientId/conversations")
export class ConversationsController {
  constructor(private readonly conversations: ConversationsService) {}

  @Get()
  list(
    @CurrentUser() user: SessionPayload,
    @Param("clientId") clientId: string,
    @Query("status") status?: string,
  ) {
    assertTenantAccess(user, clientId);
    return this.conversations.list(clientId, status);
  }

  @Get(":conversationId/messages")
  getMessages(
    @CurrentUser() user: SessionPayload,
    @Param("clientId") clientId: string,
    @Param("conversationId") conversationId: string,
  ) {
    assertTenantAccess(user, clientId);
    return this.conversations.getMessages(clientId, conversationId);
  }

  @Roles("CLIENT_ADMIN", "SUPPORT_MANAGER", "SUPPORT_AGENT")
  @Post(":conversationId/messages")
  reply(
    @CurrentUser() user: SessionPayload,
    @Param("clientId") clientId: string,
    @Param("conversationId") conversationId: string,
    @Body() dto: SendMessageDto,
  ) {
    assertTenantAccess(user, clientId);
    return this.conversations.sendHumanReply(clientId, conversationId, user.sub, dto.content);
  }

  @Roles("CLIENT_ADMIN", "SUPPORT_MANAGER")
  @Post(":conversationId/assign")
  assign(
    @CurrentUser() user: SessionPayload,
    @Param("clientId") clientId: string,
    @Param("conversationId") conversationId: string,
    @Body("agentId") agentId: string,
  ) {
    assertTenantAccess(user, clientId);
    return this.conversations.assign(clientId, conversationId, agentId);
  }

  @Roles("CLIENT_ADMIN", "SUPPORT_MANAGER", "SUPPORT_AGENT")
  @Post(":conversationId/close")
  close(
    @CurrentUser() user: SessionPayload,
    @Param("clientId") clientId: string,
    @Param("conversationId") conversationId: string,
  ) {
    assertTenantAccess(user, clientId);
    return this.conversations.close(clientId, conversationId);
  }

  @Roles("CLIENT_ADMIN", "SUPPORT_MANAGER", "SUPPORT_AGENT")
  @Patch(":conversationId/reopen-to-ai")
  reopenToAi(
    @CurrentUser() user: SessionPayload,
    @Param("clientId") clientId: string,
    @Param("conversationId") conversationId: string,
  ) {
    assertTenantAccess(user, clientId);
    return this.conversations.reopenToAi(clientId, conversationId);
  }
}
