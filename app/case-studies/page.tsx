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
  title: "Case Studies from Our Real Client Builds",
  description:
    "Reference builds showing how MARKVORO's AI agents and automation systems change day-to-day operations for real estate, e-commerce and home services businesses.",
  alternates: { canonical: "/case-studies" },
};

const caseStudiesFaqs = [
  {
    question: "Are these real, named clients?",
    answer:
      "No — these are reference architectures describing the problem, the system we'd build and the operational change it produces, not results attributed to a specific named client. We built them this way so you can evaluate the approach without us disclosing another business's private data.",
  },
  {
    question: "How is a new reference build scoped for my business?",
    answer:
      "The same way as any engagement — a discovery call where we map your actual enquiry channels, qualifying criteria and existing tools, then design the system around that rather than adapting one of the builds above.",
  },
  {
    question: "What do these three examples have in common?",
    answer:
      "Each one replaces a manual, single-channel process (a callback, a support ticket, an office-hours-only reply) with an AI agent that responds immediately and hands off to a human only when a conversation genuinely needs one — the pattern behind most of what we build, regardless of industry.",
  },
];

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
          <div className="section-padding container-max">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              What These Builds Have in Common
            </h2>
            <div className="mt-6 max-w-3xl space-y-4">
              <p className="text-sm leading-relaxed text-white/60 sm:text-base">
                Every reference build below starts from the same place: a real bottleneck that was
                being handled manually — enquiries triaged by hand across three inboxes, a support
                queue full of the same repeat questions, a missed call that meant a missed job.
                None of them started from a template; each system was mapped around the specific
                channels, tools and qualifying criteria that business already had in place.
              </p>
              <p className="text-sm leading-relaxed text-white/60 sm:text-base">
                What changed afterward follows the same shape too — an AI agent takes the first
                response instantly, on whatever channel the enquiry actually arrived on, and hands
                off to a person only once a conversation genuinely needs one. The &quot;Before/
                After&quot; breakdown on each build below shows exactly what that looks like in
                practice.
              </p>
            </div>
          </div>
        </section>

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

        {caseStudiesFaqs.length > 0 && (
          <section className="relative py-16 sm:py-24">
            <div className="section-padding container-max">
              <h2 className="text-center font-display text-2xl font-bold text-white sm:text-3xl">
                Case Studies FAQs
              </h2>
              <div className="mx-auto mt-10 max-w-3xl divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.02]">
                {caseStudiesFaqs.map((faq) => (
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
        )}

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
