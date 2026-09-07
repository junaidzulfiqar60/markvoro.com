"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { contactInfo } from "@/lib/data";
import { buildWhatsAppUrl } from "@/lib/utils";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-base-black" />
      <motion.div
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute inset-0 -z-10 bg-brand-gradient bg-300% opacity-20"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-base-black/60" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-purple/25 blur-[160px]" />

      <div className="section-padding container-max relative text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl"
        >
          READY TO <span className="text-gradient">GROW BEYOND LIMITS?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
        >
          Let&apos;s combine strategy, creativity, technology and AI to build
          the next stage of your business.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a href="#contact" className="btn-primary">
            Start Your Growth Journey
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={buildWhatsAppUrl(contactInfo.whatsapp, "Hello MARKVORO, I am interested in your digital services.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <MessageCircle className="h-4 w-4" />
            Chat With Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
