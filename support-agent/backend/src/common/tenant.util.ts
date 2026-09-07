import { ForbiddenException } from "@nestjs/common";
import { SessionPayload } from "./auth.types";

/** Confirms a client-scoped session actually belongs to the client it's acting on. */
export function assertTenantAccess(user: SessionPayload, clientId: string): void {
  if (user.role === "SUPER_ADMIN") return;
  if (user.clientId !== clientId) {
    throw new ForbiddenException("You don't have access to this client's data.");
  }
}
