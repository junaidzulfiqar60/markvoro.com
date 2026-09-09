import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import { stats } from "@/lib/data";

export default function Stats() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-brand-gradient-soft opacity-40" />
      <div className="section-padding container-max">
        <div className="hud-corners glass-panel grid grid-cols-2 gap-10 p-10 sm:p-14 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1} className="text-center">
              <Counter value={stat.value} />
              <p className="eyebrow-mono mt-3 text-white/50">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
