"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Bot, Target, Database, Send, CalendarCheck, Check } from "lucide-react";

const STEPS = [
  { icon: User, label: "Visitor", detail: "New visitor on markvoro.com" },
  { icon: Bot, label: "AI Agent", detail: "Reading intent — website services" },
  { icon: Target, label: "Qualification", detail: "Scored 91 · strong fit" },
  { icon: Database, label: "Lead Captured", detail: "Contact saved to dashboard" },
  { icon: Send, label: "Follow-Up", detail: "3-step sequence queued" },
  { icon: CalendarCheck, label: "Booking", detail: "Discovery call confirmed" },
];

const STEP_MS = 1600;

export default function AgentRuntimePanel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % (STEPS.length + 1));
    }, STEP_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hud-corners glass-panel relative w-full max-w-md overflow-hidden p-5 shadow-card sm:p-6">
      <div className="hud-scanline" />

      {/* Header */}
      <div className="relative flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-green" />
          </span>
          <span className="eyebrow-mono text-white/70">Agent Runtime</span>
        </div>
        <span className="status-pill-live">Live Demo</span>
      </div>

      {/* Steps */}
      <div className="relative mt-4 space-y-1">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          const state = i < active ? "done" : i === active ? "running" : "queued";
          return (
            <div
              key={step.label}
              className="flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors duration-300"
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-all duration-300 ${
                  state === "running"
                    ? "border-brand-green/40 bg-brand-green/10 text-brand-green shadow-glow-green"
                    : state === "done"
                      ? "border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan"
                      : "border-white/10 bg-white/[0.03] text-white/30"
                }`}
              >
                {state === "done" ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className={`truncate text-sm font-medium transition-colors duration-300 ${
                    state === "queued" ? "text-white/35" : "text-white"
                  }`}
                >
                  {step.label}
                </p>
                <AnimatePresence mode="wait">
                  {state !== "queued" && (
                    <motion.p
                      key={state}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="truncate font-mono text-[11px] text-white/40"
                    >
                      {step.detail}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <span
                className={
                  state === "running"
                    ? "status-pill-live"
                    : state === "done"
                      ? "status-pill-done"
                      : "status-pill-queued"
                }
              >
                {state === "running" ? "Running" : state === "done" ? "Done" : "Queued"}
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer telemetry */}
      <div className="relative mt-5 grid grid-cols-3 gap-3 border-t border-white/10 pt-4">
        {[
          { label: "Response", value: "< 3s" },
          { label: "Channels", value: "4 live" },
          { label: "Handoff", value: "Enabled" },
        ].map((stat) => (
          <div key={stat.label}>
            <p className="eyebrow-mono text-white/35">{stat.label}</p>
            <p className="mt-1 font-mono text-sm font-medium text-white/85">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
