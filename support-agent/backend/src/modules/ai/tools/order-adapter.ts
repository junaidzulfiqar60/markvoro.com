import { Injectable, Logger } from "@nestjs/common";
import { Client } from "@prisma/client";
import { decryptSecret } from "../../../common/crypto.util";

export interface OrderStatusResult {
  found: boolean;
  status?: string;
  details?: string;
}

interface OrderAdapter {
  getOrderStatus(orderNumber: string): Promise<OrderStatusResult>;
}

interface ShopifyConfig {
  provider: "shopify";
  shopDomain: string; // e.g. my-store.myshopify.com
  accessTokenEnc: string;
}

class ShopifyOrderAdapter implements OrderAdapter {
  constructor(private readonly config: ShopifyConfig) {}

  async getOrderStatus(orderNumber: string): Promise<OrderStatusResult> {
    const token = decryptSecret(this.config.accessTokenEnc);
    const query = encodeURIComponent(`name:${orderNumber.replace(/^#/, "")}`);
    const res = await fetch(
      `https://${this.config.shopDomain}/admin/api/2024-07/orders.json?name=${query}&status=any`,
      { headers: { "X-Shopify-Access-Token": token }, signal: AbortSignal.timeout(8000) },
    );
    if (!res.ok) return { found: false };

    const body = (await res.json()) as { orders: Array<{ fulfillment_status: string | null; financial_status: string }> };
    const order = body.orders?.[0];
    if (!order) return { found: false };

    return {
      found: true,
      status: order.fulfillment_status ?? "unfulfilled",
      details: `Payment: ${order.financial_status}, Fulfillment: ${order.fulfillment_status ?? "unfulfilled"}`,
    };
  }
}

@Injectable()
export class OrderAdapterResolver {
  private readonly logger = new Logger(OrderAdapterResolver.name);

  resolve(client: Client): OrderAdapter | null {
    const config = client.orderSystem as Record<string, unknown> | null;
    if (!config || !config.provider) return null;

    switch (config.provider) {
      case "shopify":
        return new ShopifyOrderAdapter(config as unknown as ShopifyConfig);
      default:
        this.logger.warn(`Unknown order system provider configured: ${config.provider}`);
        return null;
    }
  }
}
