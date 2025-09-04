export default function CareerTypeBlock({ type }: { type: string }) {
  function typeClasses(type: string) {
    if (/MVP/i.test(type)) return "text-accent border-accent/30 bg-accent/10";
    if (/고도화|상용|개발/i.test(type)) return "text-primary border-primary/30 bg-primary/10";
    return "text-subtext border-border/60 bg-surface/60";
  }

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] leading-none ${typeClasses(
        type,
      )}`}
    >
      {type}
    </span>
  );
}
