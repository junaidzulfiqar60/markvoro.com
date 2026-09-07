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

  const existingDoc = await prisma.knowledgeBaseDocument.findFirst({
    where: { clientId: client.id, title: "Frequently Asked Questions" },
  });
  if (!existingDoc) {
    const doc = await prisma.knowledgeBaseDocument.create({
      data: {
        clientId: client.id,
        title: "Frequently Asked Questions",
        sourceType: "faq",
        rawText: DEMO_FAQ,
        status: "PROCESSING",
      },
    });

    const chunks = chunkText(DEMO_FAQ);
    const vectors = await embedIfConfigured(chunks);

    for (let i = 0; i < chunks.length; i++) {
      const id = randomUUID();
      if (vectors) {
        await prisma.$executeRawUnsafe(
          `INSERT INTO "KbChunk" (id, "documentId", "clientId", "chunkText", embedding)
           VALUES ($1, $2, $3, $4, $5::vector)`,
          id,
          doc.id,
          client.id,
          chunks[i],
          `[${vectors[i].join(",")}]`,
        );
      } else {
        await prisma.$executeRawUnsafe(
          `INSERT INTO "KbChunk" (id, "documentId", "clientId", "chunkText", embedding)
           VALUES ($1, $2, $3, $4, NULL)`,
          id,
          doc.id,
          client.id,
          chunks[i],
        );
      }
    }

    await prisma.knowledgeBaseDocument.update({ where: { id: doc.id }, data: { status: "READY" } });
    console.log(`[seed] Seeded ${chunks.length} FAQ chunk(s)${vectors ? " with embeddings" : " (keyword-only — set OPENAI_API_KEY for semantic search)"}.`);
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
