import type { Metadata } from "next";
import { Zap, Brain, Database, Radio } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import FinalCTA from "@/components/sections/FinalCTA";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { automationSteps, automationOutcomes } from "@/lib/data";

export const metadata: Metadata = {
  title: "Business Automation & Workflow Systems",
  description:
    "How MARKVORO builds AI automation workflows in Pakistan — one trigger fans out across your CRM, inbox, WhatsApp and calendar, with an AI agent making the routing decisions.",
  alternates: { canonical: "/automations" },
};

const stepIcons = [Zap, Brain, Database, Radio];

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

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
