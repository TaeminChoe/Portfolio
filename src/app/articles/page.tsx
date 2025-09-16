// ZIEN Dark Theme v1.0.0 — Articles Index
// Path: app/article/page.tsx
// Date: 2025-09-16
// Status: Draft (Lists article details and links to /app/article/[slug])
//
"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";

// ──────────────────────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────────────────────

type ArticleMeta = {
  slug: string; // URL slug -> /article/[slug]
  title: string; // Article title
  date: string; // ISO string: '2025-08-21'
  summary: string; // Short description
  tags: string[]; // keywords
  readingTime: string; // e.g., '6 min read'
  status?: "published" | "draft";
};

// ──────────────────────────────────────────────────────────────────────────────
// Mock data (replace with real content source)
// ──────────────────────────────────────────────────────────────────────────────

const ARTICLES: ArticleMeta[] = [
  {
    slug: "next-app-router-a11y",
    title: "App Router에서 접근성 패턴 정리",
    date: "2025-08-21",
    summary: "페이지 전환, 모달, 포커스 트랩 등 접근성 패턴을 정리합니다.",
    tags: ["Next.js", "A11y", "Modal"],
    readingTime: "7 min read",
    status: "published",
  },
  {
    slug: "cypress-routing-ci",
    title: "Cypress로 라우팅 가용성 CI 만들기",
    date: "2025-09-05",
    summary: "배포 전 라우팅 경로를 자동 검증하여 회귀를 줄이는 방법.",
    tags: ["Cypress", "CI", "QA"],
    readingTime: "5 min read",
    status: "published",
  },
  {
    slug: "design-tokens-dark-theme",
    title: "다크 테마 토큰 설계 가이드",
    date: "2025-06-30",
    summary: "background/surface/text 계층과 상호작용 토큰을 정리.",
    tags: ["Design", "Tokens", "Dark"],
    readingTime: "6 min read",
    status: "draft",
  },
];

// ──────────────────────────────────────────────────────────────────────────────
// Utilities
// ──────────────────────────────────────────────────────────────────────────────

function cx(...cls: (string | false | null | undefined)[]) {
  return cls.filter(Boolean).join(" ");
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${y}.${m}.${d}`; // 2025.09.16
}

// Unique tag list
const ALL_TAGS = Array.from(new Set(ARTICLES.flatMap((a) => a.tags))).sort();

// ──────────────────────────────────────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────────────────────────────────────

export default function ArticlesIndexPage() {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [showDrafts, setShowDrafts] = useState(false);

  const items = useMemo(() => {
    const query = q.trim().toLowerCase();
    return ARTICLES.filter((a) => (showDrafts ? true : a.status !== "draft"))
      .filter((a) => !tag || a.tags.includes(tag))
      .filter((a) => {
        if (!query) return true;
        return (
          a.title.toLowerCase().includes(query) ||
          a.summary.toLowerCase().includes(query) ||
          a.tags.some((t) => t.toLowerCase().includes(query))
        );
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [q, tag, showDrafts]);

  return (
    <main className="bg-background text-text min-h-dvh">
      <div className="mx-auto w-[1024px] max-w-[1024px] px-4 py-8 lg:px-6 lg:py-10">
        <header className="mb-6 lg:mb-8" aria-label="Articles Header">
          <h1 className="text-title">Articles</h1>
          <p className="text-description text-subtext mt-1">
            정리된 글들을 모았습니다. 내부 정보는 비식별/일반화하여 서술합니다.
          </p>

          {/* Controls */}
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="flex-1">
              <span className="sr-only">Search articles</span>
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by title, tag, summary"
                className={cx(
                  "border-border bg-background text-body text-text w-full rounded-md border px-3 py-2",
                  "focus:ring-primary/50 focus:ring-2 focus:outline-none",
                )}
                aria-label="Search articles"
              />
            </label>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setTag(null)}
                aria-pressed={tag === null}
                className={cx(
                  "rounded-full border px-3 py-1 text-xs",
                  tag === null
                    ? "text-text bg-background border-border"
                    : "text-subtext border-border/60",
                )}
              >
                All
              </button>
              {ALL_TAGS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTag(tag === t ? null : t)}
                  aria-pressed={tag === t}
                  className={cx(
                    "rounded-full border px-3 py-1 text-xs",
                    tag === t
                      ? "text-text bg-background border-border"
                      : "text-subtext border-border/60",
                  )}
                >
                  {t}
                </button>
              ))}
              <label className="text-description text-subtext ml-2 inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showDrafts}
                  onChange={(e) => setShowDrafts(e.target.checked)}
                  className="border-border bg-background h-4 w-4 rounded"
                  aria-label="Show drafts"
                />
                Show drafts
              </label>
            </div>
          </div>
        </header>

        {/* Articles list */}
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6" role="list">
          {items.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/articles/${a.slug}`}
                className={cx(
                  "border-border bg-surface block w-full rounded-2xl border p-5 lg:p-6",
                  "focus:ring-primary/50 transition-colors transition-transform hover:-translate-y-0.5 hover:shadow-lg focus:ring-2 focus:outline-none",
                )}
                aria-label={`${a.title} detail`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-body text-text font-semibold">{a.title}</h2>
                    <p className="text-description text-subtext mt-0.5">
                      {formatDate(a.date)} · {a.readingTime}
                    </p>
                  </div>
                  {a.status === "draft" && (
                    <span className="border-border bg-background/40 text-subtext rounded-full border px-2 py-0.5 text-xs">
                      draft
                    </span>
                  )}
                </div>
                <p className="text-body text-subtext mt-2">{a.summary}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {a.tags.map((t) => (
                    <span
                      key={t}
                      className="border-border bg-primary/10 text-primary inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <p className="text-description text-primary mt-2">Read →</p>
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
