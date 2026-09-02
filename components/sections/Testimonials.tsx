"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const active = testimonials[index];

  return (
    <section className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-fade opacity-50" />
      <div className="section-padding container-max">
        <SectionHeading
          eyebrow="Testimonials"
          title="WHAT BUSINESSES SAY"
          description="Sample testimonials shown as placeholder content until real client testimonials are added."
        />

        <div className="relative mx-auto mt-14 max-w-3xl">
          <div className="gradient-border">
            <div className="gradient-border-inner relative overflow-hidden p-10 sm:p-14">
              <Quote className="h-10 w-10 text-brand-purple/40" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <p className="mt-6 text-lg leading-relaxed text-white/80 sm:text-xl">
                    &ldquo;{active.quote}&rdquo;
                  </p>

                  <div className="mt-8 flex items-center justify-between">
                    <div>
                      <p className="font-display font-semibold text-white">{active.name}</p>
                      <p className="text-sm text-white/45">{active.business} · Sample Testimonial</p>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: active.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-brand-yellow text-brand-yellow" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-white/25 hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.name + i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-6 bg-brand-gradient" : "w-1.5 bg-white/20"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-white/25 hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
