import { SignJWT, jwtVerify } from "jose";
import type { AdminRole } from "@prisma/client";

/**
 * Edge-safe auth core (used by middleware.ts as well as Node route handlers).
 * No bcrypt, no next/headers here — those live in lib/auth-server.ts.
 */

export const SESSION_COOKIE_NAME = "markvoro_admin_session";

export type SessionPayload = {
  sub: string;
  email: string;
  name: string;
  role: AdminRole;
};

export const ROLE_RANK: Record<AdminRole, number> = {
  EDITOR: 1,
  ADMIN: 2,
  SUPER_ADMIN: 3,
};

function getSecretKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET environment variable is not set.");
  }
  return new TextEncoder().encode(secret);
}

export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecretKey());
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (
      typeof payload.sub === "string" &&
      typeof payload.email === "string" &&
      typeof payload.name === "string" &&
      typeof payload.role === "string"
    ) {
      return {
        sub: payload.sub,
        email: payload.email,
        name: payload.name,
        role: payload.role as AdminRole,
      };
    }
    return null;
  } catch {
    return null;
  }
}
