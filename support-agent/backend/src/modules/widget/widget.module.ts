import { Module } from "@nestjs/common";
import { WidgetService } from "./widget.service";
import { WidgetController } from "./widget.controller";
import { AiModule } from "../ai/ai.module";

@Module({
  imports: [AiModule],
  controllers: [WidgetController],
  providers: [WidgetService],
})
export class WidgetModule {}
