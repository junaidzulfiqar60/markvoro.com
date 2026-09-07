import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ testimonials });
  } catch (err) {
    console.error("[api/testimonials]", err);
    return NextResponse.json({ error: "Unable to load testimonials." }, { status: 500 });
  }
}
