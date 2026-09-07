import type { LucideIcon } from "lucide-react";

export default function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number | string;
  icon: LucideIcon;
}) {
  return (
    <div className="glass p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-white/40">{label}</p>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-gradient">
          <Icon className="h-4 w-4 text-white" />
        </div>
      </div>
      <p className="mt-4 font-display text-3xl font-bold text-white">{value}</p>
    </div>
  );
}
