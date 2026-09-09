import type { Metadata } from "next";
import { Check, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import FAQ from "@/components/sections/FAQ";
import { pricingTiers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Pricing — MARKVORO",
  description:
    "MARKVORO pricing tiers — scoped after a discovery call, because the right number depends on your services and integrations, not a fixed price list.",
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Pricing"
          title={
            <>
              Scoped properly,
              <br />
              <span className="text-gradient">priced honestly.</span>
            </>
          }
          description="Every engagement is quoted after a short discovery call, because the right number depends on your services, channels and integrations — not a fixed price list."
        />

        <section className="relative py-10 sm:py-16">
          <div className="section-padding container-max">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {pricingTiers.map((tier, i) => (
                <Reveal key={tier.name} delay={i * 0.1}>
                  <div
                    className={`relative flex h-full flex-col rounded-2xl border p-8 ${
                      tier.highlighted
                        ? "border-brand-cyan/40 bg-white/[0.04] shadow-glow-cyan"
                        : "border-white/10 bg-white/[0.02]"
                    }`}
                  >
                    {tier.highlighted && (
                      <span className="status-pill-live absolute -top-3 left-8">Most Popular</span>
                    )}
                    <h3 className="font-display text-xl font-bold text-white">{tier.name}</h3>
                    <p className="mt-1.5 text-sm text-white/50">{tier.tagline}</p>
                    <p className="eyebrow-mono mt-6 text-white/35">Starting From</p>
                    <p className="mt-1 font-mono text-lg font-semibold text-white/85">
                      Quoted after discovery
                    </p>
                    <p className="mt-5 text-sm leading-relaxed text-white/55">{tier.description}</p>

                    <ul className="mt-6 flex-1 space-y-3 border-t border-white/10 pt-6">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-white/70">
                          <Check className="mt-0.5 h-4 w-4 flex-none text-brand-cyan" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <a
                      href="/contact"
                      className={tier.highlighted ? "btn-primary mt-8 w-full text-sm" : "btn-secondary mt-8 w-full text-sm"}
                    >
                      Get a Custom Quote
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>

            <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-white/35">
              Placeholder pricing structure — &ldquo;Starting From&rdquo; figures are provided
              during discovery once scope, channels and integrations are known.
            </p>
          </div>
        </section>

        <FAQ />
      </main>
      <Footer />
    </>
  );
}
