import { CanActivate, ExecutionContext, Injectable, mixin, Type } from "@nestjs/common";
import { HttpException, HttpStatus } from "@nestjs/common";

// In-memory, per-instance rate limiting — resets on cold start / restart, no Redis
// dependency for the MVP. Documented tradeoff, acceptable at single-instance scale.
const buckets = new Map<string, { count: number; resetAt: number }>();

export function RateLimit(limit: number, windowMs: number): Type<CanActivate> {
  class RateLimitGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const req = context.switchToHttp().getRequest();
      const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket?.remoteAddress || "unknown";
      const key = `${req.route?.path ?? req.url}:${ip}`;
      const now = Date.now();

      const bucket = buckets.get(key);
      if (!bucket || bucket.resetAt < now) {
        buckets.set(key, { count: 1, resetAt: now + windowMs });
        return true;
      }
      if (bucket.count >= limit) {
        throw new HttpException("Too many requests — please slow down.", HttpStatus.TOO_MANY_REQUESTS);
      }
      bucket.count += 1;
      return true;
    }
  }
  return mixin(RateLimitGuardMixin);
}
