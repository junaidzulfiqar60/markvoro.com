import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Process from "@/components/sections/Process";
import Stats from "@/components/sections/Stats";
import FinalCTA from "@/components/sections/FinalCTA";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

export const metadata: Metadata = {
  title: "About Us — Our Story and How We Got Here",
  description:
    "MARKVORO is a digital marketing, web development and AI automation agency in Pakistan built around strategy, creativity and intelligent technology.",
  alternates: { canonical: "/about" },
};

const aboutFaqs = [
  {
    question: "Do you only work with businesses in Pakistan?",
    answer:
      "Pakistan is our primary market and where most of our client work is based, but we also take on international engagements. Keyword research, content and campaign strategy are built around Pakistan-specific search intent first — that's the default, not a limitation on who we'll work with.",
  },
  {
    question: "What makes MARKVORO different from a typical marketing agency?",
    answer:
      "Most agencies stop at marketing and hand you off to a separate web developer and, increasingly, a separate AI vendor. We run marketing, web development and AI automation as one team working from the same brand and business context, so a new campaign, the page it links to and the AI agent qualifying the leads it generates are coordinated from the start.",
  },
  {
    question: "How do you decide which services a business actually needs?",
    answer:
      "We start with a discovery call, not a fixed package — understanding your business, customers, competitors and goals before recommending anything. Some businesses need one focused service or AI agent; others need marketing, web and automation running together. The strategy comes first, and the service mix follows from it.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="About MARKVORO"
          title={
            <>
              A growth partner built for the
              <br />
              <span className="text-gradient">age of AI agents.</span>
            </>
          }
          description="MARKVORO combines digital marketing, high-performance websites and custom AI agents into one connected growth system — not three separate vendors."
        />
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }]} />

        <section className="relative py-10 sm:py-16">
          <div className="section-padding container-max">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              How We Work
            </h2>
            <div className="mt-6 max-w-3xl space-y-4">
              <p className="text-sm leading-relaxed text-white/60 sm:text-base">
                MARKVORO exists because most growing businesses end up with the same problem: a
                marketing agency, a web developer and, increasingly, a separate AI or automation
                vendor — three relationships that don&apos;t talk to each other. We run all three
                as one team instead, so the strategy behind a campaign, the site it sends traffic
                to and the AI agent qualifying the leads it produces are built from the same
                understanding of your business, not stitched together after the fact.
              </p>
              <p className="text-sm leading-relaxed text-white/60 sm:text-base">
                Every engagement starts the same way — a discovery call to understand your
                business, customers, competitors and goals before we recommend anything. From
                there, strategy comes first, creative execution and modern technology (including
                AI agents and automation, where they genuinely help) come next, and everything is
                measured and adjusted against real performance data rather than left to run
                untouched.
              </p>
            </div>
          </div>
        </section>

        <WhyChooseUs />
        <Process />
        <Stats />

        {aboutFaqs.length > 0 && (
          <section className="relative py-16 sm:py-24">
            <div className="section-padding container-max">
              <h2 className="text-center font-display text-2xl font-bold text-white sm:text-3xl">
                About MARKVORO FAQs
              </h2>
              <div className="mx-auto mt-10 max-w-3xl divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.02]">
                {aboutFaqs.map((faq) => (
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
