import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    });
    return NextResponse.json({ posts });
  } catch (err) {
    console.error("[api/blog]", err);
    return NextResponse.json({ error: "Unable to load blog posts." }, { status: 500 });
  }
}
