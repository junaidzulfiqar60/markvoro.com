import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import AgentRuntimePanel from "@/components/ui/AgentRuntimePanel";
import AIAgentsGrid from "@/components/ui/AIAgentsGrid";
import FinalCTA from "@/components/sections/FinalCTA";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { caseStudies } from "@/lib/data";

export const metadata: Metadata = {
  title: "AI Customer Support & Sales Agents in Pakistan",
  description:
    "Custom AI Sales, Support, Booking and WhatsApp agents from MARKVORO — trained on your business, live on your channels, with pricing on our AI service page.",
  alternates: { canonical: "/ai-agents" },
};

const aiAgentsFaqs = [
  {
    question: "Which channels can an AI agent run on?",
    answer:
      "Your website chat, WhatsApp and email are the most common starting channels — most businesses start with one and add channels once the first agent is proven. See our automations page for how these connect to your CRM and calendar.",
  },
  {
    question: "Do we need technical staff to maintain the agent?",
    answer:
      "No — we handle training, updates and monitoring. You can request changes (new information, new escalation rules) any time without needing to touch any code yourself.",
  },
  {
    question: "What happens when the agent doesn't know the answer?",
    answer:
      "It escalates cleanly to a human instead of guessing — every agent is built with explicit boundaries on what it can decide versus when it needs to hand off, so customers never get a confidently wrong answer.",
  },
];

// Reference builds pulled from lib/data.ts's caseStudies — illustrative
// architectures, not results attributed to a named client (see the
// "Never fabricate case studies" guardrail; full detail lives on
// /case-studies).
const featuredCaseStudies = caseStudies.slice(0, 2);

export default function AIAgentsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="AI Agents"
          title={
            <>
              Agents that work your
              <br />
              <span className="text-gradient">business, not just your inbox.</span>
            </>
          }
          description="Every MARKVORO agent is custom-built and trained around your business — your services, your tone and your customers. Observable, interruptible and bounded to the tools you grant it."
        />

        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "AI Agents", href: "/ai-agents" }]} />

        <section className="relative py-10 sm:py-16">
          <div className="section-padding container-max flex justify-center">
            <AgentRuntimePanel />
          </div>
        </section>

        <section className="relative py-16 sm:py-24">
          <div className="section-padding container-max">
            <AIAgentsGrid />
          </div>
        </section>

        <section className="relative py-10 sm:py-16">
          <div className="section-padding container-max">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              What Makes This an Agent, Not a Chatbot
            </h2>
            <div className="mt-6 max-w-3xl space-y-4">
              <p className="text-sm leading-relaxed text-white/60 sm:text-base">
                Most things marketed as an &quot;AI agent&quot; are a scripted
                chatbot with a new name — a fixed decision tree that breaks the
                moment a customer asks something outside the script. What we build
                is different: an agent trained on your actual business information
                that can reason through a real conversation, decide what to do
                next, and know when a conversation genuinely needs a person instead
                of trapping them in a menu.
              </p>
              <p className="text-sm leading-relaxed text-white/60 sm:text-base">
                Every agent is scoped to the tools and information you actually
                grant it — it can look up an order, check availability or draft a
                follow-up, but only within boundaries you set. You can see what
                it&apos;s doing at every step, adjust its instructions, and hand a
                specific conversation to a human at any time — it&apos;s built to
                be supervised, not to run unaccountably in the background.
              </p>
            </div>
          </div>
        </section>

        <section className="relative py-10 sm:py-16">
          <div className="section-padding container-max">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Reference Builds
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-white/45">
              Representative architectures showing how an agent changes day-to-day
              operations — see all reference builds on{" "}
              <a href="/case-studies" className="text-brand-cyan hover:underline">
                case studies
              </a>
              .
            </p>
            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {featuredCaseStudies.map((study) => (
                <div
                  key={study.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
                >
                  <span className="eyebrow-mono text-white/40">{study.industry}</span>
                  <h3 className="mt-2 font-display text-lg font-semibold text-white">
                    {study.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">{study.solution}</p>
                  <p className="mt-3 text-sm leading-relaxed text-brand-cyan/90">{study.outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-16 sm:py-24">
          <div className="section-padding container-max">
            <h2 className="text-center font-display text-2xl font-bold text-white sm:text-3xl">
              AI Agents FAQs
            </h2>
            <div className="mx-auto mt-10 max-w-3xl divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.02]">
              {aiAgentsFaqs.map((faq) => (
                <div key={faq.question} className="px-6 py-6 sm:px-8">
                  <h3 className="font-display text-sm font-semibold text-white sm:text-base">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
