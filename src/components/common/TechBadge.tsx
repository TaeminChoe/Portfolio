export default function TechBadge({ label }: { label: string }) {
  return (
    <span className="text-description border-border/60 bg-surface/50 text-subtext rounded-lg border px-2 py-1">
      {label}
    </span>
  );
}
