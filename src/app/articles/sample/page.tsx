// ZIEN Dark Theme v1.0.0 — Sample Article Detail
// Path: app/articles/sample/page.tsx
// Status: Draft (Static sample article page)

"use client";
import React from "react";

export default function SampleArticlePage() {
  return (
    <main className="bg-background text-text min-h-dvh">
      <div className="mx-auto w-[1024px] max-w-[1024px] px-4 py-8 lg:px-6 lg:py-10">
        <header className="mb-6" aria-label="Article Header">
          <h1 className="text-title">샘플 아티클</h1>
          <p className="text-description text-subtext mt-1">2025.09.16 · 3 min read</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="border-border bg-primary/10 text-primary inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs">
              Sample
            </span>
            <span className="border-border bg-primary/10 text-primary inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs">
              Demo
            </span>
          </div>
        </header>

        <article className="prose prose-invert max-w-none">
          <h2 className="text-section text-text mt-6 mb-3">소개</h2>
          <p className="text-body text-subtext">
            이 페이지는 포트폴리오의 아티클 상세 페이지 템플릿 예시입니다. 정적 내용으로
            작성되었습니다.
          </p>

          <h2 className="text-section text-text mt-6 mb-3">코드 예시</h2>
          <pre className="text-code text-subtext border-border bg-background/40 rounded-xl border p-3 break-words whitespace-pre-wrap">
            {`function hello(name: string) {
  return 'Hello, ${name}!';
}
console.log(hello('World'));`}
          </pre>

          <h2 className="text-section text-text mt-6 mb-3">결론</h2>
          <p className="text-body text-subtext">
            실제 글을 작성할 때는 이 구조를 따라가며, 프로젝트 경험이나 기술 내용을 정리하면 됩니다.
          </p>
        </article>

        <footer className="text-description text-subtext mt-8" aria-label="Footer">
          <p>Built with Next.js(App Router) + TypeScript + Tailwind — ZIEN Dark Theme v1.0.0</p>
        </footer>
      </div>
    </main>
  );
}
