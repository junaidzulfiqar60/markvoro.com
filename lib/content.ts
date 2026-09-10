import { prisma } from "@/lib/prisma";
import { PORTFOLIO_CATEGORY_FROM_ENUM } from "@/lib/validations";
import {
  services as staticServices,
  webProjects as staticWebProjects,
  testimonials as staticTestimonials,
  type Service,
  type WebProject,
  type Testimonial,
} from "@/lib/data";

// DB-backed homepage content, each falling back to lib/data.ts's static
// arrays when its table is empty — shared by the homepage and the dedicated
// /solutions page so both stay in sync with admin-managed content.

// Slugs that actually resolve to a /services/<slug> page — guards against an
// admin-entered DB Service.slug that doesn't match any real route, which
// would otherwise render a broken "Learn more" link.
const DEDICATED_SERVICE_SLUGS = new Set([
  "seo",
  "social-media-marketing",
  "web-development",
  "email-marketing",
  "paid-advertising",
  "ai-agents",
]);

const PROJECT_GRADIENTS = [
  "from-brand-orange via-brand-pink to-brand-purple",
  "from-brand-pink via-brand-purple to-brand-blue",
  "from-brand-blue via-brand-cyan to-brand-green",
  "from-brand-green via-brand-cyan to-brand-purple",
];

export async function getServices(): Promise<Service[]> {
  try {
    const rows = await prisma.service.findMany({ where: { active: true }, orderBy: { order: "asc" } });
    if (rows.length === 0) return staticServices;
    return rows.map((row, i) => ({
      number: String(row.order || i + 1).padStart(2, "0"),
      icon: row.icon,
      name: row.title,
      description: row.shortDescription,
      features: row.features,
      slug: DEDICATED_SERVICE_SLUGS.has(row.slug) ? row.slug : undefined,
    }));
  } catch (err) {
    console.error("[content] failed to load services from DB, using static fallback", err);
    return staticServices;
  }
}

export async function getPortfolioProjects(): Promise<WebProject[]> {
  try {
    const rows = await prisma.portfolioProject.findMany({
      where: { published: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    if (rows.length === 0) return staticWebProjects;
    return rows.map((row, i) => ({
      category: PORTFOLIO_CATEGORY_FROM_ENUM[row.category] ?? row.category,
      title: row.title,
      tags: row.technologies.slice(0, 3),
      gradient: PROJECT_GRADIENTS[i % PROJECT_GRADIENTS.length],
    }));
  } catch (err) {
    console.error("[content] failed to load portfolio from DB, using static fallback", err);
    return staticWebProjects;
  }
}

export async function getTestimonials(): Promise<{ items: Testimonial[]; isPlaceholder: boolean }> {
  try {
    const rows = await prisma.testimonial.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } });
    if (rows.length === 0) return { items: staticTestimonials, isPlaceholder: true };
    return {
      items: rows.map((row) => ({
        quote: row.testimonial,
        name: row.clientName,
        business: row.clientCompany,
        rating: row.rating,
      })),
      isPlaceholder: false,
    };
  } catch (err) {
    console.error("[content] failed to load testimonials from DB, using static fallback", err);
    return { items: staticTestimonials, isPlaceholder: true };
  }
}
