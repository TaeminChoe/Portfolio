// ZIEN Dark Theme v1.0.0 — Article Detail
// Path: app/article/[slug]/page.tsx
// Date: 2025-09-16
// Status: Draft (Self-contained article renderer with meta, tags, TOC, prev/next)
//
"use client";
import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";

// ──────────────────────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────────────────────

type Block =
  | { type: "h2"; text: string; id?: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "code"; lang?: string; text: string };

type Article = {
  slug: string;
  title: string;
  date: string; // '2025-09-16'
  readingTime: string; // '6 min read'
  summary?: string;
  tags: string[];
  blocks: Block[];
};

// ──────────────────────────────────────────────────────────────────────────────
// Mock Articles (replace with real data source)
// ──────────────────────────────────────────────────────────────────────────────

const ARTICLES: Record<string, Article> = {
  "cypress-routing-ci": {
    slug: "cypress-routing-ci",
    title: "Cypress로 라우팅 가용성 CI 만들기",
    date: "2025-09-05",
    readingTime: "5 min read",
    summary: "배포 전 라우팅 경로를 자동으로 검증해 회귀를 줄이는 방법을 정리합니다.",
    tags: ["Cypress", "CI", "QA"],
    blocks: [
      { type: "h2", text: "개요", id: "overview" },
      {
        type: "p",
        text: "배포 전 주요 라우트가 살아있는지 테스트하여 404/리다이렉트 이슈를 예방합니다.",
      },
      { type: "h2", text: "전략", id: "strategy" },
      {
        type: "ul",
        items: [
          "핵심 경로 스냅샷 — /, /login, /dashboard 등",
          "CI에서 병렬 실행으로 시간 단축",
          "실패 시 스크린샷/비디오 아티팩트 보존",
        ],
      },
      { type: "h2", text: "예시 코드", id: "example" },
      {
        type: "code",
        lang: "ts",
        text: `// cypress/e2e/routes.cy.ts\nconst routes = ['/', '/login', '/dashboard'];\nroutes.forEach((path) => {\n  it('should be reachable: ' + path, () => {\n    cy.visit(path);\n    cy.location('pathname').should('satisfy', (p) => p === path || typeof p === 'string');\n  });\n});`,
      },
      { type: "h2", text: "마무리", id: "wrap-up" },
      { type: "p", text: "간단한 검증만으로도 배포 전 라우팅 안정성을 크게 높일 수 있습니다." },
    ],
  },
  "next-app-router-a11y": {
    slug: "next-app-router-a11y",
    title: "App Router 접근성 패턴",
    date: "2025-08-21",
    readingTime: "7 min read",
    summary: "페이지 전환, 포커스 관리, 모달 a11y에 대한 실무 가이드.",
    tags: ["Next.js", "A11y", "Modal"],
    blocks: [
      { type: "h2", text: "포커스 관리", id: "focus" },
      {
        type: "p",
        text: "라우트 전환 시 주요 헤딩으로 포커스를 이동시켜 스크린리더 경로를 단축합니다.",
      },
      {
        type: "code",
        lang: "tsx",
        text: `// app/layout.tsx\nexport default function Layout({ children }){\n  return (<main tabIndex={-1} id=\"main\" className=\"outline-none\">{children}</main>);\n}`,
      },
      { type: "h2", text: "모달", id: "modal" },
      { type: "ul", items: ["aria-modal, role=dialog", "포커스 트랩", "닫기 버튼 키보드 접근"] },
    ],
  },
};

const ORDER = ["cypress-routing-ci", "next-app-router-a11y"]; // prev/next 순서

// ──────────────────────────────────────────────────────────────────────────────
// Utilities
// ──────────────────────────────────────────────────────────────────────────────

function cx(...cls: (string | false | null | undefined)[]) {
  return cls.filter(Boolean).join(" ");
}
function fmtDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${y}.${m}.${d}`;
}

function makeTOC(blocks: Block[]) {
  return blocks
    .filter((b): b is Extract<Block, { type: "h2" }> => b.type === "h2")
    .map((b) => ({ id: b.id ?? slugify(b.text), text: b.text }));
}
function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ──────────────────────────────────────────────────────────────────────────────
// Renderer
// ──────────────────────────────────────────────────────────────────────────────

function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <article className="prose prose-invert max-w-none">
      {blocks.map((b, i) => {
        if (b.type === "h2") {
          const id = b.id ?? slugify(b.text);
          return (
            <h2 key={i} id={id} className="text-section text-text mt-6 mb-3">
              {b.text}
            </h2>
          );
        }
        if (b.type === "p")
          return (
            <p key={i} className="text-body text-subtext">
              {b.text}
            </p>
          );
        if (b.type === "ul")
          return (
            <ul key={i} className="text-body text-subtext list-disc space-y-1 pl-5">
              {b.items.map((it, idx) => (
                <li key={idx}>{it}</li>
              ))}
            </ul>
          );
        if (b.type === "code")
          return (
            <pre
              key={i}
              className="text-code text-subtext border-border bg-background/40 rounded-xl border p-3 break-words whitespace-pre-wrap"
            >
              {b.text}
            </pre>
          );
        return null;
      })}
    </article>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────────────────────────────────────

export default function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const article = ARTICLES[params.slug];
  if (!article) return notFound();

  const toc = makeTOC(article.blocks);
  const idx = ORDER.indexOf(article.slug);
  const prev = idx > 0 ? ARTICLES[ORDER[idx - 1]] : null;
  const next = idx >= 0 && idx < ORDER.length - 1 ? ARTICLES[ORDER[idx + 1]] : null;

  return (
    <main className="bg-background text-text min-h-dvh">
      <div className="mx-auto w-[1024px] max-w-[1024px] px-4 py-8 lg:px-6 lg:py-10">
        {/* Header */}
        <header className="mb-6" aria-label="Article Header">
          <h1 className="text-title">{article.title}</h1>
          <p className="text-description text-subtext mt-1">
            {fmtDate(article.date)} · {article.readingTime}
          </p>
          {article.summary && <p className="text-body text-subtext mt-2">{article.summary}</p>}
          <div className="mt-2 flex flex-wrap gap-2">
            {article.tags.map((t) => (
              <span
                key={t}
                className="border-border bg-primary/10 text-primary inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs"
              >
                {t}
              </span>
            ))}
          </div>
        </header>

        {/* Body */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Content */}
          <section className="border-border bg-surface rounded-2xl border p-5 lg:col-span-3 lg:p-6">
            <ArticleBody blocks={article.blocks} />
          </section>

          {/* TOC */}
          <aside className="border-border bg-surface h-fit rounded-2xl border p-5 lg:col-span-1 lg:p-6">
            <h2 className="text-body text-text font-semibold">On this page</h2>
            <nav className="text-description text-subtext mt-2">
              <ul className="space-y-1" role="list">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a
                      href={`#${t.id}`}
                      className="decoration-border/60 hover:text-primary focus:ring-primary/50 rounded underline underline-offset-4 focus:ring-2 focus:outline-none"
                    >
                      {t.text}
                    </a>
                  </li>
                ))}
                {toc.length === 0 && <li className="text-subtext">—</li>}
              </ul>
            </nav>
          </aside>
        </div>

        {/* Prev / Next */}
        <nav className="mt-6 flex items-center justify-between">
          <div>
            {prev ? (
              <Link
                href={`/article/${prev.slug}`}
                className="text-description text-primary decoration-border/60 underline underline-offset-4"
              >
                ← {prev.title}
              </Link>
            ) : (
              <span />
            )}
          </div>
          <div>
            {next ? (
              <Link
                href={`/article/${next.slug}`}
                className="text-description text-primary decoration-border/60 underline underline-offset-4"
              >
                {next.title} →
              </Link>
            ) : (
              <span />
            )}
          </div>
        </nav>

        <footer className="text-description text-subtext mt-8" aria-label="Footer">
          <p>Built with Next.js(App Router) + TypeScript + Tailwind — ZIEN Dark Theme v1.0.0</p>
        </footer>
      </div>
    </main>
  );
}
