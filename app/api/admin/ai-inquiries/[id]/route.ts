export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, AuthError } from "@/lib/auth-server";
import { leadUpdateSchema } from "@/lib/validations";

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin("EDITOR");
    const inquiry = await prisma.aIAgentInquiry.findUnique({ where: { id: params.id } });
    if (!inquiry) return NextResponse.json({ error: "Inquiry not found." }, { status: 404 });
    return NextResponse.json({ inquiry });
  } catch (err) {
    if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[api/admin/ai-inquiries/:id GET]", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin("EDITOR");

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const parsed = leadUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Please check your input and try again." }, { status: 400 });
    }

    const inquiry = await prisma.aIAgentInquiry.update({ where: { id: params.id }, data: parsed.data });
    return NextResponse.json({ inquiry });
  } catch (err) {
    if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[api/admin/ai-inquiries/:id PATCH]", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin("ADMIN");
    await prisma.aIAgentInquiry.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[api/admin/ai-inquiries/:id DELETE]", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
