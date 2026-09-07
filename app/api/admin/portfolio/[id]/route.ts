export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, AuthError } from "@/lib/auth-server";
import { portfolioUpdateSchema, PORTFOLIO_CATEGORY_TO_ENUM, PORTFOLIO_CATEGORY_FROM_ENUM } from "@/lib/validations";
import type { PortfolioCategory } from "@prisma/client";

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin("EDITOR");
    const project = await prisma.portfolioProject.findUnique({ where: { id: params.id } });
    if (!project) return NextResponse.json({ error: "Project not found." }, { status: 404 });
    return NextResponse.json({
      project: { ...project, category: PORTFOLIO_CATEGORY_FROM_ENUM[project.category] ?? project.category },
    });
  } catch (err) {
    if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[api/admin/portfolio/:id GET]", err);
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

    const parsed = portfolioUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check the form and try again.", fieldErrors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const project = await prisma.portfolioProject.update({
      where: { id: params.id },
      data: {
        ...parsed.data,
        category: parsed.data.category
          ? (PORTFOLIO_CATEGORY_TO_ENUM[parsed.data.category] as PortfolioCategory)
          : undefined,
      },
    });
    return NextResponse.json({ project });
  } catch (err) {
    if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[api/admin/portfolio/:id PATCH]", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin("ADMIN");
    await prisma.portfolioProject.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[api/admin/portfolio/:id DELETE]", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
