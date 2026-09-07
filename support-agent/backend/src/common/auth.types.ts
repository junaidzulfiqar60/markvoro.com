import { AdminRole } from "@prisma/client";

export interface SessionPayload {
  sub: string; // AdminUser id
  clientId: string | null; // null for MARKVORO Super Admin
  role: AdminRole;
  email: string;
}

declare module "express" {
  interface Request {
    user?: SessionPayload;
  }
}
