import { cx } from "@/utils";
import { ReactNode } from "react";

interface Props {
  label: string;
  className?: string;
  children: ReactNode;
}

export default function ComponentCard({ label, className, children }: Props) {
  return (
    <section
      aria-label={label}
      className={cx(
        "bg-surface border-border block w-full rounded-2xl border p-5 lg:p-6",
        "transition-colors transition-transform hover:-translate-y-0.5 hover:shadow-lg",
        className,
      )}
    >
      {children}
    </section>
  );
}
