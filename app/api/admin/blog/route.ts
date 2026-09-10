export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, AuthError } from "@/lib/auth-server";
import { blogPostCreateSchema } from "@/lib/validations";

export async function GET() {
  try {
    await requireAdmin("EDITOR");
    const posts = await prisma.blogPost.findMany({ orderBy: { publishedAt: "desc" } });
    return NextResponse.json({ posts });
  } catch (err) {
    if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[api/admin/blog GET]", err);
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

    const parsed = blogPostCreateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check the form and try again.", fieldErrors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const existing = await prisma.blogPost.findUnique({ where: { slug: parsed.data.slug } });
    if (existing) {
      return NextResponse.json(
        { error: "Please check the form and try again.", fieldErrors: { slug: ["That slug is already in use."] } },
        { status: 400 }
      );
    }

    const post = await prisma.blogPost.create({ data: parsed.data });
    return NextResponse.json({ post }, { status: 201 });
  } catch (err) {
    if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[api/admin/blog POST]", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
