import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PORTFOLIO_CATEGORY_FROM_ENUM } from "@/lib/validations";

export async function GET() {
  try {
    const projects = await prisma.portfolioProject.findMany({
      where: { published: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    return NextResponse.json({
      projects: projects.map((p) => ({
        ...p,
        category: PORTFOLIO_CATEGORY_FROM_ENUM[p.category] ?? p.category,
      })),
    });
  } catch (err) {
    console.error("[api/portfolio]", err);
    return NextResponse.json({ error: "Unable to load portfolio." }, { status: 500 });
  }
}
