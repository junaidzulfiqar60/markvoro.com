export default function GlowBackground({
  variant = "default",
}: {
  variant?: "default" | "dense";
}) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-brand-purple/20 blur-[120px]" />
      <div className="absolute top-1/3 -right-20 h-80 w-80 rounded-full bg-brand-cyan/20 blur-[120px]" />
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-brand-pink/10 blur-[120px]" />
      {variant === "dense" && (
        <div className="absolute bottom-1/4 right-1/3 h-64 w-64 rounded-full bg-brand-green/15 blur-[100px]" />
      )}
    </div>
  );
}
