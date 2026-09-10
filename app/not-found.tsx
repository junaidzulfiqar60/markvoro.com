import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { navLinks } from "@/lib/data";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative flex min-h-[80vh] items-center overflow-hidden pt-28">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-base-black" />
          <div className="pointer-events-none absolute inset-0 -z-10 hud-grid" />
          <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-brand-purple/20 blur-[140px]" />

          <div className="section-padding container-max relative py-20 text-center">
            <span className="badge-pill mx-auto">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-pink" />
              <span className="font-mono text-[11px] uppercase tracking-widest">Error 404</span>
            </span>

            <h1 className="mx-auto mt-6 max-w-2xl text-balance font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
              This page <span className="text-gradient">grew beyond the map.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
              The page you&apos;re looking for doesn&apos;t exist or has moved. Head back to the
              homepage, or jump straight to one of our main pages below.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/" className="btn-primary">
                <Home className="h-4 w-4" />
                Back to Homepage
              </Link>
              <Link href="/contact" className="btn-secondary">
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <ul className="mx-auto mt-14 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {navLinks
                .filter((l) => l.href !== "/")
                .map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
