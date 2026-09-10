import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { servicePages } from "@/lib/servicePages";
import { getBlogPosts } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getBlogPosts();

  const routes: {
    path: string;
    priority: number;
    changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
    lastModified?: Date;
  }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/solutions", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/ai-agents", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/automations", priority: 0.8, changeFrequency: "weekly" as const },
    ...servicePages.map((s) => ({
      path: `/services/${s.slug}`,
      priority: 0.8,
      changeFrequency: "weekly" as const,
    })),
    { path: "/blog", priority: 0.7, changeFrequency: "daily" as const },
    ...blogPosts.map((post) => ({
      path: `/blog/${post.slug}`,
      priority: 0.6,
      changeFrequency: "monthly" as const,
      lastModified: new Date(post.publishedAt),
    })),
    { path: "/industries", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/case-studies", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/pricing", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.6, changeFrequency: "monthly" as const },
  ];

  const lastModified = new Date();

  return routes.map(({ path, priority, changeFrequency, lastModified: itemLastModified }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: itemLastModified ?? lastModified,
    changeFrequency,
    priority,
  }));
}
