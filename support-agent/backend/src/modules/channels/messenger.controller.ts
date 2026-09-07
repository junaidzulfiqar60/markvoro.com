import { Controller, Get, Post, Query, Req, Res } from "@nestjs/common";
import type { Request, Response } from "express";
import { verifyMetaSignature, verifyWebhookChallenge } from "./meta-webhook.util";
import { ChannelsService } from "./channels.service";
import { ChannelConversationService } from "./channel-conversation.service";
import { MetaSenderService } from "./meta-sender.service";

interface MessengerWebhookPayload {
  entry?: Array<{
    id: string; // Page ID
    messaging?: Array<{ sender: { id: string }; message?: { text?: string; is_echo?: boolean } }>;
  }>;
}

// Public — Meta calls this directly. Protected by HMAC signature verification, not auth.
@Controller("webhooks/messenger")
export class MessengerController {
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
    res.sendStatus(200);

    const payload = req.body as MessengerWebhookPayload;
    for (const entry of payload.entry ?? []) {
      const client = await this.channels.findClientByPageId(entry.id);
      if (!client) continue;

      for (const event of entry.messaging ?? []) {
        if (!event.message?.text || event.message.is_echo) continue; // ignore echoes of our own sends

        const customer = await this.conversations.findOrCreateCustomerByPlatformId(
          client.id,
          "messengerPsid",
          event.sender.id,
        );
        const { replyText } = await this.conversations.handleInboundText(
          client.id,
          customer.id,
          "MESSENGER",
          event.message.text,
        );

        if (replyText) {
          const token = this.channels.getMessengerToken(client);
          await this.sender.sendMetaDm(token, event.sender.id, replyText);
        }
      }
    }
  }
}
