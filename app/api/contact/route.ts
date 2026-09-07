import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rateLimit";
import { getClientIp } from "@/lib/http";
import { sendAdminNotification, sendCustomerConfirmation } from "@/lib/email";
import { contactAdminNotificationHtml, contactCustomerConfirmationHtml } from "@/lib/emailTemplates";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rl = checkRateLimit(`contact:${ip}`, 5, 10 * 60 * 1000);
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

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check your form and try again.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  try {
    const lead = await prisma.contactLead.create({
      data: {
        fullName: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        businessName: parsed.data.business || null,
        selectedService: parsed.data.service,
        message: parsed.data.message,
        source: "CONTACT_FORM",
      },
    });

    await Promise.allSettled([
      sendAdminNotification({
        subject: `New MARKVORO Website Lead — ${lead.fullName}`,
        html: contactAdminNotificationHtml(lead),
      }),
      sendCustomerConfirmation({
        to: lead.email,
        subject: "We Received Your Request — MARKVORO",
        html: contactCustomerConfirmationHtml(lead),
      }),
    ]);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("[api/contact]", err);
    return NextResponse.json({ error: "Something went wrong. Please try again later." }, { status: 500 });
  }
}
