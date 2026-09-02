"use client";

import { Rocket, Code2, Bot, LineChart } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const pillars = [
  { icon: Rocket, label: "Digital Marketing", color: "text-brand-orange" },
  { icon: Code2, label: "Web Development", color: "text-brand-cyan" },
  { icon: Bot, label: "AI Automation", color: "text-brand-purple" },
  { icon: LineChart, label: "Business Growth", color: "text-brand-green" },
];

export default function TrustStrip() {
  return (
    <section className="relative border-y border-white/5 bg-base-navy/60 py-14">
      <div className="section-padding container-max">
        <Reveal>
          <p className="text-center font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
            <span className="text-gradient">Strategy.</span>{" "}
            <span className="text-gradient">Creativity.</span>{" "}
            <span className="text-gradient">Technology.</span>{" "}
            <span className="text-gradient">Growth.</span>
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.08}>
              <div className="group flex flex-col items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-6 text-center transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-transform duration-300 group-hover:scale-110">
                  <p.icon className={`h-5 w-5 ${p.color}`} />
                </div>
                <span className="text-xs font-medium uppercase tracking-wide text-white/60 sm:text-sm">
                  {p.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
