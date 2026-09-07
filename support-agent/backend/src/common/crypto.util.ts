import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from "crypto";

// AES-256-GCM, key derived from ENCRYPTION_KEY (or AUTH_SECRET as a dev fallback so this
// never hard-fails locally) via scrypt. Used to store channel access tokens (WhatsApp/
// Messenger/Instagram) at rest in Client.channels — never store them in plaintext.
function getKey(): Buffer {
  const secret = process.env.ENCRYPTION_KEY || process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("ENCRYPTION_KEY (or AUTH_SECRET) must be set to store channel credentials.");
  }
  return scryptSync(secret, "markvoro-support-agent-channels", 32);
}

export function encryptSecret(plaintext: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", getKey(), iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return [iv.toString("base64"), authTag.toString("base64"), encrypted.toString("base64")].join(".");
}

export function decryptSecret(payload: string): string {
  const [ivB64, tagB64, dataB64] = payload.split(".");
  if (!ivB64 || !tagB64 || !dataB64) throw new Error("Malformed encrypted payload.");
  const decipher = createDecipheriv("aes-256-gcm", getKey(), Buffer.from(ivB64, "base64"));
  decipher.setAuthTag(Buffer.from(tagB64, "base64"));
  const decrypted = Buffer.concat([decipher.update(Buffer.from(dataB64, "base64")), decipher.final()]);
  return decrypted.toString("utf8");
}
