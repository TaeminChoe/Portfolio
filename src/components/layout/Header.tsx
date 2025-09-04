"use client";
import { EXTERNAL_LINKS, ROUTES } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const dashboardUrl = ROUTES[0].url;

  return (
    <header className="border-border/60 bg-background/70 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1024px] items-center justify-between px-4 lg:px-6">
        {/* 좌측 로고/타이틀 */}
        <Link href={dashboardUrl} className="text-section">
          Portfolio
        </Link>

        {/* 중앙: 내부 라우트 */}
        <nav className="flex flex-1 justify-center gap-6">
          {ROUTES.map((item) => {
            const isActive = pathname === item.url;
            return (
              <Link
                key={item.url}
                href={item.url}
                className={`text-body text-subtext hover:text-text transition-colors ${
                  isActive ? "text-text" : ""
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* 우측: 외부 링크 */}
        <div className="flex items-center gap-4">
          {EXTERNAL_LINKS.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-body text-subtext hover:text-text transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
