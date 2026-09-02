"use client";

import { motion } from "framer-motion";
import { Search, Compass, Hammer, LineChart } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/data";

const icons = [Search, Compass, Hammer, LineChart];

export default function Process() {
  return (
    <section id="process" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-fade opacity-60" />
      <div className="section-padding container-max">
        <SectionHeading eyebrow="Our Process" title="SIMPLE PROCESS. SERIOUS GROWTH." />

        <div className="relative mt-20">
          {/* Connecting line - desktop */}
          <div className="absolute left-0 right-0 top-8 hidden h-px lg:block">
            <div className="h-full w-full bg-white/10" />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
              style={{ transformOrigin: "left" }}
              className="absolute inset-0 h-px bg-brand-gradient bg-300% animate-gradient-x"
            />
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {processSteps.map((step, i) => {
              const Icon = icons[i];
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative flex flex-col items-center text-center lg:items-start lg:text-left"
                >
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gradient bg-300% shadow-glow">
                    <Icon className="h-7 w-7 text-white" strokeWidth={1.6} />
                  </div>
                  <span className="mt-5 font-display text-xs font-semibold tracking-widest text-white/40">
                    STEP {step.number}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/55">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
