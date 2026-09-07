export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, AuthError } from "@/lib/auth-server";
import { serviceUpdateSchema, SERVICE_CATEGORY_TO_ENUM, SERVICE_CATEGORY_FROM_ENUM } from "@/lib/validations";
import type { ServiceCategory } from "@prisma/client";

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin("EDITOR");
    const service = await prisma.service.findUnique({ where: { id: params.id } });
    if (!service) return NextResponse.json({ error: "Service not found." }, { status: 404 });
    return NextResponse.json({
      service: { ...service, category: SERVICE_CATEGORY_FROM_ENUM[service.category] ?? service.category },
    });
  } catch (err) {
    if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[api/admin/services/:id GET]", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin("ADMIN");

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const parsed = serviceUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check the form and try again.", fieldErrors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const service = await prisma.service.update({
      where: { id: params.id },
      data: {
        ...parsed.data,
        category: parsed.data.category
          ? (SERVICE_CATEGORY_TO_ENUM[parsed.data.category] as ServiceCategory)
          : undefined,
      },
    });
    return NextResponse.json({ service });
  } catch (err) {
    if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[api/admin/services/:id PATCH]", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin("ADMIN");
    await prisma.service.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[api/admin/services/:id DELETE]", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
