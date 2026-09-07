export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { Prisma, type SubscriberStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin, AuthError } from "@/lib/auth-server";

export async function GET(request: Request) {
  try {
    await requireAdmin("EDITOR");

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const q = searchParams.get("q")?.trim();
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const pageSize = Math.min(500, Math.max(1, Number(searchParams.get("pageSize")) || 50));

    const where: Prisma.NewsletterSubscriberWhereInput = {};
    if (status) where.status = status as SubscriberStatus;
    if (q) where.email = { contains: q, mode: "insensitive" };

    const [items, total] = await Promise.all([
      prisma.newsletterSubscriber.findMany({
        where,
        orderBy: { subscribedAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.newsletterSubscriber.count({ where }),
    ]);

    return NextResponse.json({ items, total, page, pageSize });
  } catch (err) {
    if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[api/admin/newsletter GET]", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
