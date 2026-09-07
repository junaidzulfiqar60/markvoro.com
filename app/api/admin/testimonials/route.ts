export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, AuthError } from "@/lib/auth-server";
import { testimonialCreateSchema } from "@/lib/validations";

export async function GET() {
  try {
    await requireAdmin("EDITOR");
    const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ testimonials });
  } catch (err) {
    if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[api/admin/testimonials GET]", err);
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

    const parsed = testimonialCreateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check the form and try again.", fieldErrors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const testimonial = await prisma.testimonial.create({ data: parsed.data });
    return NextResponse.json({ testimonial }, { status: 201 });
  } catch (err) {
    if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[api/admin/testimonials POST]", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
