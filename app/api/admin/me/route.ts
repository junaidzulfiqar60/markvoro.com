export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin, AuthError, verifyPassword, hashPassword } from "@/lib/auth-server";

export async function GET() {
  try {
    const session = await requireAdmin("EDITOR");
    const admin = await prisma.adminUser.findUnique({
      where: { id: session.sub },
      select: { id: true, name: true, email: true, role: true, profileImage: true },
    });
    if (!admin) return NextResponse.json({ error: "Not found." }, { status: 404 });
    return NextResponse.json({ user: admin });
  } catch (err) {
    if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[api/admin/me GET]", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

const updateSchema = z.object({
  name: z.string().trim().min(1).optional(),
  profileImage: z.string().trim().optional(),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(8, "New password must be at least 8 characters.").optional(),
});

export async function PATCH(request: Request) {
  try {
    const session = await requireAdmin("EDITOR");

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Please check your input and try again." }, { status: 400 });
    }

    const data: { name?: string; profileImage?: string; passwordHash?: string } = {};
    if (parsed.data.name) data.name = parsed.data.name;
    if (parsed.data.profileImage !== undefined) data.profileImage = parsed.data.profileImage;

    if (parsed.data.newPassword) {
      if (!parsed.data.currentPassword) {
        return NextResponse.json({ error: "Current password is required to set a new password." }, { status: 400 });
      }
      const admin = await prisma.adminUser.findUnique({ where: { id: session.sub } });
      if (!admin || !(await verifyPassword(parsed.data.currentPassword, admin.passwordHash))) {
        return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
      }
      data.passwordHash = await hashPassword(parsed.data.newPassword);
    }

    const updated = await prisma.adminUser.update({
      where: { id: session.sub },
      data,
      select: { id: true, name: true, email: true, role: true, profileImage: true },
    });

    return NextResponse.json({ user: updated });
  } catch (err) {
    if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[api/admin/me PATCH]", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
