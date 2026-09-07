import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SERVICE_CATEGORY_FROM_ENUM } from "@/lib/validations";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
    });
    return NextResponse.json({
      services: services.map((s) => ({ ...s, category: SERVICE_CATEGORY_FROM_ENUM[s.category] ?? s.category })),
    });
  } catch (err) {
    console.error("[api/services]", err);
    return NextResponse.json({ error: "Unable to load services." }, { status: 500 });
  }
}
