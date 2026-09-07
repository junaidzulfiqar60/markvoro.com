import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { WidgetService } from "./widget.service";
import { WidgetMessageDto } from "./dto/widget-message.dto";
import { RateLimit } from "../../common/rate-limit.guard";

// Public — no session auth. Scoped entirely by the unguessable per-client widgetKey.
@Controller("widget/:widgetKey")
export class WidgetController {
  constructor(private readonly widget: WidgetService) {}

  @Get("messages")
  getHistory(@Param("widgetKey") widgetKey: string, @Query("sessionId") sessionId: string) {
    return this.widget.getHistory(widgetKey, sessionId);
  }

  @UseGuards(RateLimit(20, 60_000))
  @Post("messages")
  sendMessage(@Param("widgetKey") widgetKey: string, @Body() dto: WidgetMessageDto) {
    return this.widget.sendMessage(widgetKey, dto.sessionId, dto.text);
  }
}
