import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import Services from "@/components/sections/Services";
import FinalCTA from "@/components/sections/FinalCTA";
import { getServices } from "@/lib/content";

export const metadata: Metadata = {
  title: "Solutions — MARKVORO",
  description:
    "Digital marketing, web development and AI automation solutions from MARKVORO — strategy-first, built around your business.",
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
        <Services services={services} />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
