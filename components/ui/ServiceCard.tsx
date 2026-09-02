"use client";

import { motion } from "framer-motion";
import type { Service } from "@/lib/data";

export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="group relative h-full"
    >
      <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.04] hover:shadow-glow">
        {/* Glow on hover */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-gradient opacity-0 blur-[70px] transition-opacity duration-500 group-hover:opacity-30" />

        <div className="relative flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-500 group-hover:border-white/20 group-hover:bg-brand-gradient">
            <Icon className="h-6 w-6 text-white/80 transition-colors duration-500 group-hover:text-white" strokeWidth={1.6} />
          </div>
          <span className="font-display text-2xl font-bold text-white/10 transition-colors duration-500 group-hover:text-white/20">
            {service.number}
          </span>
        </div>

        <h3 className="relative mt-5 font-display text-lg font-semibold text-white">
          {service.name}
        </h3>
        <p className="relative mt-3 text-sm leading-relaxed text-white/55">
          {service.description}
        </p>

        <div className="relative mt-5 flex flex-wrap gap-2">
          {service.features.slice(0, 4).map((f) => (
            <span
              key={f}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-white/50"
            >
              {f}
            </span>
          ))}
          {service.features.length > 4 && (
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-white/40">
              +{service.features.length - 4} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
