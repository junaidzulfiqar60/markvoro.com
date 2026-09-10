import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import Services from "@/components/sections/Services";
import AIAgents from "@/components/sections/AIAgents";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Process from "@/components/sections/Process";
import WebShowcase from "@/components/sections/WebShowcase";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Contact from "@/components/sections/Contact";
import { getServices, getPortfolioProjects, getTestimonials } from "@/lib/content";

export const metadata: Metadata = {
  title: "Digital Marketing Agency in Pakistan",
  description:
    "MARKVORO is a digital marketing agency in Pakistan offering SEO, social media marketing, Google & Facebook ads, web development and custom AI agent development for ambitious businesses.",
  alternates: { canonical: "/" },
};

// Revalidate every 60s so admin-managed content shows up without a full
// rebuild, without hitting the DB on every single request.
export const revalidate = 60;

export default async function Home() {
  const [services, projects, testimonials] = await Promise.all([
    getServices(),
    getPortfolioProjects(),
    getTestimonials(),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <AIAgents />
        <Services services={services} />
        <WhyChooseUs />
        <Process />
        <WebShowcase projects={projects} />
        <Stats />
        <Testimonials testimonials={testimonials.items} isPlaceholder={testimonials.isPlaceholder} />
        <FAQ />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
