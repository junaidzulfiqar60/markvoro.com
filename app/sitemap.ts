import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { servicePages } from "@/lib/servicePages";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/solutions", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/ai-agents", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/automations", priority: 0.8, changeFrequency: "weekly" as const },
    ...servicePages.map((s) => ({
      path: `/services/${s.slug}`,
      priority: 0.8,
      changeFrequency: "weekly" as const,
    })),
    { path: "/industries", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/case-studies", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/pricing", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.6, changeFrequency: "monthly" as const },
  ];

  const lastModified = new Date();

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
