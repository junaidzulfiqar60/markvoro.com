"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Bot,
  Briefcase,
  FolderKanban,
  Star,
  Package,
  Mail,
  Newspaper,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import type { SessionPayload } from "@/lib/auth";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/ai-inquiries", label: "AI Inquiries", icon: Bot },
  { href: "/admin/service-inquiries", label: "Service Inquiries", icon: Briefcase },
  { href: "/admin/portfolio", label: "Portfolio", icon: FolderKanban },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/services", label: "Services", icon: Package },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
];

export default function AdminShell({ user, children }: { user: SessionPayload; children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const NavLinks = () => (
    <nav className="flex-1 space-y-1 px-3">
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              active
                ? "bg-brand-gradient text-white shadow-glow"
                : "text-white/60 hover:bg-white/5 hover:text-white"
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-base-black">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-white/10 bg-base-panel/60 py-6 lg:flex">
        <div className="mb-8 flex items-center gap-2 px-5">
          <div className="relative h-9 w-36 overflow-hidden">
            <Image
              src="/logo.jpeg"
              alt="MARKVORO"
              fill
              className="object-cover object-center brightness-110 contrast-[1.1] saturate-150"
            />
          </div>
        </div>
        <NavLinks />
        <div className="mt-6 border-t border-white/10 px-3 pt-4">
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-brand-pink"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-white/10 bg-base-panel/60 px-5 lg:px-8">
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white lg:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-3 text-sm">
            <div className="text-right">
              <p className="font-medium text-white">{user.name}</p>
              <p className="text-xs text-white/40">{user.role.replace(/_/g, " ")}</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient text-sm font-semibold text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {mobileOpen && (
          <div className="border-b border-white/10 bg-base-panel/95 py-4 lg:hidden">
            <NavLinks />
            <div className="mt-4 space-y-1 border-t border-white/10 px-3 pt-4">
              <Link
                href="/admin/settings"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        )}

        <main className="flex-1 p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
