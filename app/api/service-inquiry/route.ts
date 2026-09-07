import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serviceInquirySchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rateLimit";
import { getClientIp } from "@/lib/http";
import { sendAdminNotification, sendCustomerConfirmation } from "@/lib/email";
import {
  serviceInquiryAdminNotificationHtml,
  serviceInquiryCustomerConfirmationHtml,
} from "@/lib/emailTemplates";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rl = checkRateLimit(`service-inquiry:${ip}`, 5, 10 * 60 * 1000);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = serviceInquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check your form and try again.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  try {
    const inquiry = await prisma.serviceInquiry.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        businessName: parsed.data.businessName || null,
        service: parsed.data.service,
        budget: parsed.data.budget || null,
        projectDetails: parsed.data.projectDetails,
      },
    });

    await Promise.allSettled([
      sendAdminNotification({
        subject: `New MARKVORO Service Inquiry — ${inquiry.name}`,
        html: serviceInquiryAdminNotificationHtml(inquiry),
      }),
      sendCustomerConfirmation({
        to: inquiry.email,
        subject: "We Received Your Request — MARKVORO",
        html: serviceInquiryCustomerConfirmationHtml(inquiry),
      }),
    ]);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("[api/service-inquiry]", err);
    return NextResponse.json({ error: "Something went wrong. Please try again later." }, { status: 500 });
  }
}
