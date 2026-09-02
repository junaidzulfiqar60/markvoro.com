"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";
import GlowBackground from "@/components/ui/GlowBackground";
import { services } from "@/lib/data";

export default function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <GlowBackground />
      <div className="section-padding container-max relative">
        <SectionHeading
          eyebrow="Digital Marketing Services"
          title="DIGITAL SOLUTIONS THAT MOVE YOUR BUSINESS FORWARD."
          description="From strategy and creative content to advertising and technology, MARKVORO provides everything your business needs to build a stronger digital presence and generate real growth."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.name} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
