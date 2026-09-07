import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { newsletterSchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rateLimit";
import { getClientIp } from "@/lib/http";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rl = checkRateLimit(`newsletter-subscribe:${ip}`, 10, 10 * 60 * 1000);
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
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: parsed.data.email },
    });

    if (existing?.status === "ACTIVE") {
      return NextResponse.json({ success: true, message: "You're already subscribed." });
    }

    await prisma.newsletterSubscriber.upsert({
      where: { email: parsed.data.email },
      update: { status: "ACTIVE", unsubscribedAt: null },
      create: { email: parsed.data.email },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("[api/newsletter/subscribe]", err);
    return NextResponse.json({ error: "Something went wrong. Please try again later." }, { status: 500 });
  }
}
