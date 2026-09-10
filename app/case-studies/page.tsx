import type { Metadata } from "next";
import { Check, X } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import FinalCTA from "@/components/sections/FinalCTA";
import Reveal from "@/components/ui/Reveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { caseStudies } from "@/lib/data";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Reference builds showing how MARKVORO's AI agents and automation systems change day-to-day operations for real estate, e-commerce and home services businesses.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Case Studies"
          title={
            <>
              Reference builds,
              <br />
              <span className="text-gradient">end to end.</span>
            </>
          }
          description="Each example below shows the problem, the system we'd build and the operational change it produces — illustrative reference architectures, not reports of a specific named client."
        />

        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Case Studies", href: "/case-studies" }]} />

        <section className="relative py-10 sm:py-16">
          <div className="section-padding container-max space-y-8">
            {caseStudies.map((study, i) => (
              <Reveal key={study.title} delay={i * 0.08}>
                <div className="gradient-border">
                  <div className="gradient-border-inner grid grid-cols-1 gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_1fr]">
                    <div>
                      <span className="status-pill-live">{study.industry}</span>
                      <p className="eyebrow-mono mt-4 text-white/35">Sample Case Study</p>
                      <h3 className="mt-2 font-display text-2xl font-bold text-white">
                        {study.title}
                      </h3>

                      <div className="mt-6 space-y-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-brand-pink">
                            Problem
                          </p>
                          <p className="mt-1.5 text-sm leading-relaxed text-white/60">{study.problem}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-brand-cyan">
                            Solution
                          </p>
                          <p className="mt-1.5 text-sm leading-relaxed text-white/60">{study.solution}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-brand-green">
                            Outcome
                          </p>
                          <p className="mt-1.5 text-sm leading-relaxed text-white/60">{study.outcome}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                        <p className="eyebrow-mono text-white/40">Before</p>
                        <ul className="mt-4 space-y-3">
                          {study.before.map((line) => (
                            <li key={line} className="flex items-start gap-2 text-sm text-white/50">
                              <X className="mt-0.5 h-3.5 w-3.5 flex-none text-white/30" />
                              {line}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-2xl border border-brand-green/20 bg-brand-green/[0.04] p-5">
                        <p className="eyebrow-mono text-brand-green/70">After</p>
                        <ul className="mt-4 space-y-3">
                          {study.after.map((line) => (
                            <li key={line} className="flex items-start gap-2 text-sm text-white/80">
                              <Check className="mt-0.5 h-3.5 w-3.5 flex-none text-brand-green" />
                              {line}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}

            <p className="mx-auto max-w-2xl pt-4 text-center text-xs text-white/35">
              Sample case studies. These describe reference architectures and the operational
              differences they produce — they do not represent specific named clients or
              guaranteed results.
            </p>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
