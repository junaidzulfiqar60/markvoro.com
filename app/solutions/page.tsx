import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import Services from "@/components/sections/Services";
import FinalCTA from "@/components/sections/FinalCTA";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { getServices } from "@/lib/content";
import { servicePages } from "@/lib/servicePages";

export const metadata: Metadata = {
  title: "Digital Marketing & AI Automation Solutions",
  description:
    "Digital marketing, web development and AI automation from MARKVORO — SEO, social media, paid ads, websites and custom AI agents, built as one system.",
  alternates: { canonical: "/solutions" },
};

export const revalidate = 60;

const solutionsFaqs = [
  {
    question: "Do we have to buy every solution, or can we start with one?",
    answer:
      "Start with whichever service or AI agent solves your most pressing bottleneck right now — most clients begin with one focused engagement (see our Starter tier on pricing) and expand once it's proving out. Nothing here requires buying the full system upfront.",
  },
  {
    question: "How do the different solutions actually work together?",
    answer:
      "Marketing, web and AI automation share the same brand context and business information — so when your site or offer changes, the AI agents answering leads and the campaigns driving traffic stay in sync automatically, instead of someone having to manually update three separate vendors.",
  },
  {
    question: "Can MARKVORO manage solutions we already have in place, like an existing website or ad account?",
    answer:
      "Yes — we regularly take over and improve existing websites, ad accounts and social profiles rather than requiring you to start from scratch. We'll audit what's currently in place before recommending what to change.",
  },
];

export default async function SolutionsPage() {
  const services = await getServices();

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Solutions"
          title={
            <>
              Every solution your business
              <br />
              <span className="text-gradient">needs to grow.</span>
            </>
          }
          description="Marketing, creative, technology and AI — deployed as one connected system, not ten disconnected vendors."
        />
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Solutions", href: "/solutions" }]} />

        <section className="relative py-10 sm:py-16">
          <div className="section-padding container-max">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Why One Connected System, Not Ten Vendors
            </h2>
            <div className="mt-6 max-w-3xl space-y-4">
              <p className="text-sm leading-relaxed text-white/60 sm:text-base">
                Most businesses end up stitching together a marketing agency, a web
                developer, a freelance ad manager and, increasingly, a separate AI or
                automation vendor — four different relationships, four different
                invoices, and nobody who can see the whole picture at once. When the
                website changes, the SEO agency doesn&apos;t know. When a campaign
                launches, the AI agent answering leads isn&apos;t trained on the new
                offer.
              </p>
              <p className="text-sm leading-relaxed text-white/60 sm:text-base">
                MARKVORO runs all of it as one system instead — marketing, web
                development and AI automation built by the same team, working from
                the same brand and business context. A new landing page, the SEO
                strategy behind it, the ads driving traffic to it and the AI agent
                qualifying the leads it generates are coordinated from the start, not
                bolted together after the fact.
              </p>
            </div>
          </div>
        </section>

        <Services services={services} />

        <section className="relative py-10 sm:py-16">
          <div className="section-padding container-max">
            <h2 className="text-center font-display text-2xl font-bold text-white sm:text-3xl">
              Explore Our Specialized Services
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {servicePages.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 text-sm font-medium text-white/70 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
                >
                  {service.name}
                  <ArrowRight className="h-4 w-4 flex-none transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-16 sm:py-24">
          <div className="section-padding container-max">
            <h2 className="text-center font-display text-2xl font-bold text-white sm:text-3xl">
              Solutions FAQs
            </h2>
            <div className="mx-auto mt-10 max-w-3xl divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.02]">
              {solutionsFaqs.map((faq) => (
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
