import type { Metadata } from "next";
import { Zap, Brain, Database, Radio } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import FinalCTA from "@/components/sections/FinalCTA";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { automationSteps, automationOutcomes, caseStudies } from "@/lib/data";

export const metadata: Metadata = {
  title: "Business Automation & Workflow Systems Built",
  description:
    "How MARKVORO builds AI automation workflows in Pakistan — one trigger fans out across your CRM, inbox, WhatsApp and calendar via an AI routing agent.",
  alternates: { canonical: "/automations" },
};

const stepIcons = [Zap, Brain, Database, Radio];

const automationsFaqs = [
  {
    question: "What tools can an automation connect to?",
    answer:
      "Most commonly your CRM, calendar, WhatsApp Business and email — plus any form or booking tool already on your site. We scope the exact connections during discovery rather than assuming a fixed tool stack.",
  },
  {
    question: "What happens if a step in the automation fails?",
    answer:
      "Every run is logged and traceable, so a failed step is visible immediately rather than silently dropping a lead. Critical failures can also trigger a direct alert to your team.",
  },
  {
    question: "Is this the same as the AI agents you build?",
    answer:
      "Automations are the connective tissue — the AI agent makes a decision, and the automation carries that decision through to your CRM, calendar and team. See our AI agents page for the agents themselves.",
  },
];

// A single reference build most relevant to a routed, multi-step workflow —
// illustrative architecture from lib/data.ts's caseStudies, not a named
// client's results (see the "Never fabricate case studies" guardrail).
const featuredCaseStudy = caseStudies.find((s) => s.industry === "Home Services") ?? caseStudies[0];

export default function AutomationsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Automations"
          title={
            <>
              One trigger.
              <br />
              <span className="text-gradient">No one touching a keyboard.</span>
            </>
          }
          description="This is what an end-to-end workflow looks like once it's built properly — a single trigger fans out across your CRM, inbox, WhatsApp and calendar, with an AI agent making the routing decisions in between."
        />

        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Automations", href: "/automations" }]} />

        {/* Pipeline */}
        <section className="relative py-10 sm:py-16">
          <div className="section-padding container-max">
            <div className="hud-corners glass-panel relative overflow-hidden p-6 sm:p-10">
              <div className="hud-scanline" />
              <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {automationSteps.map((step, i) => {
                  const Icon = stepIcons[i];
                  return (
                    <Reveal key={step.label} delay={i * 0.1}>
                      <div className="relative">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-brand-gradient bg-300% shadow-glow">
                            <Icon className="h-5 w-5 text-white" strokeWidth={1.7} />
                          </div>
                          <span className="eyebrow-mono text-white/35">
                            Step {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <h3 className="mt-4 font-display text-base font-semibold text-white">
                          {step.label}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-white/55">{step.detail}</p>
                        {i < automationSteps.length - 1 && (
                          <div className="mt-5 hidden h-px w-full bg-gradient-to-r from-white/15 to-transparent lg:block" />
                        )}
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* What "automation" means here */}
        <section className="relative py-10 sm:py-16">
          <div className="section-padding container-max">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              A System, Not a Single Zap
            </h2>
            <div className="mt-6 max-w-3xl space-y-4">
              <p className="text-sm leading-relaxed text-white/60 sm:text-base">
                &quot;Automation&quot; usually means one trigger, one action, done.
                What&apos;s built here is closer to a small system: a trigger event
                kicks off a sequence where an AI agent actually makes a decision —
                which team member to notify, whether a lead is qualified, what the
                next message should say — rather than mechanically forwarding data
                from one tool to another.
              </p>
              <p className="text-sm leading-relaxed text-white/60 sm:text-base">
                Every workflow starts from a real trigger already happening in your
                business today — a form submission, a missed call, a WhatsApp
                message, a booking request — and is mapped end-to-end before
                anything is built, so you can see exactly what happens at each step
                before it goes live. Nothing runs silently; every run leaves a
                trace you can review.
              </p>
            </div>
          </div>
        </section>

        {/* Reference build */}
        <section className="relative py-10 sm:py-16">
          <div className="section-padding container-max">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              A Reference Build
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-white/45">
              A representative architecture showing how a routed workflow changes
              day-to-day operations — see more on{" "}
              <a href="/case-studies" className="text-brand-cyan hover:underline">
                case studies
              </a>
              .
            </p>
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
              <span className="eyebrow-mono text-white/40">{featuredCaseStudy.industry}</span>
              <h3 className="mt-2 font-display text-lg font-semibold text-white">
                {featuredCaseStudy.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{featuredCaseStudy.problem}</p>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{featuredCaseStudy.solution}</p>
              <p className="mt-3 text-sm leading-relaxed text-brand-cyan/90">{featuredCaseStudy.outcome}</p>
            </div>
          </div>
        </section>

        {/* Outcomes */}
        <section className="relative overflow-hidden py-10 sm:py-16">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-brand-gradient-soft opacity-30" />
          <div className="section-padding container-max">
            <div className="glass-panel grid grid-cols-2 gap-10 p-10 sm:p-14 lg:grid-cols-4">
              {automationOutcomes.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 0.1} className="text-center">
                  <Counter value={stat.value} />
                  <p className="eyebrow-mono mt-3 text-white/50">{stat.label}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-16 sm:py-24">
          <div className="section-padding container-max">
            <h2 className="text-center font-display text-2xl font-bold text-white sm:text-3xl">
              Automations FAQs
            </h2>
            <div className="mx-auto mt-10 max-w-3xl divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.02]">
              {automationsFaqs.map((faq) => (
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
