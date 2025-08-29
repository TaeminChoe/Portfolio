// components/ContentLayout.tsx
import { ReactNode } from "react";

type ContentLayoutProps = {
  title?: ReactNode; // 페이지 타이틀(옵션)
  subtitle?: ReactNode; // 서브타이틀/설명(옵션)
  actions?: ReactNode; // 우측 액션 버튼 영역(옵션)
  children: ReactNode;
  className?: string; // 추가 커스텀(옵션)
  noGutter?: boolean; // 상단/하단 여백 제거
  divider?: boolean; // 헤더 하단 구분선
};

export default function ContentLayout({
  title,
  subtitle,
  actions,
  children,
  className = "",
  noGutter,
  divider,
}: ContentLayoutProps) {
  return (
    <section className={`${noGutter ? "" : "space-y-6"} ${className}`}>
      {(title || actions || subtitle) && (
        <header
          className={[
            "flex items-start justify-between gap-4",
            noGutter ? "mb-0" : "mb-4",
            divider ? "border-border/60 border-b pb-4" : "",
          ].join(" ")}
        >
          <div className="space-y-1">
            {title && <h1 className="text-title">{title}</h1>}
            {subtitle && <p className="text-description text-subtext">{subtitle}</p>}
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </header>
      )}

      <div className="space-y-6">{children}</div>
    </section>
  );
}
