import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import AgentRuntimePanel from "@/components/ui/AgentRuntimePanel";
import AIAgentsGrid from "@/components/ui/AIAgentsGrid";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "AI Agents — MARKVORO",
  description:
    "Custom AI Sales, Support, Booking, WhatsApp and Receptionist agents from MARKVORO — trained on your business, live on your channels.",
};

export default function AIAgentsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="AI Agents"
          title={
            <>
              Agents that work your
              <br />
              <span className="text-gradient">business, not just your inbox.</span>
            </>
          }
          description="Every MARKVORO agent is custom-built and trained around your business — your services, your tone and your customers. Observable, interruptible and bounded to the tools you grant it."
        />

        <section className="relative py-10 sm:py-16">
          <div className="section-padding container-max flex justify-center">
            <AgentRuntimePanel />
          </div>
        </section>

        <section className="relative py-16 sm:py-24">
          <div className="section-padding container-max">
            <AIAgentsGrid />
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
