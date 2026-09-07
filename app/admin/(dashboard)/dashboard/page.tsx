"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, Bot, Briefcase, Mail, FolderKanban, UserPlus } from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import StatusBadge from "@/components/admin/StatusBadge";
import MonthlyChart from "@/components/admin/MonthlyChart";

type DashboardData = {
  counts: {
    totalLeads: number;
    newLeads: number;
    aiInquiries: number;
    serviceInquiries: number;
    newsletterSubscribers: number;
    portfolioProjects: number;
  };
  recentLeads: { id: string; fullName: string; email: string; status: string; createdAt: string }[];
  recentAiInquiries: { id: string; fullName: string; email: string; status: string; createdAt: string }[];
  monthly: { month: string; leads: number; serviceInquiries: number; aiInquiries: number }[];
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((res) => res.json())
      .then((json) => {
        if (json.error) setError(json.error);
        else setData(json);
      })
      .catch(() => setError("Failed to load dashboard."));
  }, []);

  if (error) return <p className="text-sm text-brand-pink">{error}</p>;
  if (!data) return <p className="text-sm text-white/40">Loading dashboard...</p>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Overview</h1>
        <p className="mt-1 text-sm text-white/50">Real-time data from your MARKVORO database.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Total Leads" value={data.counts.totalLeads} icon={Users} />
        <StatCard label="New Leads" value={data.counts.newLeads} icon={UserPlus} />
        <StatCard label="AI Inquiries" value={data.counts.aiInquiries} icon={Bot} />
        <StatCard label="Service Inquiries" value={data.counts.serviceInquiries} icon={Briefcase} />
        <StatCard label="Subscribers" value={data.counts.newsletterSubscribers} icon={Mail} />
        <StatCard label="Portfolio Items" value={data.counts.portfolioProjects} icon={FolderKanban} />
      </div>

      <MonthlyChart data={data.monthly} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="glass p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wide text-white/40">Recent Leads</p>
            <Link href="/admin/leads" className="text-xs text-brand-cyan hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {data.recentLeads.length === 0 && <p className="text-sm text-white/40">No leads yet.</p>}
            {data.recentLeads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-white">{lead.fullName}</p>
                  <p className="text-xs text-white/40">{lead.email}</p>
                </div>
                <StatusBadge status={lead.status} />
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wide text-white/40">Recent AI Inquiries</p>
            <Link href="/admin/ai-inquiries" className="text-xs text-brand-cyan hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {data.recentAiInquiries.length === 0 && <p className="text-sm text-white/40">No inquiries yet.</p>}
            {data.recentAiInquiries.map((inq) => (
              <div key={inq.id} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-white">{inq.fullName}</p>
                  <p className="text-xs text-white/40">{inq.email}</p>
                </div>
                <StatusBadge status={inq.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
