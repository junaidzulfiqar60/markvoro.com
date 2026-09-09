"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden pt-40 pb-20 sm:pt-44 sm:pb-24">
      <div className="absolute inset-0 -z-10 bg-base-black" />
      <div className="pointer-events-none absolute inset-0 -z-10 hud-grid" />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-brand-purple/20 blur-[140px]" />

      <div className="section-padding container-max relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="badge-pill mx-auto"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
          <span className="font-mono text-[11px] uppercase tracking-widest">{eyebrow}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mt-6 max-w-4xl text-balance font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
