import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, AuthError } from "@/lib/auth-server";
import { serviceCreateSchema, SERVICE_CATEGORY_TO_ENUM, SERVICE_CATEGORY_FROM_ENUM } from "@/lib/validations";
import type { ServiceCategory } from "@prisma/client";

export async function GET() {
  try {
    await requireAdmin("EDITOR");
    const services = await prisma.service.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json({
      services: services.map((s) => ({ ...s, category: SERVICE_CATEGORY_FROM_ENUM[s.category] ?? s.category })),
    });
  } catch (err) {
    if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[api/admin/services GET]", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin("ADMIN");

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const parsed = serviceCreateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check the form and try again.", fieldErrors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const service = await prisma.service.create({
      data: { ...parsed.data, category: SERVICE_CATEGORY_TO_ENUM[parsed.data.category] as ServiceCategory },
    });
    return NextResponse.json({ service }, { status: 201 });
  } catch (err) {
    if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[api/admin/services POST]", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
