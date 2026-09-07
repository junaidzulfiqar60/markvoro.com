import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AdminRole } from "@prisma/client";
import { ROLES_KEY } from "./roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<AdminRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!required || required.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const role: AdminRole | undefined = req.user?.role;
    if (!role) throw new ForbiddenException("No role on session.");
    if (role === "SUPER_ADMIN") return true; // platform owner always passes
    if (!required.includes(role)) {
      throw new ForbiddenException("You don't have permission to do that.");
    }
    return true;
  }
}
