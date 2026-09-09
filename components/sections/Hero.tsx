"use client";

import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import AgentRuntimePanel from "@/components/ui/AgentRuntimePanel";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-base-black" />
      <div className="pointer-events-none absolute inset-0 -z-10 hud-grid" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-fade" />
      <div className="pointer-events-none absolute -left-40 top-0 -z-10 h-[32rem] w-[32rem] rounded-full bg-brand-purple/25 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 top-40 -z-10 h-[28rem] w-[28rem] rounded-full bg-brand-cyan/20 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 -z-10 h-96 w-96 rounded-full bg-brand-pink/15 blur-[140px]" />

      <div className="section-padding container-max grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* Left copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="badge-pill"
          >
            <Terminal className="h-3.5 w-3.5 text-brand-green" />
            <span className="font-mono text-[11px] uppercase tracking-widest">
              Marketing · AI Agents · Automation
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            <span className="text-gradient">GROW</span> BEYOND
            <br />
            LIMITS.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
          >
            We combine powerful digital marketing, creative technology,
            intelligent AI agents and high-performance websites to help
            ambitious businesses grow faster.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >
            <a href="#contact" className="btn-green">
              Start Growing
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#services" className="btn-secondary">
              Explore Our Services
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4"
          >
            {["Strategy", "Creativity", "Technology", "Growth"].map((w, i) => (
              <div key={w} className="flex items-center gap-2">
                {i !== 0 && <span className="h-1 w-1 rounded-full bg-white/20" />}
                <span className="text-xs font-medium uppercase tracking-widest text-white/40">
                  {w}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right visual — a live view of MARKVORO's own AI agent runtime */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mx-auto flex w-full max-w-lg justify-center lg:justify-end"
        >
          <AgentRuntimePanel />
        </motion.div>
      </div>
    </section>
  );
}
