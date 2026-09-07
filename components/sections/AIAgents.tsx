"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, MessageCircle } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import AgentCard from "@/components/ui/AgentCard";
import AIAgentInquiryModal from "@/components/forms/AIAgentInquiryModal";
import { aiAgents, contactInfo } from "@/lib/data";
import { buildWhatsAppUrl } from "@/lib/utils";

const nodes = [
  { x: 10, y: 20 }, { x: 30, y: 8 }, { x: 55, y: 18 }, { x: 78, y: 10 }, { x: 92, y: 28 },
  { x: 18, y: 55 }, { x: 42, y: 45 }, { x: 65, y: 55 }, { x: 85, y: 62 },
  { x: 8, y: 85 }, { x: 34, y: 90 }, { x: 60, y: 82 }, { x: 88, y: 92 },
];

const edges: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [1, 6], [6, 7], [7, 8], [5, 6], [6, 9], [7, 11], [9, 10], [10, 11], [11, 12], [2, 7],
];

// aiAgents card names -> the AI Agent Inquiry form's exact option labels
const AGENT_NAME_TO_FORM_OPTION: Record<string, string> = {
  "AI Business Automation Agent": "Business Automation",
};

export default function AIAgents() {
  const [modalOpen, setModalOpen] = useState(false);
  const [prefillAgentType, setPrefillAgentType] = useState<string | undefined>(undefined);

  const openModal = (agentType?: string) => {
    setPrefillAgentType(agentType);
    setModalOpen(true);
  };

  return (
    <section id="ai-agents" className="relative overflow-hidden py-24 sm:py-32">
      {/* Neural network background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-base-black via-[#0a0a20] to-base-black" />
      <svg
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-30"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="url(#neuralGrad)"
            strokeWidth="0.15"
            initial={{ opacity: 0.15 }}
            animate={{ opacity: [0.15, 0.5, 0.15] }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
          />
        ))}
        {nodes.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.x}
            cy={n.y}
            r="0.6"
            fill="#22d3ee"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
          />
        ))}
        <defs>
          <linearGradient id="neuralGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>
      </svg>
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-brand-purple/15 blur-[140px]" />

      <div className="section-padding container-max relative">
        <SectionHeading
          eyebrow="AI Agents &amp; Automation"
          title={
            <>
              WE DON&apos;T JUST MARKET BUSINESSES.
              <br />
              <span className="text-gradient">WE AUTOMATE THEM.</span>
            </>
          }
          description="We build intelligent AI agents that work around the clock to help businesses capture leads, answer customers, automate repetitive tasks and grow more efficiently."
        />

        <div className="mt-10 flex justify-center">
          <div className="glass flex items-center gap-4 px-6 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gradient">
              <Cpu className="h-5 w-5 text-white" />
            </div>
            <p className="max-w-md text-sm text-white/60">
              Every MARKVORO AI agent is custom-built and trained around your
              business — your services, your tone and your customers.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button type="button" onClick={() => openModal()} className="btn-green">
            Build Your AI Agent
            <ArrowRight className="h-4 w-4" />
          </button>
          <a
            href={buildWhatsAppUrl(
              contactInfo.whatsapp,
              "Hi MARKVORO! I'm interested in building a custom AI agent for my business."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <MessageCircle className="h-4 w-4" />
            Chat on WhatsApp
          </a>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {aiAgents.map((agent, i) => (
            <AgentCard
              key={agent.name}
              agent={agent}
              index={i}
              onRequest={() => openModal(AGENT_NAME_TO_FORM_OPTION[agent.name] ?? agent.name)}
            />
          ))}
        </div>
      </div>

      <AIAgentInquiryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialAgentType={prefillAgentType}
      />
    </section>
  );
}
