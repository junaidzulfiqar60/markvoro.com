import { createHmac, timingSafeEqual } from "crypto";

/** Verifies Meta's X-Hub-Signature-256 header against the raw request body. */
export function verifyMetaSignature(rawBody: Buffer, signatureHeader: string | undefined, appSecret: string): boolean {
  if (!signatureHeader || !appSecret) return false;
  const expected = "sha256=" + createHmac("sha256", appSecret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signatureHeader);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/** Handles Meta's GET subscription-verification handshake. Returns the challenge to echo, or null if invalid. */
export function verifyWebhookChallenge(
  query: Record<string, string | undefined>,
  verifyToken: string,
): string | null {
  if (query["hub.mode"] !== "subscribe") return null;
  if (query["hub.verify_token"] !== verifyToken) return null;
  return query["hub.challenge"] ?? null;
}
