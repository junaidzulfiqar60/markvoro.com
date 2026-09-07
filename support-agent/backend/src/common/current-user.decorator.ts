import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { SessionPayload } from "./auth.types";

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): SessionPayload => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
