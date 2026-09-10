import { z } from "zod";
import { serviceOptions } from "@/lib/data";

const email = z.string().trim().min(1, "Email is required.").email("Enter a valid email address.");
const phone = z.string().trim().min(6, "Enter a valid phone number.");
const nonEmpty = (label: string) => z.string().trim().min(1, `${label} is required.`);

export const SERVICE_OPTIONS = serviceOptions as [string, ...string[]];

export const AGENT_TYPE_OPTIONS = [
  "AI Sales Agent",
  "AI Customer Support Agent",
  "AI WhatsApp Agent",
  "AI Booking Agent",
  "AI Receptionist",
  "Custom AI Agent",
  "Business Automation",
] as const;

export const AGENT_TYPE_TO_ENUM: Record<(typeof AGENT_TYPE_OPTIONS)[number], string> = {
  "AI Sales Agent": "AI_SALES_AGENT",
  "AI Customer Support Agent": "AI_CUSTOMER_SUPPORT_AGENT",
  "AI WhatsApp Agent": "AI_WHATSAPP_AGENT",
  "AI Booking Agent": "AI_BOOKING_AGENT",
  "AI Receptionist": "AI_RECEPTIONIST",
  "Custom AI Agent": "CUSTOM_AI_AGENT",
  "Business Automation": "BUSINESS_AUTOMATION",
};

export const PREFERRED_COMMUNICATION_OPTIONS = ["EMAIL", "PHONE", "WHATSAPP"] as const;

// ---- Public form schemas ----

export const contactSchema = z.object({
  name: nonEmpty("Full name"),
  email,
  phone,
  business: z.string().trim().optional(),
  service: z.enum(SERVICE_OPTIONS, { errorMap: () => ({ message: "Please select a service." }) }),
  message: nonEmpty("Message"),
});
export type ContactInput = z.infer<typeof contactSchema>;

export const serviceInquirySchema = z.object({
  name: nonEmpty("Name"),
  email,
  phone,
  businessName: z.string().trim().optional(),
  service: z.enum(SERVICE_OPTIONS, { errorMap: () => ({ message: "Please select a service." }) }),
  budget: z.string().trim().optional(),
  projectDetails: nonEmpty("Project details"),
});
export type ServiceInquiryInput = z.infer<typeof serviceInquirySchema>;

export const aiInquirySchema = z.object({
  fullName: nonEmpty("Full name"),
  email,
  phone,
  businessName: z.string().trim().optional(),
  industry: nonEmpty("Industry"),
  agentType: z.enum(AGENT_TYPE_OPTIONS, { errorMap: () => ({ message: "Please select an AI solution." }) }),
  currentProcess: z.string().trim().optional(),
  businessProblem: nonEmpty("This field"),
  estimatedMonthlyCustomers: z.string().trim().optional(),
  preferredCommunication: z.enum(PREFERRED_COMMUNICATION_OPTIONS).default("EMAIL"),
  message: z.string().trim().optional(),
});
export type AiInquiryInput = z.infer<typeof aiInquirySchema>;

export const newsletterSchema = z.object({ email });
export type NewsletterInput = z.infer<typeof newsletterSchema>;

// ---- Admin schemas ----

export const adminLoginSchema = z.object({
  email,
  password: z.string().min(1, "Password is required."),
});

const LEAD_STATUS_VALUES = ["NEW", "CONTACTED", "IN_PROGRESS", "QUALIFIED", "CONVERTED", "CLOSED"] as const;

export const leadUpdateSchema = z
  .object({
    status: z.enum(LEAD_STATUS_VALUES).optional(),
    notes: z.string().optional(),
  })
  .refine((v) => v.status !== undefined || v.notes !== undefined, {
    message: "Nothing to update.",
  });

const PORTFOLIO_CATEGORY_VALUES = [
  "Website Development",
  "Digital Marketing",
  "Branding",
  "AI Automation",
  "AI Agents",
] as const;

const SERVICE_CATEGORY_VALUES = [
  "Digital Marketing",
  "Web Development",
  "Branding",
  "AI Solutions",
] as const;

// Prisma's @map on an enum *value* only changes the DB storage label — the
// JS/TS client always speaks in terms of the enum member name. These maps
// bridge the spec's human-readable labels (used in Zod schemas / UI selects)
// to the actual Prisma enum keys the database client expects, and back.
export const PORTFOLIO_CATEGORY_TO_ENUM: Record<(typeof PORTFOLIO_CATEGORY_VALUES)[number], string> = {
  "Website Development": "WEBSITE_DEVELOPMENT",
  "Digital Marketing": "DIGITAL_MARKETING",
  Branding: "BRANDING",
  "AI Automation": "AI_AUTOMATION",
  "AI Agents": "AI_AGENTS",
};
export const PORTFOLIO_CATEGORY_FROM_ENUM: Record<string, string> = Object.fromEntries(
  Object.entries(PORTFOLIO_CATEGORY_TO_ENUM).map(([label, key]) => [key, label])
);

export const SERVICE_CATEGORY_TO_ENUM: Record<(typeof SERVICE_CATEGORY_VALUES)[number], string> = {
  "Digital Marketing": "DIGITAL_MARKETING",
  "Web Development": "WEB_DEVELOPMENT",
  Branding: "BRANDING",
  "AI Solutions": "AI_SOLUTIONS",
};
export const SERVICE_CATEGORY_FROM_ENUM: Record<string, string> = Object.fromEntries(
  Object.entries(SERVICE_CATEGORY_TO_ENUM).map(([label, key]) => [key, label])
);

export const serviceCreateSchema = z.object({
  title: nonEmpty("Title"),
  slug: nonEmpty("Slug"),
  shortDescription: nonEmpty("Short description"),
  fullDescription: nonEmpty("Full description"),
  icon: nonEmpty("Icon"),
  category: z.enum(SERVICE_CATEGORY_VALUES),
  features: z.array(z.string().trim().min(1)).default([]),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
  order: z.number().int().default(0),
});
export const serviceUpdateSchema = serviceCreateSchema.partial();

export const portfolioCreateSchema = z.object({
  title: nonEmpty("Title"),
  slug: nonEmpty("Slug"),
  category: z.enum(PORTFOLIO_CATEGORY_VALUES),
  shortDescription: nonEmpty("Short description"),
  fullDescription: nonEmpty("Full description"),
  clientName: z.string().trim().optional(),
  projectUrl: z.string().trim().url("Enter a valid URL.").optional().or(z.literal("")),
  thumbnail: z.string().trim().optional(),
  images: z.array(z.string().trim()).default([]),
  technologies: z.array(z.string().trim()).default([]),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  order: z.number().int().default(0),
});
export const portfolioUpdateSchema = portfolioCreateSchema.partial();

export const testimonialCreateSchema = z.object({
  clientName: nonEmpty("Client name"),
  clientCompany: nonEmpty("Client company"),
  clientImage: z.string().trim().optional(),
  testimonial: nonEmpty("Testimonial"),
  rating: z.number().int().min(1).max(5),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
});
export const testimonialUpdateSchema = testimonialCreateSchema.partial();

export const BLOG_CATEGORY_OPTIONS = [
  "SEO",
  "Web Development",
  "Digital Marketing",
  "Paid Advertising",
  "AI & Automation",
  "Business Growth",
] as const;

export const blogPostCreateSchema = z.object({
  title: nonEmpty("Title"),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required.")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase letters, numbers and hyphens only."),
  excerpt: nonEmpty("Excerpt"),
  content: nonEmpty("Content"),
  coverImage: z.string().trim().optional(),
  category: z.enum(BLOG_CATEGORY_OPTIONS, { errorMap: () => ({ message: "Please select a category." }) }),
  tags: z.array(z.string().trim().min(1)).default([]),
  author: z.string().trim().min(1).default("MARKVORO Team"),
  metaTitle: z.string().trim().optional(),
  metaDescription: z.string().trim().optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  publishedAt: z.coerce.date().optional(),
});
export const blogPostUpdateSchema = blogPostCreateSchema.partial();
