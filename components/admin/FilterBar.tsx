"use client";

import type { ReactNode } from "react";
import { Search } from "lucide-react";

export default function FilterBar({
  q,
  onQChange,
  status,
  onStatusChange,
  statusOptions,
  extra,
}: {
  q: string;
  onQChange: (v: string) => void;
  status: string;
  onStatusChange: (v: string) => void;
  statusOptions: string[];
  extra?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
        <input
          value={q}
          onChange={(e) => onQChange(e.target.value)}
          placeholder="Search..."
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-brand-cyan/60"
        />
      </div>
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-brand-cyan/60"
      >
        <option value="" className="bg-base-panel">All Statuses</option>
        {statusOptions.map((opt) => (
          <option key={opt} value={opt} className="bg-base-panel">
            {opt.replace(/_/g, " ")}
          </option>
        ))}
      </select>
      {extra}
    </div>
  );
}
