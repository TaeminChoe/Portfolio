export default function LevelTag({ level }: { level: "High" | "Medium" | "Low" }) {
  const highClass =
    "border-accent/40 bg-accent/10 text-accent inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs";
  const mediumClass =
    "border-primary/40 bg-primary/10 text-primary inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs";
  const lowClass =
    "border-border bg-background/40 text-subtext inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs";

  return (
    <span
      className={` ${level === "High" && highClass} ${level === "Medium" && mediumClass} ${level === "Low" && lowClass} `}
    >
      {level}
    </span>
  );
}
