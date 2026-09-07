import { Module } from "@nestjs/common";
import { ChannelsService } from "./channels.service";
import { ChannelsSettingsController } from "./channels-settings.controller";
import { ChannelConversationService } from "./channel-conversation.service";
import { MetaSenderService } from "./meta-sender.service";
import { WhatsAppController } from "./whatsapp.controller";
import { MessengerController } from "./messenger.controller";
import { InstagramController } from "./instagram.controller";
import { AuthModule } from "../auth/auth.module";
import { AiModule } from "../ai/ai.module";

@Module({
  imports: [AuthModule, AiModule],
  controllers: [ChannelsSettingsController, WhatsAppController, MessengerController, InstagramController],
  providers: [ChannelsService, ChannelConversationService, MetaSenderService],
})
export class ChannelsModule {}
