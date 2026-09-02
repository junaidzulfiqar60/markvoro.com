import Image from "next/image";
import { Instagram, Facebook, Linkedin, Youtube, Mail, Phone } from "lucide-react";
import { navLinks, footerServices, footerAISolutions, contactInfo } from "@/lib/data";

function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16.5 2h-3v13.5a3 3 0 1 1-3-3c.17 0 .34.01.5.04V9.4a6 6 0 1 0 5.5 5.98V8.79a8.16 8.16 0 0 0 4.5 1.35V7.14a5.15 5.15 0 0 1-4.5-5.06V2Z" />
    </svg>
  );
}

const socials = [
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/markvoro610?igsh=MXB6dXh4b3d0aGt5OA==" },
  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/share/1EXm8bCUVd/" },
  { icon: TiktokIcon, label: "TikTok", href: "https://tiktok.com/@markvoro.digital" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-base-black">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-brand-gradient" />
      <div className="pointer-events-none absolute -bottom-32 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-brand-purple/10 blur-[120px]" />

      <div className="section-padding container-max relative py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="relative h-16 w-64 overflow-hidden">
              <Image
                src="/logo.jpeg"
                alt="MARKVORO logo"
                fill
                className="object-cover object-center brightness-110 contrast-[1.1] saturate-150"
              />
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/50">
              A modern digital marketing and AI automation agency helping
              ambitious businesses grow through strategy, creativity and
              technology.
            </p>
            <p className="mt-4 text-sm font-semibold text-gradient">
              MARKVORO — Grow Beyond Limits.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href === "#" ? undefined : "_blank"}
                  rel={s.href === "#" ? undefined : "noopener noreferrer"}
                  aria-label={s.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all duration-300 hover:border-white/20 hover:text-white"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h4>
            <ul className="mt-5 space-y-3">
              {footerServices.map((item) => (
                <li key={item}>
                  <a
                    href="#services"
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              AI Solutions
            </h4>
            <ul className="mt-5 space-y-3">
              {footerAISolutions.map((item) => (
                <li key={item}>
                  <a
                    href="#ai-agents"
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="mt-5 space-y-3">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-2">
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 text-brand-cyan" />
                {contactInfo.email}
              </a>
              <a
                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 text-brand-green" />
                {contactInfo.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            © 2026 MARKVORO. All Rights Reserved.
          </p>
          <p className="text-xs text-white/40">
            Designed &amp; built with strategy, creativity and AI.
          </p>
        </div>
      </div>
    </footer>
  );
}
