// ZIEN Dark Theme v1.0.0 — Global 404 Page (Simplified)
// Path: app/not-found.tsx
// Date: 2025-09-16
// Notes:
// - Server Component by default (no 'use client')
// - Triggered when next/navigation.notFound() is called or route not matched

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-background text-text min-h-dvh">
      <div className="mx-auto w-[1024px] max-w-[1024px] px-4 py-20 text-center lg:px-6">
        <h1 className="text-title mb-2">페이지를 찾을 수 없어요</h1>
        <p className="text-body text-subtext mb-6">주소가 잘못되었거나 준비 중인 페이지입니다.</p>
        <Link
          href="/"
          className="border-primary bg-primary/10 text-body text-primary focus:ring-primary/50 inline-flex items-center justify-center gap-2 rounded-lg border px-6 py-2 transition-colors transition-transform hover:-translate-y-0.5 hover:shadow-lg focus:ring-2 focus:outline-none"
          aria-label="Go to Home"
        >
          홈으로 가기
        </Link>
      </div>
    </main>
  );
}
