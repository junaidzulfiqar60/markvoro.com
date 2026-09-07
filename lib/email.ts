import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

type EmailArgs = { subject: string; html: string };

/**
 * Email sending is best-effort and must never throw into a caller — the
 * database write is the source of truth for every lead/inquiry. If Resend
 * isn't configured yet (no API key), we log and skip instead of failing.
 */
export async function sendAdminNotification({ subject, html }: EmailArgs): Promise<void> {
  if (!resend || !process.env.ADMIN_EMAIL || !process.env.EMAIL_FROM) {
    console.warn("[email] not configured — skipping admin notification:", subject);
    return;
  }
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject,
      html,
    });
  } catch (err) {
    console.error("[email] admin notification failed:", err);
  }
}

export async function sendCustomerConfirmation({
  to,
  subject,
  html,
}: EmailArgs & { to: string }): Promise<void> {
  if (!resend || !process.env.EMAIL_FROM) {
    console.warn("[email] not configured — skipping customer confirmation:", subject);
    return;
  }
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });
  } catch (err) {
    console.error("[email] customer confirmation failed:", err);
  }
}
