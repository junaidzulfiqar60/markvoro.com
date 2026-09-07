import { Module } from "@nestjs/common";
import { KnowledgeBaseService } from "./knowledge-base.service";
import { KnowledgeBaseController } from "./knowledge-base.controller";
import { AiModule } from "../ai/ai.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [AiModule, AuthModule],
  controllers: [KnowledgeBaseController],
  providers: [KnowledgeBaseService],
})
export class KnowledgeBaseModule {}
