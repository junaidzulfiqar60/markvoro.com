import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { encryptSecret, decryptSecret } from "../../common/crypto.util";

export interface WhatsAppChannelConfig {
  phoneNumberId: string;
  wabaId: string;
  displayPhoneNumber?: string;
  accessTokenEnc: string;
}

export interface MessengerChannelConfig {
  pageId: string;
  pageName?: string;
  accessTokenEnc: string;
}

export interface InstagramChannelConfig {
  igBusinessId: string;
  username?: string;
  accessTokenEnc: string;
}

type ChannelsJson = {
  whatsapp?: WhatsAppChannelConfig;
  messenger?: MessengerChannelConfig;
  instagram?: InstagramChannelConfig;
};

@Injectable()
export class ChannelsService {
  constructor(private readonly prisma: PrismaService) {}

  async getStatus(clientId: string) {
    const client = await this.prisma.client.findUniqueOrThrow({ where: { id: clientId } });
    const channels = (client.channels as ChannelsJson) ?? {};
    return {
      whatsapp: channels.whatsapp
        ? { connected: true, displayPhoneNumber: channels.whatsapp.displayPhoneNumber }
        : { connected: false },
      messenger: channels.messenger ? { connected: true, pageName: channels.messenger.pageName } : { connected: false },
      instagram: channels.instagram ? { connected: true, username: channels.instagram.username } : { connected: false },
    };
  }

  async connectWhatsApp(clientId: string, phoneNumberId: string, wabaId: string, accessToken: string, displayPhoneNumber?: string) {
    return this.mergeChannels(clientId, {
      whatsapp: { phoneNumberId, wabaId, displayPhoneNumber, accessTokenEnc: encryptSecret(accessToken) },
    });
  }

  async connectMessenger(clientId: string, pageId: string, accessToken: string, pageName?: string) {
    return this.mergeChannels(clientId, {
      messenger: { pageId, pageName, accessTokenEnc: encryptSecret(accessToken) },
    });
  }

  async connectInstagram(clientId: string, igBusinessId: string, accessToken: string, username?: string) {
    return this.mergeChannels(clientId, {
      instagram: { igBusinessId, username, accessTokenEnc: encryptSecret(accessToken) },
    });
  }

  async disconnect(clientId: string, channel: "whatsapp" | "messenger" | "instagram") {
    const client = await this.prisma.client.findUniqueOrThrow({ where: { id: clientId } });
    const channels = { ...((client.channels as ChannelsJson) ?? {}) };
    delete channels[channel];
    return this.prisma.client.update({ where: { id: clientId }, data: { channels: channels as object } });
  }

  private async mergeChannels(clientId: string, patch: ChannelsJson) {
    const client = await this.prisma.client.findUnique({ where: { id: clientId } });
    if (!client) throw new NotFoundException("Client not found.");
    const channels = { ...((client.channels as ChannelsJson) ?? {}), ...patch };
    return this.prisma.client.update({ where: { id: clientId }, data: { channels: channels as object } });
  }

  // ---- Webhook-side lookups (public, keyed by Meta identifiers, not clientId) ----

  async findClientByPhoneNumberId(phoneNumberId: string) {
    return this.prisma.client.findFirst({
      where: { channels: { path: ["whatsapp", "phoneNumberId"], equals: phoneNumberId } },
    });
  }

  async findClientByPageId(pageId: string) {
    return this.prisma.client.findFirst({
      where: { channels: { path: ["messenger", "pageId"], equals: pageId } },
    });
  }

  async findClientByIgBusinessId(igBusinessId: string) {
    return this.prisma.client.findFirst({
      where: { channels: { path: ["instagram", "igBusinessId"], equals: igBusinessId } },
    });
  }

  getWhatsAppToken(client: { channels: unknown }): { token: string; phoneNumberId: string } {
    const channels = client.channels as ChannelsJson;
    if (!channels.whatsapp) throw new BadRequestException("WhatsApp is not connected for this client.");
    return { token: decryptSecret(channels.whatsapp.accessTokenEnc), phoneNumberId: channels.whatsapp.phoneNumberId };
  }

  getMessengerToken(client: { channels: unknown }): string {
    const channels = client.channels as ChannelsJson;
    if (!channels.messenger) throw new BadRequestException("Messenger is not connected for this client.");
    return decryptSecret(channels.messenger.accessTokenEnc);
  }

  getInstagramToken(client: { channels: unknown }): string {
    const channels = client.channels as ChannelsJson;
    if (!channels.instagram) throw new BadRequestException("Instagram is not connected for this client.");
    return decryptSecret(channels.instagram.accessTokenEnc);
  }
}
