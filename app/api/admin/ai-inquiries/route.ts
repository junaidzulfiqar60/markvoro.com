export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { Prisma, type LeadStatus, type AgentType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin, AuthError } from "@/lib/auth-server";

export async function GET(request: Request) {
  try {
    await requireAdmin("EDITOR");

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const agentType = searchParams.get("agentType");
    const q = searchParams.get("q")?.trim();
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const pageSize = Math.min(100, Math.max(1, Number(searchParams.get("pageSize")) || 20));

    const where: Prisma.AIAgentInquiryWhereInput = {};
    if (status) where.status = status as LeadStatus;
    if (agentType) where.agentType = agentType as AgentType;
    if (q) {
      where.OR = [
        { fullName: { contains: q, mode: "insensitive" } },
        { email: { contains: q, mode: "insensitive" } },
        { industry: { contains: q, mode: "insensitive" } },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.aIAgentInquiry.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.aIAgentInquiry.count({ where }),
    ]);

    return NextResponse.json({ items, total, page, pageSize });
  } catch (err) {
    if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[api/admin/ai-inquiries GET]", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
