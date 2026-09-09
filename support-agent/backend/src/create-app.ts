import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { AppModule } from "./app.module";

// Shared by src/main.ts (long-running server: Railway, local dev) and
// api/index.js (Vercel serverless function) so both entrypoints stay in sync.
export async function createApp(): Promise<NestExpressApplication> {
  // rawBody: true exposes req.rawBody so Meta webhook signature verification
  // (HMAC over the exact bytes received) works even after JSON parsing runs.
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { rawBody: true });

  // Serves backend/public/widget.js (copied there from the widget package at
  // build time — see ../package.json) at GET /widget.js, so a client site can
  // embed <script src="https://<this-domain>/widget.js" data-client="...">.
  // On Vercel this path is never reached — Vercel serves public/ directly —
  // but it's harmless to keep for the Railway/local-server entrypoint.
  app.useStaticAssets(join(__dirname, "..", "..", "public"));

  const origins = (process.env.CORS_ORIGINS ?? "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
  app.enableCors({ origin: origins.length ? origins : true, credentials: true });

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }),
  );
  app.setGlobalPrefix("api/v1");

  return app;
}
