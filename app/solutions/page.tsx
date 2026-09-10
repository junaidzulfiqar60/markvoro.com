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
  title: "Digital Marketing & AI Automation Solutions in Pakistan",
  description:
    "Digital marketing, web development and AI automation solutions from MARKVORO — SEO, social media, paid ads, websites and custom AI agents, built as one connected system.",
  alternates: { canonical: "/solutions" },
};

export const revalidate = 60;

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

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
