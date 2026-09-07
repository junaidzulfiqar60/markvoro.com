import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { aiInquirySchema, AGENT_TYPE_TO_ENUM } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rateLimit";
import { getClientIp } from "@/lib/http";
import { sendAdminNotification, sendCustomerConfirmation } from "@/lib/email";
import { aiInquiryAdminNotificationHtml, aiInquiryCustomerConfirmationHtml } from "@/lib/emailTemplates";
import type { AgentType } from "@prisma/client";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rl = checkRateLimit(`ai-inquiry:${ip}`, 5, 10 * 60 * 1000);
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

  const parsed = aiInquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check your form and try again.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  try {
    const inquiry = await prisma.aIAgentInquiry.create({
      data: {
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        businessName: parsed.data.businessName || null,
        industry: parsed.data.industry,
        agentType: AGENT_TYPE_TO_ENUM[parsed.data.agentType] as AgentType,
        currentProcess: parsed.data.currentProcess || null,
        businessProblem: parsed.data.businessProblem,
        estimatedMonthlyCustomers: parsed.data.estimatedMonthlyCustomers || null,
        preferredCommunication: parsed.data.preferredCommunication,
        message: parsed.data.message || null,
      },
    });

    await Promise.allSettled([
      sendAdminNotification({
        subject: `New MARKVORO AI Agent Inquiry — ${inquiry.fullName}`,
        html: aiInquiryAdminNotificationHtml({ ...inquiry, agentType: parsed.data.agentType }),
      }),
      sendCustomerConfirmation({
        to: inquiry.email,
        subject: "We Received Your Request — MARKVORO",
        html: aiInquiryCustomerConfirmationHtml(inquiry),
      }),
    ]);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("[api/ai-inquiry]", err);
    return NextResponse.json({ error: "Something went wrong. Please try again later." }, { status: 500 });
  }
}
