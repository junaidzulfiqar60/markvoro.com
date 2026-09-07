import { Module } from "@nestjs/common";
import { AnthropicProvider } from "./providers/anthropic.provider";
import { OpenAiProvider } from "./providers/openai.provider";
import { OpenAiEmbeddingProvider } from "./providers/openai-embedding.provider";
import { EMBEDDING_PROVIDER } from "./ai.tokens";
import { RagService } from "./rag.service";
import { ToolDispatcherService } from "./tools/tool-dispatcher.service";
import { OrderAdapterResolver } from "./tools/order-adapter";
import { AiOrchestratorService } from "./ai-orchestrator.service";
import { AppointmentsModule } from "../appointments/appointments.module";
import { TicketsModule } from "../tickets/tickets.module";

@Module({
  imports: [AppointmentsModule, TicketsModule],
  providers: [
    AnthropicProvider,
    OpenAiProvider,
    { provide: EMBEDDING_PROVIDER, useClass: OpenAiEmbeddingProvider },
    RagService,
    ToolDispatcherService,
    OrderAdapterResolver,
    AiOrchestratorService,
  ],
  exports: [AiOrchestratorService, RagService],
})
export class AiModule {}
