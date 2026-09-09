import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

const DEMO_FAQ = `
Q: What are your office hours?
A: We're open Monday to Saturday, 10am to 7pm. Closed on Sundays and public holidays.

Q: Do you offer virtual property tours?
A: Yes — every listing includes a virtual walkthrough video, and we can arrange a live video tour with an agent on request.

Q: What documents do I need to book a property viewing?
A: Just a valid CNIC. No advance payment or booking fee is required for a viewing.

Q: Do you help with mortgage or financing options?
A: Yes, we partner with several local banks and can connect you with a financing advisor once you've shortlisted a property.

Q: What areas do you cover?
A: We currently list properties across DHA, Bahria Town, and Gulberg. New areas are added regularly — ask us if you don't see your area of interest.
`.trim();

async function embedIfConfigured(texts: string[]): Promise<number[][] | null> {
  if (!process.env.OPENAI_API_KEY) return null;
  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({ model: "text-embedding-3-small", input: texts }),
  });
  if (!res.ok) {
    console.warn(`[seed] embedding request failed (${res.status}) — seeding without vectors.`);
    return null;
  }
  const json = (await res.json()) as { data: { embedding: number[] }[] };
  return json.data.map((d) => d.embedding);
}

function chunkText(text: string, maxChars = 1800): string[] {
  return text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .reduce<string[]>((acc, para) => {
      const last = acc[acc.length - 1];
      if (last && (last + "\n\n" + para).length <= maxChars) {
        acc[acc.length - 1] = `${last}\n\n${para}`;
      } else {
        acc.push(para);
      }
      return acc;
    }, []);
}

const MARKVORO_SERVICES = [
  { name: "Social Media Marketing", description: "Instagram, Facebook and TikTok marketing — strategic content, community engagement and high-performing campaigns." },
  { name: "Meta & Google Ads", description: "Performance-driven paid advertising across Facebook, Instagram, Google Search, Display and YouTube, with full conversion tracking." },
  { name: "Search Engine Optimization", description: "Technical, local and content-driven SEO — keyword research, on-page and technical SEO, Google Business optimization, link building." },
  { name: "Content Marketing", description: "Blog writing, copywriting, social content, video scripts and AI-powered content production." },
  { name: "Branding & Creative Design", description: "Logo design, brand identity, social graphics, advertising creatives and brand guidelines." },
  { name: "Website Design & Development", description: "Fast, modern, conversion-focused business websites, landing pages and e-commerce websites." },
  { name: "Email Marketing", description: "Automated email journeys, newsletter design, lead nurturing and audience segmentation." },
  { name: "Affiliate & Influencer Marketing", description: "Partner and affiliate program setup plus influencer outreach and UGC campaigns." },
  { name: "AI Content Creation", description: "AI video generation, AI image creation, AI voiceovers and AI-powered advertising creatives." },
  { name: "AI Agents & Business Automation", description: "Custom AI Sales, Support, Booking, WhatsApp and Receptionist agents, plus full workflow automation." },
];

const MARKVORO_FAQS = [
  { q: "What services does MARKVORO provide?", a: "MARKVORO offers social media marketing, Meta & Google Ads, SEO, content marketing, branding, website design & development, email marketing, affiliate & influencer marketing, and AI agent development / business automation." },
  { q: "Can you manage our social media?", a: "Yes — strategy, content creation, community management and campaign planning across Instagram, Facebook, TikTok and more." },
  { q: "Do you run Facebook and Google ads?", a: "Yes. We build, launch and optimize paid campaigns across Meta and Google (search, display, YouTube) with full conversion tracking." },
  { q: "Can MARKVORO build a website for my business?", a: "Yes — fast, modern, responsive websites, from business sites and landing pages to full e-commerce experiences." },
  { q: "What is an AI agent, and can you build one for my business?", a: "An AI agent is an intelligent assistant trained on your business information that responds to leads, answers customer questions, books appointments and automates repetitive tasks 24/7. We design AI agents tailored to your workflow — sales, support, booking, WhatsApp or full business automation." },
  { q: "How long does it take to build a website?", a: "Most business websites and landing pages are completed within a few weeks from discovery to launch, depending on scope." },
  { q: "Do you work with businesses outside Pakistan?", a: "Yes — MARKVORO works with ambitious businesses globally, delivering remote-friendly digital marketing, web development and AI automation services." },
  { q: "How do I get started or book a call?", a: "Reach out through the contact form on this site, WhatsApp, or email at markvoro08@gmail.com. We'll schedule a discovery call to understand your business and recommend the right growth strategy." },
  { q: "What are your contact details?", a: "Phone/WhatsApp: +92 318 4340349. Email: markvoro08@gmail.com." },
];

async function seedFaqDocument(clientId: string, rawText: string) {
  const existingDoc = await prisma.knowledgeBaseDocument.findFirst({
    where: { clientId, title: "Frequently Asked Questions" },
  });
  if (existingDoc) return;

  const doc = await prisma.knowledgeBaseDocument.create({
    data: {
      clientId,
      title: "Frequently Asked Questions",
      sourceType: "faq",
      rawText,
      status: "PROCESSING",
    },
  });

  const chunks = chunkText(rawText);
  const vectors = await embedIfConfigured(chunks);

  for (let i = 0; i < chunks.length; i++) {
    const id = randomUUID();
    if (vectors) {
      await prisma.$executeRawUnsafe(
        `INSERT INTO "KbChunk" (id, "documentId", "clientId", "chunkText", embedding)
         VALUES ($1, $2, $3, $4, $5::vector)`,
        id,
        doc.id,
        clientId,
        chunks[i],
        `[${vectors[i].join(",")}]`,
      );
    } else {
      await prisma.$executeRawUnsafe(
        `INSERT INTO "KbChunk" (id, "documentId", "clientId", "chunkText", embedding)
         VALUES ($1, $2, $3, $4, NULL)`,
        id,
        doc.id,
        clientId,
        chunks[i],
      );
    }
  }

  await prisma.knowledgeBaseDocument.update({ where: { id: doc.id }, data: { status: "READY" } });
  console.log(`[seed] Seeded ${chunks.length} FAQ chunk(s)${vectors ? " with embeddings" : " (keyword-only — set OPENAI_API_KEY for semantic search)"}.`);
}

async function main() {
  const superAdminEmail = process.env.SEED_SUPER_ADMIN_EMAIL;
  const superAdminPassword = process.env.SEED_SUPER_ADMIN_PASSWORD;
  if (!superAdminEmail || !superAdminPassword) {
    throw new Error("SEED_SUPER_ADMIN_EMAIL and SEED_SUPER_ADMIN_PASSWORD must be set to seed.");
  }

  const superAdminHash = await bcrypt.hash(superAdminPassword, 12);
  await prisma.adminUser.upsert({
    where: { email: superAdminEmail },
    update: { passwordHash: superAdminHash, role: "SUPER_ADMIN" },
    create: {
      name: "MARKVORO Super Admin",
      email: superAdminEmail,
      passwordHash: superAdminHash,
      role: "SUPER_ADMIN",
    },
  });
  console.log(`[seed] Super Admin ready: ${superAdminEmail}`);

  const demoAdminEmail = "admin@demo-realestate.markvoro.com";
  const demoAdminPassword = "demo-password-123";
  const demoAdminHash = await bcrypt.hash(demoAdminPassword, 12);

  let client = await prisma.client.findFirst({ where: { businessName: "Demo Real Estate (MARKVORO)" } });
  if (!client) {
    client = await prisma.client.create({
      data: {
        businessName: "Demo Real Estate (MARKVORO)",
        contactEmail: "hello@demo-realestate.markvoro.com",
        plan: "STARTER",
        status: "ACTIVE",
        aiConfig: {
          provider: "anthropic",
          tone: "warm and helpful, like a knowledgeable local agent",
          language: "auto",
          systemPromptExtra:
            "This is a demo real-estate agency used to showcase the platform to prospective MARKVORO clients.",
        },
        adminUsers: {
          create: {
            name: "Demo Admin",
            email: demoAdminEmail,
            passwordHash: demoAdminHash,
            role: "CLIENT_ADMIN",
          },
        },
      },
    });
  }
  console.log(`[seed] Demo client ready: ${client.businessName} (widgetKey: ${client.widgetKey})`);
  console.log(`[seed] Demo Client Admin login: ${demoAdminEmail} / ${demoAdminPassword}`);
  await seedFaqDocument(client.id, DEMO_FAQ);

  // MARKVORO's own client record — the agency dogfoods the product by running
  // its own AI support agent on markvoro.com (see components/SupportWidget.tsx).
  const markvoroAdminEmail = "admin@markvoro.com";
  let markvoroClient = await prisma.client.findFirst({ where: { businessName: "MARKVORO" } });
  if (!markvoroClient) {
    markvoroClient = await prisma.client.create({
      data: {
        businessName: "MARKVORO",
        contactEmail: "markvoro08@gmail.com",
        contactPhone: "+923184340349",
        plan: "ENTERPRISE",
        status: "ACTIVE",
        aiConfig: {
          provider: "anthropic",
          tone: "confident, friendly and knowledgeable — like a helpful growth consultant, never pushy",
          language: "auto",
          systemPromptExtra:
            "You are the live chat assistant on the MARKVORO marketing website (markvoro.com). MARKVORO is a premium digital marketing, web development and AI automation agency. Answer questions about services, pricing approach (custom quotes, no fixed public pricing), AI agents, and how to get started. Always try to capture the visitor's name, email/WhatsApp and what they need help with as a lead if they show real interest.",
        },
      },
    });
  }
  console.log(`[seed] MARKVORO client ready (widgetKey: ${markvoroClient.widgetKey})`);
  console.log(`[seed] >>> Use this widgetKey in components/SupportWidget.tsx: ${markvoroClient.widgetKey}`);

  if (!(await prisma.adminUser.findUnique({ where: { email: markvoroAdminEmail } }))) {
    await prisma.adminUser.create({
      data: {
        name: "MARKVORO Admin",
        email: markvoroAdminEmail,
        passwordHash: superAdminHash,
        role: "CLIENT_ADMIN",
        clientId: markvoroClient.id,
      },
    });
    console.log(`[seed] MARKVORO Client Admin login: ${markvoroAdminEmail} (same password as Super Admin)`);
  }

  const markvoroFaqText = [
    "# MARKVORO Services",
    ...MARKVORO_SERVICES.map((s) => `- ${s.name}: ${s.description}`),
    "",
    "# Frequently Asked Questions",
    ...MARKVORO_FAQS.map((f) => `Q: ${f.q}\nA: ${f.a}`),
  ].join("\n\n");
  await seedFaqDocument(markvoroClient.id, markvoroFaqText);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
