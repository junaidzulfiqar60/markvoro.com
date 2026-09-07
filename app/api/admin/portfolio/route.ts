import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, AuthError } from "@/lib/auth-server";
import { portfolioCreateSchema, PORTFOLIO_CATEGORY_TO_ENUM, PORTFOLIO_CATEGORY_FROM_ENUM } from "@/lib/validations";
import type { PortfolioCategory } from "@prisma/client";

export async function GET() {
  try {
    await requireAdmin("EDITOR");
    const projects = await prisma.portfolioProject.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] });
    return NextResponse.json({
      projects: projects.map((p) => ({
        ...p,
        category: PORTFOLIO_CATEGORY_FROM_ENUM[p.category] ?? p.category,
      })),
    });
  } catch (err) {
    if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[api/admin/portfolio GET]", err);
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

    const parsed = portfolioCreateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check the form and try again.", fieldErrors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const project = await prisma.portfolioProject.create({
      data: { ...parsed.data, category: PORTFOLIO_CATEGORY_TO_ENUM[parsed.data.category] as PortfolioCategory },
    });
    return NextResponse.json({ project }, { status: 201 });
  } catch (err) {
    if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[api/admin/portfolio POST]", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
