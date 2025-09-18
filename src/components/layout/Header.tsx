"use client";
import { ROUTES } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dashboardUrl = ROUTES[0].url;

  // 라우트 변경 시 모바일 메뉴 자동 닫기
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="border-border/60 bg-background/70 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1024px] items-center justify-between px-4 lg:px-6">
        {/* 좌측 로고/타이틀 */}
        <Link href={dashboardUrl} className="text-section hover:opacity-90">
          Portfolio
        </Link>

        {/* 데스크탑 내비게이션 */}
        <nav className="hidden flex-1 justify-center gap-6 lg:flex">
          {ROUTES.map((item) => {
            const isActive = pathname === item.url;
            return (
              <Link
                key={item.url}
                href={item.url}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "text-body transition-colors",
                  isActive ? "text-text" : "text-subtext hover:text-text",
                  isActive
                    ? "border-primary border-b-2 pb-0.5"
                    : "border-b-2 border-transparent pb-0.5",
                ].join(" ")}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* 데스크탑 우측(예: 외부 링크 자리) — 필요 시 열기 */}
        <div className="hidden items-center gap-3 lg:flex">
          {/* 예시
          <a href="https://github.com/..." target="_blank" rel="noreferrer"
             className="text-body text-subtext hover:text-text transition-colors">GitHub</a>
          */}
        </div>

        {/* 모바일 햄버거 버튼 */}
        <button
          type="button"
          className="border-border/60 hover:bg-surface/60 focus:ring-primary/50 -mr-1 inline-flex h-9 w-9 items-center justify-center rounded-xl border focus:ring-2 focus:outline-none lg:hidden"
          aria-label="메뉴 열기"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {/* 간단한 햄버거 아이콘 (inline SVG) */}
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M3 6h18M3 12h18M3 18h18"
              className="stroke-text/80"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* 모바일 드롭다운 패널 */}
      <div
        id="mobile-nav"
        className={[
          "border-border/60 bg-background/95 border-t backdrop-blur lg:hidden",
          open ? "block" : "hidden",
        ].join(" ")}
      >
        <nav className="mx-auto max-w-[1024px] px-4 py-3 lg:px-6">
          <ul className="flex flex-col gap-1">
            {ROUTES.map((item) => {
              const isActive = pathname === item.url;
              return (
                <li key={item.url}>
                  <Link
                    href={item.url}
                    aria-current={isActive ? "page" : undefined}
                    className={[
                      "text-body flex w-full items-center justify-between rounded-xl px-3 py-2 transition-colors",
                      isActive
                        ? "bg-surface text-text"
                        : "text-subtext hover:text-text hover:bg-surface/60",
                    ].join(" ")}
                  >
                    <span>{item.name}</span>
                    {isActive && (
                      <span
                        className="bg-primary ml-3 inline-block h-2 w-2 rounded-full"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* 필요 시 외부 링크 섹션 추가 */}
          <div className="border-border/50 mt-3 border-t pt-3">
            <a
              className="text-body text-subtext hover:text-text hover:bg-surface/60 block rounded-xl px-3 py-2"
              href="..."
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
