import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import Contact from "@/components/sections/Contact";
import FAQ from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: "Contact — MARKVORO",
  description:
    "Tell MARKVORO about your business — get a custom growth strategy across marketing, web and AI agents.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Get In Touch"
          title={
            <>
              Talk to <span className="text-gradient">MARKVORO.</span>
            </>
          }
          description="Tell us about your business and what you want to achieve — we'll reply within 24 hours with next steps."
        />
        <Contact />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
