const BRAND_GRADIENT =
  "linear-gradient(90deg,#f97316 0%,#ec4899 25%,#8b5cf6 50%,#2f6ff0 75%,#22d3ee 90%,#22c55e 100%)";

function baseLayout(title: string, bodyHtml: string): string {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#050510;font-family:-apple-system,Segoe UI,Roboto,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#050510;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:560px;background:#0d0d20;border-radius:16px;overflow:hidden;border:1px solid #1e1e38;">
            <tr>
              <td style="height:6px;background:${BRAND_GRADIENT};"></td>
            </tr>
            <tr>
              <td style="padding:32px 32px 8px;">
                <p style="margin:0;font-size:20px;font-weight:700;color:#ffffff;">MARKVORO</p>
                <p style="margin:2px 0 0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8b8bb8;">Grow Beyond Limits</p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 32px;color:#e6e6f5;font-size:14px;line-height:1.6;">
                <h2 style="margin:0 0 16px;font-size:18px;color:#ffffff;">${title}</h2>
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;border-top:1px solid #1e1e38;color:#6b6b90;font-size:11px;">
                MARKVORO — Digital Marketing &amp; AI Automation Agency
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function fieldRow(label: string, value?: string | null): string {
  if (!value) return "";
  return `<p style="margin:0 0 10px;"><strong style="color:#9d9dc9;">${label}:</strong> ${escapeHtml(value)}</p>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function confirmationBody(name: string): string {
  return `<p style="margin:0 0 12px;">Hello ${escapeHtml(name)},</p>
<p style="margin:0 0 12px;">Thank you for contacting MARKVORO. We have received your request and our team will review your requirements.</p>
<p style="margin:0;">We will contact you as soon as possible.</p>`;
}

// ---- Contact form ----

export function contactAdminNotificationHtml(lead: {
  fullName: string;
  email: string;
  phone: string;
  businessName?: string | null;
  selectedService: string;
  message: string;
}): string {
  return baseLayout(
    "New MARKVORO Website Lead",
    `${fieldRow("Name", lead.fullName)}${fieldRow("Email", lead.email)}${fieldRow("Phone", lead.phone)}${fieldRow(
      "Business",
      lead.businessName
    )}${fieldRow("Requested Service", lead.selectedService)}${fieldRow("Message", lead.message)}`
  );
}

export function contactCustomerConfirmationHtml(lead: { fullName: string }): string {
  return baseLayout("We Received Your Request — MARKVORO", confirmationBody(lead.fullName));
}

// ---- Service inquiry ----

export function serviceInquiryAdminNotificationHtml(inquiry: {
  name: string;
  email: string;
  phone: string;
  businessName?: string | null;
  service: string;
  budget?: string | null;
  projectDetails: string;
}): string {
  return baseLayout(
    "New MARKVORO Service Inquiry",
    `${fieldRow("Name", inquiry.name)}${fieldRow("Email", inquiry.email)}${fieldRow("Phone", inquiry.phone)}${fieldRow(
      "Business",
      inquiry.businessName
    )}${fieldRow("Service", inquiry.service)}${fieldRow("Budget", inquiry.budget)}${fieldRow(
      "Project Details",
      inquiry.projectDetails
    )}`
  );
}

export function serviceInquiryCustomerConfirmationHtml(inquiry: { name: string }): string {
  return baseLayout("We Received Your Request — MARKVORO", confirmationBody(inquiry.name));
}

// ---- AI agent inquiry ----

export function aiInquiryAdminNotificationHtml(inquiry: {
  fullName: string;
  email: string;
  phone: string;
  businessName?: string | null;
  industry: string;
  agentType: string;
  businessProblem: string;
  estimatedMonthlyCustomers?: string | null;
  preferredCommunication: string;
}): string {
  return baseLayout(
    "New MARKVORO AI Agent Inquiry",
    `${fieldRow("Name", inquiry.fullName)}${fieldRow("Email", inquiry.email)}${fieldRow("Phone", inquiry.phone)}${fieldRow(
      "Business",
      inquiry.businessName
    )}${fieldRow("Industry", inquiry.industry)}${fieldRow("AI Solution", inquiry.agentType)}${fieldRow(
      "Business Problem",
      inquiry.businessProblem
    )}${fieldRow("Est. Monthly Customers", inquiry.estimatedMonthlyCustomers)}${fieldRow(
      "Preferred Contact",
      inquiry.preferredCommunication
    )}`
  );
}

export function aiInquiryCustomerConfirmationHtml(inquiry: { fullName: string }): string {
  return baseLayout("We Received Your Request — MARKVORO", confirmationBody(inquiry.fullName));
}
