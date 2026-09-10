import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import Process from "@/components/sections/Process";
import FinalCTA from "@/components/sections/FinalCTA";
import Reveal from "@/components/ui/Reveal";
import JsonLd from "@/components/seo/JsonLd";
import { faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { resolveIcon } from "@/lib/iconMap";
import { getServicePage, type ServicePageContent } from "@/lib/servicePages";

export default function ServicePageTemplate({ data }: { data: ServicePageContent }) {
  const Icon = resolveIcon(data.icon);
  const related = data.relatedSlugs
    .map((slug) => getServicePage(slug))
    .filter((s): s is ServicePageContent => Boolean(s));

  return (
    <>
      <Navbar />
      <main>
        <PageHero eyebrow={data.eyebrow} title={data.h1} description={data.intro} />

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Solutions", href: "/solutions" },
            { label: data.name, href: `/services/${data.slug}` },
          ]}
        />

        <section className="relative py-10 sm:py-16">
          <div className="section-padding container-max">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-brand-gradient bg-300% shadow-glow">
                <Icon className="h-5 w-5 text-white" strokeWidth={1.7} />
              </div>
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                What&apos;s Included
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.includes.map((item, i) => (
                <Reveal key={item.title} delay={(i % 3) * 0.08}>
                  <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-white/20">
                    <Check className="h-5 w-5 text-brand-green" />
                    <h3 className="mt-4 font-display text-base font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">{item.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Process />

        {data.faqs.length > 0 && (
          <section className="relative py-16 sm:py-24">
            <div className="section-padding container-max">
              <h2 className="text-center font-display text-2xl font-bold text-white sm:text-3xl">
                {data.name} FAQs
              </h2>
              <div className="mx-auto mt-10 max-w-3xl divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.02]">
                {data.faqs.map((faq) => (
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

        {related.length > 0 && (
          <section className="relative py-10 sm:py-16">
            <div className="section-padding container-max">
              <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
                Related Services
              </h2>
              <div className="mt-6 flex flex-wrap gap-4">
                {related.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-white/70 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                  >
                    {service.name}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <FinalCTA />
      </main>
      <Footer />

      <JsonLd
        data={serviceJsonLd({ name: data.name, description: data.metaDescription, slug: data.slug })}
      />
      {data.faqs.length > 0 && <JsonLd data={faqJsonLd(data.faqs)} />}
    </>
  );
}
