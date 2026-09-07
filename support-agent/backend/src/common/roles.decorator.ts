import { SetMetadata } from "@nestjs/common";
import { AdminRole } from "@prisma/client";

export const ROLES_KEY = "roles";
/** Allow only the listed roles (in addition to SUPER_ADMIN, which always passes). */
export const Roles = (...roles: AdminRole[]) => SetMetadata(ROLES_KEY, roles);
