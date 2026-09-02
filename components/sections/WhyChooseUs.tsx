import { Target, Lightbulb, BarChart3, Rocket } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { whyChooseUs } from "@/lib/data";

const icons = [Target, Lightbulb, BarChart3, Rocket];
const colors = ["text-brand-orange", "text-brand-pink", "text-brand-cyan", "text-brand-green"];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative py-24 sm:py-32">
      <div className="section-padding container-max">
        <SectionHeading eyebrow="Why Choose Us" title="WHY GROW WITH MARKVORO?" />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((item, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={item.number} delay={i * 0.1}>
                <div className="group relative h-full rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-white/20">
                  <span className="font-display text-4xl font-bold text-white/10 transition-colors duration-500 group-hover:text-white/15">
                    {item.number}
                  </span>
                  <div className="mt-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                    <Icon className={`h-5 w-5 ${colors[i]}`} strokeWidth={1.7} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
