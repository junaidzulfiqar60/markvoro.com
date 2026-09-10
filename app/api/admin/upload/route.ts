export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { requireAdmin, AuthError } from "@/lib/auth-server";
import { isCloudinaryConfigured, uploadImage } from "@/lib/cloudinary";

const MAX_BYTES = 4 * 1024 * 1024;
const ALLOWED_FOLDERS = ["portfolio", "testimonials", "profile", "blog"];

export async function POST(request: Request) {
  try {
    await requireAdmin("EDITOR");

    if (!isCloudinaryConfigured()) {
      return NextResponse.json(
        { error: "Image upload is not configured. Set the Cloudinary environment variables." },
        { status: 503 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const folder = String(formData.get("folder") || "portfolio");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }
    if (!ALLOWED_FOLDERS.includes(folder)) {
      return NextResponse.json({ error: "Invalid upload target." }, { status: 400 });
    }
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image files are allowed." }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "Image must be smaller than 4MB." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await uploadImage(buffer, file.type, folder);

    return NextResponse.json({ url: result.url, publicId: result.publicId });
  } catch (err) {
    if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[api/admin/upload]", err);
    return NextResponse.json({ error: "Upload failed. Please try again." }, { status: 500 });
  }
}
