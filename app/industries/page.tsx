import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import FinalCTA from "@/components/sections/FinalCTA";
import Reveal from "@/components/ui/Reveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { industries } from "@/lib/data";

export const metadata: Metadata = {
  title: "Industries We Serve Across All of Pakistan",
  description:
    "MARKVORO builds marketing and AI automation systems for real estate, e-commerce, restaurants, home services, healthcare and education businesses.",
  alternates: { canonical: "/industries" },
};

const industriesFaqs = [
  {
    question: "What if my industry isn't listed above?",
    answer:
      "The list above shows the sectors we build for most often, not a fixed menu. The underlying system — an AI agent plus the automations connecting it to your CRM, calendar and inbox — is built from your actual process, not a sector template. If the work is repeatable, we can scope it on a discovery call regardless of what industry you're in.",
  },
  {
    question: "How long does an industry-specific build take?",
    answer:
      "It depends on how many channels and integrations are involved — a single-channel agent for one qualifying flow is faster than a multi-channel system spanning WhatsApp, calendar and a CRM. We give a firm timeline after a short discovery call rather than a generic estimate.",
  },
  {
    question: "Can one system handle a business that spans more than one industry, like retail plus services?",
    answer:
      "Yes — the agent is scoped around your actual business, not a single industry label. A business selling products and booking services can run both qualifying flows through the same system; we just map both processes during discovery instead of picking one template.",
  },
];

export default function IndustriesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Industries"
          title={
            <>
              Built for how your
              <br />
              <span className="text-gradient">industry actually operates.</span>
            </>
          }
          description="The architecture stays the same. The conversation, the qualifying criteria and the integrations are built around your sector."
        />

        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Industries", href: "/industries" }]} />

        <section className="relative py-10 sm:py-16">
          <div className="section-padding container-max">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {industries.map((item, i) => (
                <Reveal key={item.name} delay={(i % 4) * 0.08}>
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-white/20">
                    <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-gradient opacity-0 blur-[60px] transition-opacity duration-500 group-hover:opacity-25" />
                    <span className="status-pill-done relative">{item.useCase}</span>
                    <h3 className="relative mt-4 font-display text-lg font-semibold text-white">
                      {item.name}
                    </h3>
                    <p className="relative mt-3 text-sm leading-relaxed text-white/55">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <p className="mx-auto mt-12 max-w-xl text-center text-sm text-white/50">
              Not listed? The systems are built from your process, not a sector template — if the
              work is repeatable, MARKVORO can automate it.
            </p>
          </div>
        </section>

        <section className="relative py-10 sm:py-16">
          <div className="section-padding container-max">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              How Industry Fit Actually Gets Built
            </h2>
            <div className="mt-6 max-w-3xl space-y-4">
              <p className="text-sm leading-relaxed text-white/60 sm:text-base">
                The grid above isn&apos;t a menu of pre-built industry products — it&apos;s a
                starting map of the qualifying questions, channels and integrations that come up
                most often in each sector. A discovery call is where we replace that map with your
                actual process: how enquiries currently arrive, what a qualified lead looks like
                for your business, and which tools (CRM, calendar, WhatsApp, booking system) the
                agent needs to read from and write to.
              </p>
              <p className="text-sm leading-relaxed text-white/60 sm:text-base">
                What changes between industries is rarely the underlying architecture — it&apos;s
                the qualifying criteria and the integrations. A real estate agent needs a portal
                and WhatsApp connected with budget/area/timeline questions; a home services
                business needs a missed-call trigger and a rate card; a clinic needs scheduling and
                reminder logic instead of lead scoring. Same system, configured around how your
                business actually operates.
              </p>
            </div>
          </div>
        </section>

        {industriesFaqs.length > 0 && (
          <section className="relative py-16 sm:py-24">
            <div className="section-padding container-max">
              <h2 className="text-center font-display text-2xl font-bold text-white sm:text-3xl">
                Industries FAQs
              </h2>
              <div className="mx-auto mt-10 max-w-3xl divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.02]">
                {industriesFaqs.map((faq) => (
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
