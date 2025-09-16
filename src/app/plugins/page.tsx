// ZIEN Dark Theme v1.0.0 — Plugins Overview + Individual Pages
// Date: 2025-09-16
// Status: Draft (Overview page + detail plugin page template)
//
// File path proposal
// - app/plugins/page.tsx                   // Overview: list of all plugins with summary + link
// - app/plugins/[slug]/page.tsx            // Plugin detail: preview + code (moved from overview)
// - app/demo/[demoName]/page.tsx           // Standalone demo usage pages
//
"use client";
import React from "react";
import Link from "next/link";

// ──────────────────────────────────────────────────────────────────────────────
// Mock data registry (replace with central _data/plugins.ts if needed)
// ──────────────────────────────────────────────────────────────────────────────

const PLUGINS = [
  {
    slug: "use-modal",
    name: "useModal",
    summary: "모달 상태/제어 훅과 접근성 패턴. 코어/예시 분리.",
    tags: ["hook", "modal", "a11y"],
    demoName: "use-modal",
  },
  {
    slug: "badge",
    name: "Badge",
    summary: "토큰만 사용하는 배지 컴포넌트.",
    tags: ["ui", "token"],
    demoName: "badge",
  },
];

// ──────────────────────────────────────────────────────────────────────────────
// Overview Page — app/plugins/page.tsx
// ──────────────────────────────────────────────────────────────────────────────

export default function PluginsOverviewPage() {
  return (
    <main className="bg-background text-text min-h-dvh">
      <div className="mx-auto w-[1024px] max-w-[1024px] px-4 py-8 lg:px-6 lg:py-10">
        <header className="mb-6 lg:mb-8">
          <h1 className="text-title">Plugins</h1>
          <p className="text-description text-subtext mt-1">
            플러그인의 간단한 설명과 링크를 제공합니다. 상세 문서와 코드 스니펫은 각 플러그인 상세
            페이지에서 확인하세요.
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-4 lg:gap-6" role="list">
          {PLUGINS.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/plugins/${p.slug}`}
                className="border-border bg-surface focus:ring-primary/50 block w-full rounded-2xl border p-5 transition-colors transition-transform hover:-translate-y-0.5 hover:shadow-lg focus:ring-2 focus:outline-none lg:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-body text-text font-semibold">{p.name}</h2>
                    <p className="text-description text-subtext mt-0.5">{p.summary}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="border-border bg-primary/10 text-primary inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-description text-primary mt-2">View Details →</p>
              </Link>
            </li>
          ))}
        </ul>

        <footer className="text-description text-subtext mt-8">
          <p>Built with Next.js(App Router) + TypeScript + Tailwind — ZIEN Dark Theme v1.0.0</p>
        </footer>
      </div>
    </main>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Detail Page Template — app/plugins/[slug]/page.tsx
// (Move the existing detailed PluginViewer logic here per slug)
// ──────────────────────────────────────────────────────────────────────────────

/* Example:
import { notFound } from 'next/navigation';

const PLUGIN_DETAIL = {
  'use-modal': {
    name: 'useModal',
    // bring over sections, Demo components, and code from previous version
  },
  'badge': {
    name: 'Badge',
    // ...
  }
};

export default function PluginDetailPage({ params }: { params: { slug: string } }) {
  const data = PLUGIN_DETAIL[params.slug];
  if (!data) return notFound();
  return (
    <main className="bg-background min-h-dvh text-text">
      <div className="mx-auto w-[1024px] max-w-[1024px] px-4 lg:px-6 py-8 lg:py-10">
        <h1 className="text-title">{data.name}</h1>
      </div>
    </main>
  );
}
*/
