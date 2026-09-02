"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { faqs } from "@/lib/data";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="section-padding container-max">
        <SectionHeading
          eyebrow="FAQ"
          title="FREQUENTLY ASKED QUESTIONS"
          description="Everything you need to know about working with MARKVORO."
        />

        <div className="mx-auto mt-14 max-w-3xl divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.02]">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left sm:px-8"
                >
                  <span className="font-display text-sm font-semibold text-white sm:text-base">
                    {faq.question}
                  </span>
                  <span
                    className={`flex h-8 w-8 flex-none items-center justify-center rounded-full border border-white/10 bg-white/5 transition-transform duration-300 ${
                      isOpen ? "rotate-45 bg-brand-gradient" : ""
                    }`}
                  >
                    <Plus className="h-4 w-4 text-white" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-white/55 sm:px-8">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
