import { CareerItem } from "@/types";
import TechBadge from "./TechBadge";
import IconCalendar from "../icons/IconCalendar";
import IconBuilding from "../icons/IconBuilding";
import CareerTypeBlock from "./CareerTypeBlock";
import { useEffect, useMemo, useRef, useState } from "react";
import IconChevron from "../icons/IconChevron";

export default function CareerCard({ item }: { item: CareerItem }) {
  // 아코디언 상태
  const [open, setOpen] = useState(false);

  const panelId = `contrib-${item.id}`;

  return (
    <li className="relative pl-6">
      {/* 타임라인 노드 */}
      <span
        className="bg-primary shadow-background absolute top-5 left-0 block h-2.5 w-2.5 rounded-full shadow-[0_0_0_3px]"
        aria-hidden
      />
      {/* 카드: 그라데이션 보더 효과 (hover 시 강조) */}
      <article className="group border-border/60 bg-surface/60 hover:border-primary/40 relative rounded-xl border p-4 transition hover:-translate-y-0.5 hover:shadow-lg">
        <div className="from-primary/20 to-accent/20 pointer-events-none absolute inset-0 -z-10 rounded-xl bg-gradient-to-r via-transparent opacity-0 transition group-hover:opacity-100" />

        <header className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <h3 className="text-body text-text">{item.title}</h3>

          <div className="text-description text-subtext flex items-center gap-2">
            <IconCalendar className="h-4 w-4" />
            <span>{item.period}</span>
            <CareerTypeBlock type={item.type} />
          </div>
        </header>

        <div className="text-description text-subtext mt-1 flex items-center gap-2">
          <IconBuilding className="h-4 w-4" />
          <span>{item.company}</span>
        </div>

        <p className="text-body text-subtext mt-3">{item.description}</p>

        <div className="mt-3 grid gap-1">
          <h4 className="text-description text-text">Role</h4>
          <p className="text-body text-subtext">{item.role}</p>
        </div>

        {/* 아코디언 토글 */}
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="text-description text-text hover:text-primary mt-3 inline-flex items-center gap-2 transition"
        >
          Contributions
          <IconChevron
            className={`h-4 w-4 transform-gpu transition-transform ${open ? "rotate-180" : "rotate-0"}`}
          />
        </button>

        <div
          id={panelId}
          className={`mt-2 overflow-hidden transition-all duration-300 ease-in-out ${
            open ? "max-h-[1200px]" : "max-h-0"
          }`}
        >
          <ul className="text-body text-subtext list-disc space-y-1 pl-5">
            {item.contributions.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {item.techStack.map((t) => (
            <TechBadge key={t} label={t} />
          ))}
        </div>
      </article>
    </li>
  );
}
