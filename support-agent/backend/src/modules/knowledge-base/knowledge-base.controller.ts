import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../common/jwt-auth.guard";
import { RolesGuard } from "../../common/roles.guard";
import { Roles } from "../../common/roles.decorator";
import { CurrentUser } from "../../common/current-user.decorator";
import { SessionPayload } from "../../common/auth.types";
import { assertTenantAccess } from "../../common/tenant.util";
import { KnowledgeBaseService } from "./knowledge-base.service";
import { CreateDocumentDto } from "./dto/create-document.dto";

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("clients/:clientId/knowledge-base")
export class KnowledgeBaseController {
  constructor(private readonly kb: KnowledgeBaseService) {}

  @Get("documents")
  list(@CurrentUser() user: SessionPayload, @Param("clientId") clientId: string) {
    assertTenantAccess(user, clientId);
    return this.kb.list(clientId);
  }

  @Roles("CLIENT_ADMIN")
  @Post("documents")
  create(
    @CurrentUser() user: SessionPayload,
    @Param("clientId") clientId: string,
    @Body() dto: CreateDocumentDto,
  ) {
    assertTenantAccess(user, clientId);
    return this.kb.create(clientId, dto);
  }

  @Roles("CLIENT_ADMIN")
  @Delete("documents/:documentId")
  delete(
    @CurrentUser() user: SessionPayload,
    @Param("clientId") clientId: string,
    @Param("documentId") documentId: string,
  ) {
    assertTenantAccess(user, clientId);
    return this.kb.delete(clientId, documentId);
  }
}
