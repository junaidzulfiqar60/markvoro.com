import { Controller, Get, Post, Query, Req, Res } from "@nestjs/common";
import type { Request, Response } from "express";
import { verifyMetaSignature, verifyWebhookChallenge } from "./meta-webhook.util";
import { ChannelsService } from "./channels.service";
import { ChannelConversationService } from "./channel-conversation.service";
import { MetaSenderService } from "./meta-sender.service";

interface WhatsAppWebhookPayload {
  entry?: Array<{
    changes?: Array<{
      value?: {
        metadata?: { phone_number_id?: string };
        messages?: Array<{ from: string; text?: { body: string }; type: string }>;
      };
    }>;
  }>;
}

// Public — Meta calls this directly. Protected by HMAC signature verification, not auth.
@Controller("webhooks/whatsapp")
export class WhatsAppController {
  constructor(
    private readonly channels: ChannelsService,
    private readonly conversations: ChannelConversationService,
    private readonly sender: MetaSenderService,
  ) {}

  @Get()
  verify(@Query() query: Record<string, string>, @Res() res: Response) {
    const challenge = verifyWebhookChallenge(query, process.env.META_VERIFY_TOKEN || "");
    if (challenge === null) return res.sendStatus(403);
    return res.status(200).send(challenge);
  }

  @Post()
  async receive(@Req() req: Request, @Res() res: Response) {
    const signature = req.headers["x-hub-signature-256"] as string | undefined;
    const rawBody = (req as unknown as { rawBody?: Buffer }).rawBody;
    if (!rawBody || !verifyMetaSignature(rawBody, signature, process.env.META_APP_SECRET || "")) {
      return res.sendStatus(401);
    }
    // ACK immediately — Meta expects a fast 200 regardless of how long the AI takes.
    res.sendStatus(200);

    const payload = req.body as WhatsAppWebhookPayload;
    for (const entry of payload.entry ?? []) {
      for (const change of entry.changes ?? []) {
        const value = change.value;
        const phoneNumberId = value?.metadata?.phone_number_id;
        if (!phoneNumberId || !value?.messages) continue; // skip status/read receipts

        const client = await this.channels.findClientByPhoneNumberId(phoneNumberId);
        if (!client) continue; // unknown number — not one of our tenants

        for (const message of value.messages) {
          if (message.type !== "text" || !message.text) continue; // media handling: Phase 2.1

          const customer = await this.conversations.findOrCreateCustomerByPhone(client.id, message.from);
          const { replyText } = await this.conversations.handleInboundText(
            client.id,
            customer.id,
            "WHATSAPP",
            message.text.body,
          );

          if (replyText) {
            const { token } = this.channels.getWhatsAppToken(client);
            await this.sender.sendWhatsAppText(phoneNumberId, token, message.from, replyText);
          }
        }
      }
    }
  }
}
