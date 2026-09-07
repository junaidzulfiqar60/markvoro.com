import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { newsletterSchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rateLimit";
import { getClientIp } from "@/lib/http";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rl = checkRateLimit(`newsletter-unsubscribe:${ip}`, 10, 10 * 60 * 1000);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Enter a valid email address.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  try {
    // Don't leak subscriber existence either way — always respond success-shaped.
    await prisma.newsletterSubscriber
      .update({
        where: { email: parsed.data.email },
        data: { status: "UNSUBSCRIBED", unsubscribedAt: new Date() },
      })
      .catch(() => null);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[api/newsletter/unsubscribe]", err);
    return NextResponse.json({ error: "Something went wrong. Please try again later." }, { status: 500 });
  }
}
