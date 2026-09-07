import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, AuthError } from "@/lib/auth-server";

function monthRange(monthsAgo: number) {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - monthsAgo, 1);
  const end = new Date(now.getFullYear(), now.getMonth() - monthsAgo + 1, 1);
  return { start, end };
}

export async function GET() {
  try {
    await requireAdmin("EDITOR");

    const [
      totalLeads,
      newLeads,
      aiInquiries,
      serviceInquiries,
      newsletterSubscribers,
      portfolioProjects,
      recentLeads,
      recentAiInquiries,
      recentServiceInquiries,
      leadsByStatus,
    ] = await Promise.all([
      prisma.contactLead.count(),
      prisma.contactLead.count({ where: { status: "NEW" } }),
      prisma.aIAgentInquiry.count(),
      prisma.serviceInquiry.count(),
      prisma.newsletterSubscriber.count({ where: { status: "ACTIVE" } }),
      prisma.portfolioProject.count(),
      prisma.contactLead.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
      prisma.aIAgentInquiry.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
      prisma.serviceInquiry.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
      prisma.contactLead.groupBy({ by: ["status"], _count: { _all: true } }),
    ]);

    const months = Array.from({ length: 6 }, (_, i) => 5 - i).map((monthsAgo) => monthRange(monthsAgo));

    const monthly = await Promise.all(
      months.map(async ({ start, end }) => {
        const [leads, serviceInq, aiInq] = await Promise.all([
          prisma.contactLead.count({ where: { createdAt: { gte: start, lt: end } } }),
          prisma.serviceInquiry.count({ where: { createdAt: { gte: start, lt: end } } }),
          prisma.aIAgentInquiry.count({ where: { createdAt: { gte: start, lt: end } } }),
        ]);
        return {
          month: start.toLocaleDateString("en-US", { month: "short" }),
          leads,
          serviceInquiries: serviceInq,
          aiInquiries: aiInq,
        };
      })
    );

    return NextResponse.json({
      counts: {
        totalLeads,
        newLeads,
        aiInquiries,
        serviceInquiries,
        newsletterSubscribers,
        portfolioProjects,
      },
      recentLeads,
      recentAiInquiries,
      recentServiceInquiries,
      leadsByStatus: leadsByStatus.map((row) => ({ status: row.status, count: row._count._all })),
      monthly,
    });
  } catch (err) {
    if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[api/admin/dashboard]", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
