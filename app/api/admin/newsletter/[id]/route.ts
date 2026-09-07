export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin, AuthError } from "@/lib/auth-server";

const updateSchema = z.object({ status: z.enum(["ACTIVE", "UNSUBSCRIBED"]) });

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin("EDITOR");

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

    const subscriber = await prisma.newsletterSubscriber.update({
      where: { id: params.id },
      data: {
        status: parsed.data.status,
        unsubscribedAt: parsed.data.status === "UNSUBSCRIBED" ? new Date() : null,
      },
    });

    return NextResponse.json({ subscriber });
  } catch (err) {
    if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[api/admin/newsletter/:id PATCH]", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin("ADMIN");
    await prisma.newsletterSubscriber.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[api/admin/newsletter/:id DELETE]", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
