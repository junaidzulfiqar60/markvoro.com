import Link from "next/link";
import {
  ArrowRight,
  ShoppingCart,
  UtensilsCrossed,
  Briefcase,
  UserRound,
  Code2,
  Megaphone,
  Palette,
  Zap,
  Bot,
  MessageCircle,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import type { WebProject } from "@/lib/data";
import { contactInfo } from "@/lib/data";
import { buildWhatsAppUrl } from "@/lib/utils";

const categoryIcons: Record<string, typeof ShoppingCart> = {
  // Static placeholder categories (lib/data.ts fallback)
  "E-Commerce": ShoppingCart,
  Restaurant: UtensilsCrossed,
  "Corporate Business": Briefcase,
  "Personal Brand": UserRound,
  // Real admin-managed PortfolioProject categories
  "Website Development": Code2,
  "Digital Marketing": Megaphone,
  Branding: Palette,
  "AI Automation": Zap,
  "AI Agents": Bot,
};

export default function WebShowcase({ projects }: { projects: WebProject[] }) {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="section-padding container-max">
        <SectionHeading
          eyebrow="Website Development"
          title="WE BUILD WEBSITES THAT WORK AS HARD AS YOU DO."
          description="Modern, fast and conversion-focused websites designed to turn visitors into customers."
        />

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {projects.map((project, i) => {
            const Icon = categoryIcons[project.category] ?? Code2;
            return (
              <Reveal key={project.title} delay={i * 0.1}>
                <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-500 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-glow">
                  {/* Browser chrome */}
                  <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.03] px-4 py-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-brand-pink/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-brand-yellow/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-brand-green/70" />
                    <span className="ml-3 flex-1 truncate rounded-full bg-white/5 px-3 py-1 text-[11px] text-white/30">
                      markvoro.agency/{project.category.toLowerCase().replace(/\s/g, "-")}
                    </span>
                  </div>

                  {/* Preview area */}
                  <div
                    className={`relative flex h-56 items-center justify-center bg-gradient-to-br ${project.gradient} bg-opacity-10 overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-base-black/70" />
                    <div className="absolute inset-0 opacity-20 mix-blend-screen">
                      <div className={`h-full w-full bg-gradient-to-br ${project.gradient}`} />
                    </div>
                    <Icon className="relative h-14 w-14 text-white/70 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.2} />
                  </div>

                  <div className="p-6">
                    <span className="text-xs font-semibold uppercase tracking-widest text-brand-cyan">
                      {project.category}
                    </span>
                    <h3 className="mt-2 font-display text-lg font-semibold text-white">
                      {project.title}
                    </h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-white/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/contact" className="btn-green">
            Start Your Website Project
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={buildWhatsAppUrl(contactInfo.whatsapp, "Hi MARKVORO! I'd like to discuss a new website project.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <MessageCircle className="h-4 w-4" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
