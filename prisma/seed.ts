import { PrismaClient, type ServiceCategory } from "@prisma/client";
import bcrypt from "bcryptjs";
import { blogPosts } from "../lib/blogData";

const prisma = new PrismaClient();

// Sample/editable seed data — manage the real content via /admin/services
// once you're logged in. Feel free to edit, add, or remove rows here.
const SAMPLE_SERVICES = [
  {
    title: "Social Media Marketing",
    slug: "social-media-marketing",
    shortDescription: "Build a powerful social media presence with strategic content and engagement.",
    fullDescription:
      "Build a powerful social media presence with strategic content, community engagement, content planning and high-performing campaigns across Instagram, Facebook and TikTok.",
    icon: "Share2",
    category: "DIGITAL_MARKETING",
    features: ["Instagram Marketing", "Facebook Marketing", "TikTok Marketing", "Content Strategy"],
    order: 1,
  },
  {
    title: "Paid Advertising",
    slug: "paid-advertising",
    shortDescription: "Performance-driven paid campaigns across Meta and Google.",
    fullDescription:
      "Performance-driven paid advertising campaigns engineered to reach the right audience and convert them into customers across Meta and Google Ads.",
    icon: "Megaphone",
    category: "DIGITAL_MARKETING",
    features: ["Facebook Ads", "Google Search Ads", "Display Ads", "Conversion Tracking"],
    order: 2,
  },
  {
    title: "SEO",
    slug: "seo",
    shortDescription: "Rank higher and drive consistent organic traffic.",
    fullDescription:
      "Rank higher, get discovered and drive consistent organic traffic with technical, local and content-driven SEO.",
    icon: "Search",
    category: "DIGITAL_MARKETING",
    features: ["Keyword Research", "On-Page SEO", "Technical SEO", "Local SEO"],
    order: 3,
  },
  {
    title: "Website Development",
    slug: "website-development",
    shortDescription: "Fast, modern and conversion-focused websites.",
    fullDescription:
      "Fast, modern and conversion-focused websites built to turn visitors into loyal customers, from landing pages to full e-commerce experiences.",
    icon: "Code2",
    category: "WEB_DEVELOPMENT",
    features: ["Business Websites", "Landing Pages", "E-Commerce Websites", "Speed Optimization"],
    order: 4,
  },
  {
    title: "Branding",
    slug: "branding",
    shortDescription: "Distinct, premium visual identities for your business.",
    fullDescription:
      "Distinct, premium visual identities that make your business instantly recognizable across every channel.",
    icon: "Palette",
    category: "BRANDING",
    features: ["Logo Design", "Brand Identity", "Brand Guidelines", "Marketing Materials"],
    order: 5,
  },
  {
    title: "Email Marketing",
    slug: "email-marketing",
    shortDescription: "Automated email journeys that nurture leads and drive revenue.",
    fullDescription:
      "Automated email journeys that nurture leads, retain customers and drive repeat revenue through targeted campaigns.",
    icon: "Mail",
    category: "DIGITAL_MARKETING",
    features: ["Email Campaigns", "Email Automation", "Lead Nurturing", "Audience Segmentation"],
    order: 6,
  },
  {
    title: "AI Content Creation",
    slug: "ai-content-creation",
    shortDescription: "Scale content production with cutting-edge AI tools.",
    fullDescription:
      "Scale your content production using cutting-edge AI tools for video, image, voice and copy.",
    icon: "Sparkles",
    category: "AI_SOLUTIONS",
    features: ["AI Video Generation", "AI Image Creation", "AI Voiceovers"],
    order: 7,
  },
  {
    title: "AI Agent Development",
    slug: "ai-agent-development",
    shortDescription: "Custom AI agents tailored to your business workflow.",
    fullDescription:
      "We design AI agents tailored to your workflow — sales, support, booking, WhatsApp or full business automation.",
    icon: "Workflow",
    category: "AI_SOLUTIONS",
    features: ["AI Sales Agents", "AI Support Agents", "AI WhatsApp Agents", "AI Booking Agents"],
    order: 8,
  },
  {
    title: "Business Automation",
    slug: "business-automation",
    shortDescription: "Custom automation systems designed around your workflow.",
    fullDescription:
      "Custom AI automation systems designed around your business workflow to eliminate repetitive manual work.",
    icon: "Zap",
    category: "AI_SOLUTIONS",
    features: ["Workflow Automation", "Lead Management", "Data Processing"],
    order: 9,
  },
];

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL;
  const adminPassword = process.env.SEED_ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error(
      "Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD environment variables before seeding."
    );
  }

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: "MARKVORO Admin",
      email: adminEmail,
      passwordHash,
      role: "SUPER_ADMIN",
    },
  });
  console.log(`Admin user ready: ${adminEmail}`);

  for (const service of SAMPLE_SERVICES) {
    await prisma.service.upsert({
      where: { title: service.title },
      update: {},
      create: { ...service, category: service.category as ServiceCategory },
    });
  }
  console.log(`Seeded ${SAMPLE_SERVICES.length} sample services.`);

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage,
        category: post.category,
        tags: post.tags,
        author: post.author,
        featured: post.featured ?? false,
        publishedAt: new Date(post.publishedAt),
      },
    });
  }
  console.log(`Seeded ${blogPosts.length} blog posts.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
