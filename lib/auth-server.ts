import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import type { AdminRole } from "@prisma/client";
import {
  ROLE_RANK,
  SESSION_COOKIE_NAME,
  type SessionPayload,
  verifySession,
} from "@/lib/auth";

export { SESSION_COOKIE_NAME, signSession, verifySession } from "@/lib/auth";
export type { SessionPayload } from "@/lib/auth";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function getSessionFromCookies(): Promise<SessionPayload | null> {
  const token = cookies().get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySession(token);
}

export class AuthError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function requireAdmin(minRole: AdminRole = "EDITOR"): Promise<SessionPayload> {
  const session = await getSessionFromCookies();
  if (!session) {
    throw new AuthError("Unauthorized", 401);
  }
  if (ROLE_RANK[session.role] < ROLE_RANK[minRole]) {
    throw new AuthError("Forbidden", 403);
  }
  return session;
}
