export default function KeywordTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="border-border bg-primary/10 text-primary inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs">
      {children}
    </span>
  );
}
