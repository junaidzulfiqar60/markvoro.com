const STATUS_STYLES: Record<string, string> = {
  NEW: "bg-brand-cyan/15 text-brand-cyan border-brand-cyan/30",
  CONTACTED: "bg-brand-blue/15 text-brand-blue border-brand-blue/30",
  IN_PROGRESS: "bg-brand-orange/15 text-brand-orange border-brand-orange/30",
  QUALIFIED: "bg-brand-purple/15 text-brand-purple border-brand-purple/30",
  CONVERTED: "bg-brand-green/15 text-brand-green border-brand-green/30",
  CLOSED: "bg-white/10 text-white/50 border-white/15",
  ACTIVE: "bg-brand-green/15 text-brand-green border-brand-green/30",
  UNSUBSCRIBED: "bg-white/10 text-white/50 border-white/15",
};

export default function StatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLES[status] || "bg-white/10 text-white/50 border-white/15";
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium ${style}`}>
      {status.replace(/_/g, " ")}
    </span>
  );
}
