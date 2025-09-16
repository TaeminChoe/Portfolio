// ZIEN Dark Theme v1.0.0 — Projects Index
// Path: app/project/page.tsx
// Date: 2025-09-16
// Status: Draft (Lists project details and links to /app/project/[slug])
//
"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";

// ──────────────────────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────────────────────

type ProjectMeta = {
  slug: string; // URL slug -> /project/[slug]
  name: string; // Project display name
  role: string; // Your role (e.g., FE Engineer)
  period: string; // e.g., 2024.01–2025.06
  summary: string; // short description (non-sensitive)
  tags: string[]; // tech keywords (tokens only in UI)
  status?: "active" | "archived";
};

// ──────────────────────────────────────────────────────────────────────────────
// Mock data (replace with server/DB data)
// ──────────────────────────────────────────────────────────────────────────────

const PROJECTS: ProjectMeta[] = [
  {
    slug: "z-red",
    name: "Z‑RED",
    role: "Frontend Engineer",
    period: "2025.03–",
    summary: "RED 3.3 / EN 303 645 체크리스트 기반 내부 솔루션 (다국어·권한·SMTP 프로파일).",
    tags: ["Next.js", "Django", "i18next", "Email"],
    status: "active",
  },
  {
    slug: "z-iot",
    name: "Z‑IoT",
    role: "Frontend Engineer",
    period: "2024.01–2025.06",
    summary: "IoT 펌웨어 분석 결과 대시보드 / 리포트 자동화 / 멀티 테넌트.",
    tags: ["Next.js", "Tailwind", "Django", "PostgreSQL", "Report/PDF"],
    status: "archived",
  },
  {
    slug: "z-one",
    name: "Z‑ONE 2.0",
    role: "Frontend Engineer",
    period: "2025.02–",
    summary: "멀티 테넌트 보안 플랫폼, 라우팅 E2E 검증·역할 기반 UX.",
    tags: ["Next.js", "Docker", "Cypress", "RBAC"],
    status: "active",
  },
];

// ──────────────────────────────────────────────────────────────────────────────
// Primitives
// ──────────────────────────────────────────────────────────────────────────────

function cx(...cls: (string | false | null | undefined)[]) {
  return cls.filter(Boolean).join(" ");
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h1 className="text-title">{children}</h1>;
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="border-border bg-primary/10 text-primary inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs">
      {children}
    </span>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────────────────────────────────────

export default function ProjectsIndexPage() {
  const [q, setQ] = useState("");
  const [onlyActive, setOnlyActive] = useState(false);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      if (onlyActive && p.status !== "active") return false;
      if (!query) return true;
      return (
        p.name.toLowerCase().includes(query) ||
        p.summary.toLowerCase().includes(query) ||
        p.tags.some((t) => t.toLowerCase().includes(query))
      );
    });
  }, [q, onlyActive]);

  return (
    <main className="bg-background text-text min-h-dvh">
      <div className="mx-auto w-[1024px] max-w-[1024px] px-4 py-8 lg:px-6 lg:py-10">
        <header className="mb-6 lg:mb-8" aria-label="Projects Header">
          <SectionTitle>Projects</SectionTitle>
          <p className="text-description text-subtext mt-1">
            회사 내부 프로젝트 특성상 민감 정보는 공개하지 않습니다. 비식별화된 개요와 제 역할
            중심으로 구성합니다.
          </p>

          {/* Controls */}
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="flex-1">
              <span className="sr-only">Search projects</span>
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by name, tag, summary"
                className={cx(
                  "border-border bg-background text-body text-text w-full rounded-md border px-3 py-2",
                  "focus:ring-primary/50 focus:ring-2 focus:outline-none",
                )}
                aria-label="Search projects"
              />
            </label>
            <label className="text-description text-subtext inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={onlyActive}
                onChange={(e) => setOnlyActive(e.target.checked)}
                className="border-border bg-background h-4 w-4 rounded"
                aria-label="Only active projects"
              />
              Only active
            </label>
          </div>
        </header>

        {/* Projects list */}
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6" role="list">
          {filtered.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/projects/${p.slug}`}
                className={cx(
                  "border-border bg-surface block w-full rounded-2xl border p-5 lg:p-6",
                  "focus:ring-primary/50 transition-colors transition-transform hover:-translate-y-0.5 hover:shadow-lg focus:ring-2 focus:outline-none",
                )}
                aria-label={`${p.name} detail`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-body text-text font-semibold">{p.name}</h2>
                    <p className="text-description text-subtext mt-0.5">
                      Role: {p.role} · Period: {p.period}
                    </p>
                  </div>
                  {p.status && (
                    <span
                      className={cx(
                        "rounded-full border px-2 py-0.5 text-xs",
                        p.status === "active"
                          ? "text-accent border-accent/40 bg-accent/10"
                          : "text-subtext border-border bg-background/40",
                      )}
                    >
                      {p.status}
                    </span>
                  )}
                </div>
                <p className="text-body text-subtext mt-2">{p.summary}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
                <p className="text-description text-primary mt-2">View Detail →</p>
              </Link>
            </li>
          ))}
        </ul>

        <footer className="text-description text-subtext mt-8" aria-label="Footer">
          <p>Built with Next.js(App Router) + TypeScript + Tailwind — ZIEN Dark Theme v1.0.0</p>
        </footer>
      </div>
    </main>
  );
}
