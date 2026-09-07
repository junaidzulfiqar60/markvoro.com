import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { AuthModule } from "./modules/auth/auth.module";
import { ClientsModule } from "./modules/clients/clients.module";
import { ConversationsModule } from "./modules/conversations/conversations.module";
import { AiModule } from "./modules/ai/ai.module";
import { KnowledgeBaseModule } from "./modules/knowledge-base/knowledge-base.module";
import { LeadsModule } from "./modules/leads/leads.module";
import { WidgetModule } from "./modules/widget/widget.module";
import { DashboardModule } from "./modules/dashboard/dashboard.module";
import { AppointmentsModule } from "./modules/appointments/appointments.module";
import { TicketsModule } from "./modules/tickets/tickets.module";
import { ChannelsModule } from "./modules/channels/channels.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    ClientsModule,
    ConversationsModule,
    AiModule,
    KnowledgeBaseModule,
    LeadsModule,
    WidgetModule,
    DashboardModule,
    AppointmentsModule,
    TicketsModule,
    ChannelsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
