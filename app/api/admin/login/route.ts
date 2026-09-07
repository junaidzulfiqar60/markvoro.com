export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { adminLoginSchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rateLimit";
import { getClientIp } from "@/lib/http";
import { signSession, SESSION_COOKIE_NAME } from "@/lib/auth";
import { verifyPassword } from "@/lib/auth-server";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rl = checkRateLimit(`admin-login:${ip}`, 5, 15 * 60 * 1000);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many login attempts. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = adminLoginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 400 });
  }

  try {
    const admin = await prisma.adminUser.findUnique({ where: { email: parsed.data.email } });
    if (!admin) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const valid = await verifyPassword(parsed.data.password, admin.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const token = await signSession({
      sub: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    });

    const response = NextResponse.json({
      user: { id: admin.id, name: admin.name, email: admin.email, role: admin.role },
    });
    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  } catch (err) {
    console.error("[api/admin/login]", err);
    return NextResponse.json({ error: "Something went wrong. Please try again later." }, { status: 500 });
  }
}
