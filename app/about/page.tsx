import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Process from "@/components/sections/Process";
import Stats from "@/components/sections/Stats";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "About — MARKVORO",
  description:
    "MARKVORO is a digital marketing, web development and AI automation agency built around strategy, creativity and intelligent technology.",
};

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
        <WhyChooseUs />
        <Process />
        <Stats />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
