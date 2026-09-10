import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import FinalCTA from "@/components/sections/FinalCTA";
import Reveal from "@/components/ui/Reveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { industries } from "@/lib/data";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "MARKVORO builds marketing and AI automation systems for real estate, e-commerce, restaurants, home services, healthcare, education and more businesses across Pakistan.",
  alternates: { canonical: "/industries" },
};

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

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
