import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { AppModule } from "./app.module";

async function bootstrap() {
  // rawBody: true exposes req.rawBody so Meta webhook signature verification
  // (HMAC over the exact bytes received) works even after JSON parsing runs.
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { rawBody: true });

  // Serves backend/public/widget.js (copied there from the widget package at
  // build time — see ../package.json) at GET /widget.js, so a client site can
  // embed <script src="https://<this-domain>/widget.js" data-client="...">.
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

  const port = process.env.PORT ? Number(process.env.PORT) : 4000;
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`[support-agent] listening on :${port}`);
}
bootstrap();
