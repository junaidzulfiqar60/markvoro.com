import { Injectable, Logger } from "@nestjs/common";

const GRAPH_VERSION = "v20.0";

@Injectable()
export class MetaSenderService {
  private readonly logger = new Logger(MetaSenderService.name);

  async sendWhatsAppText(phoneNumberId: string, accessToken: string, to: string, text: string): Promise<void> {
    const res = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${phoneNumberId}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify({ messaging_product: "whatsapp", to, type: "text", text: { body: text } }),
    });
    if (!res.ok) {
      this.logger.error(`WhatsApp send failed (${res.status}): ${await res.text()}`);
    }
  }

  /** Messenger and Instagram DMs share the same Send API shape — only the token/audience differ. */
  async sendMetaDm(accessToken: string, recipientId: string, text: string): Promise<void> {
    const res = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/me/messages?access_token=${encodeURIComponent(accessToken)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipient: { id: recipientId }, message: { text } }),
    });
    if (!res.ok) {
      this.logger.error(`Meta DM send failed (${res.status}): ${await res.text()}`);
    }
  }
}
