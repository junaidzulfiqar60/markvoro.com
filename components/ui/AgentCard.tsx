"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { AIAgent } from "@/lib/data";

export default function AgentCard({
  agent,
  index,
  onRequest,
}: {
  agent: AIAgent;
  index: number;
  onRequest?: () => void;
}) {
  const Icon = agent.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="gradient-border group h-full"
    >
      <div className="gradient-border-inner relative flex h-full flex-col overflow-hidden p-7 transition-all duration-500 group-hover:-translate-y-1.5">
        <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-brand-gradient opacity-0 blur-[70px] transition-opacity duration-500 group-hover:opacity-25" />

        <div className="relative flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient bg-300% shadow-glow transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
            <Icon className="h-6 w-6 text-white" strokeWidth={1.6} />
          </div>
          <div className="flex items-center gap-2">
            <span className="status-pill-live">
              <span className="h-1 w-1 rounded-full bg-brand-green" />
              Online
            </span>
            <ArrowUpRight className="h-5 w-5 text-white/20 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white/60" />
          </div>
        </div>

        <p className="eyebrow-mono relative mt-6 text-brand-cyan/50">
          Agent · {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="relative mt-1.5 font-display text-lg font-semibold text-white">
          {agent.name}
        </h3>
        <p className="relative mt-3 text-sm leading-relaxed text-white/55">
          {agent.description}
        </p>

        {agent.features && (
          <ul className="relative mt-5 space-y-2 border-t border-white/10 pt-5">
            {agent.features.slice(0, 4).map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-white/50">
                <span className="h-1 w-1 rounded-full bg-brand-cyan" />
                {f}
              </li>
            ))}
          </ul>
        )}

        {onRequest && (
          <button
            type="button"
            onClick={onRequest}
            className="relative mt-5 text-left text-xs font-semibold text-brand-cyan transition-colors hover:text-white"
          >
            Request this agent →
          </button>
        )}
      </div>
    </motion.div>
  );
}
