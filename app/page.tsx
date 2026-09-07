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
import { prisma } from "@/lib/prisma";
import { PORTFOLIO_CATEGORY_FROM_ENUM } from "@/lib/validations";
import {
  services as staticServices,
  webProjects as staticWebProjects,
  testimonials as staticTestimonials,
  type Service,
  type WebProject,
  type Testimonial,
} from "@/lib/data";

// Revalidate every 60s so admin-managed content shows up without a full
// rebuild, without hitting the DB on every single request.
export const revalidate = 60;

const PROJECT_GRADIENTS = [
  "from-brand-orange via-brand-pink to-brand-purple",
  "from-brand-pink via-brand-purple to-brand-blue",
  "from-brand-blue via-brand-cyan to-brand-green",
  "from-brand-green via-brand-cyan to-brand-purple",
];

async function getServices(): Promise<Service[]> {
  try {
    const rows = await prisma.service.findMany({ where: { active: true }, orderBy: { order: "asc" } });
    if (rows.length === 0) return staticServices;
    return rows.map((row, i) => ({
      number: String(row.order || i + 1).padStart(2, "0"),
      icon: row.icon,
      name: row.title,
      description: row.shortDescription,
      features: row.features,
    }));
  } catch (err) {
    console.error("[page] failed to load services from DB, using static fallback", err);
    return staticServices;
  }
}

async function getPortfolioProjects(): Promise<WebProject[]> {
  try {
    const rows = await prisma.portfolioProject.findMany({
      where: { published: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    if (rows.length === 0) return staticWebProjects;
    return rows.map((row, i) => ({
      category: PORTFOLIO_CATEGORY_FROM_ENUM[row.category] ?? row.category,
      title: row.title,
      tags: row.technologies.slice(0, 3),
      gradient: PROJECT_GRADIENTS[i % PROJECT_GRADIENTS.length],
    }));
  } catch (err) {
    console.error("[page] failed to load portfolio from DB, using static fallback", err);
    return staticWebProjects;
  }
}

async function getTestimonials(): Promise<{ items: Testimonial[]; isPlaceholder: boolean }> {
  try {
    const rows = await prisma.testimonial.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } });
    if (rows.length === 0) return { items: staticTestimonials, isPlaceholder: true };
    return {
      items: rows.map((row) => ({
        quote: row.testimonial,
        name: row.clientName,
        business: row.clientCompany,
        rating: row.rating,
      })),
      isPlaceholder: false,
    };
  } catch (err) {
    console.error("[page] failed to load testimonials from DB, using static fallback", err);
    return { items: staticTestimonials, isPlaceholder: true };
  }
}

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
