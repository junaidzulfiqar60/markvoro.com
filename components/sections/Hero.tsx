"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp, Bot, Zap, Users } from "lucide-react";

const floatingLabels = [
  { icon: Bot, text: "AI Powered", className: "left-[2%] top-[12%]", delay: 0 },
  { icon: TrendingUp, text: "Growth Strategy", className: "right-[0%] top-[8%]", delay: 0.4 },
  { icon: Zap, text: "Smart Automation", className: "left-[0%] bottom-[22%]", delay: 0.8 },
  { icon: Users, text: "More Leads", className: "right-[4%] bottom-[30%]", delay: 1.2 },
  { icon: Sparkles, text: "Digital Growth", className: "right-[14%] top-[42%]", delay: 1.6 },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-base-black" />
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
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
            Digital Marketing &amp; AI Automation Agency
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

        {/* Right visual */}
        <div className="relative mx-auto h-[420px] w-full max-w-lg lg:h-[560px]">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Orbit rings */}
            <div className="absolute h-[85%] w-[85%] animate-spin-slower rounded-full border border-white/10" />
            <div className="absolute h-[62%] w-[62%] animate-spin-slow rounded-full border border-dashed border-white/10" />

            {/* Core glow orb */}
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex h-44 w-44 items-center justify-center rounded-full bg-brand-gradient bg-300% shadow-glow sm:h-52 sm:w-52"
            >
              <div className="absolute inset-2 rounded-full bg-base-black/80 backdrop-blur-xl" />
              <Bot className="relative h-16 w-16 text-white" strokeWidth={1.5} />
            </motion.div>

            {/* Orbiting nodes */}
            {[0, 90, 180, 270].map((deg, i) => (
              <div
                key={deg}
                className="absolute h-[62%] w-[62%] animate-spin-slow"
                style={{ animationDuration: `${18 + i * 3}s` }}
              >
                <div
                  className="absolute h-3 w-3 rounded-full bg-brand-cyan shadow-glow-cyan"
                  style={{
                    top: "0%",
                    left: "50%",
                    transform: `translate(-50%, -50%) rotate(${deg}deg)`,
                  }}
                />
              </div>
            ))}

            {/* Connection lines */}
            <svg
              className="absolute inset-0 h-full w-full opacity-40"
              viewBox="0 0 400 400"
              fill="none"
            >
              <line x1="60" y1="80" x2="200" y2="200" stroke="url(#lineGrad)" strokeWidth="1" />
              <line x1="340" y1="100" x2="200" y2="200" stroke="url(#lineGrad)" strokeWidth="1" />
              <line x1="80" y1="320" x2="200" y2="200" stroke="url(#lineGrad)" strokeWidth="1" />
              <line x1="330" y1="300" x2="200" y2="200" stroke="url(#lineGrad)" strokeWidth="1" />
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Floating labels */}
          {floatingLabels.map((item) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: [0, -14, 0] }}
              transition={{
                opacity: { duration: 0.6, delay: item.delay },
                y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: item.delay },
              }}
              className={`glass absolute z-10 flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-white shadow-card ${item.className}`}
            >
              <item.icon className="h-3.5 w-3.5 text-brand-cyan" />
              {item.text}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
