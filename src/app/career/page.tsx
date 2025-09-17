"use client";
import { CAREER } from "@/constants/career";
import { parseStart } from "@/utils";
import CareerCard from "@/components/common/CareerCard";

/** 최신 시작일 순 정렬 */
const sorted = [...CAREER].sort(
  (a, b) => parseStart(b.period).getTime() - parseStart(a.period).getTime(),
);

export default function CareerPage() {
  return (
    <main className="mx-auto max-w-[1024px] px-4 py-10 lg:px-6">
      {/* 페이지 타이틀 영역: 얇은 그라데이션 라인 */}
      <header className="mb-8">
        <h1 className="text-title">Career</h1>
        <p className="text-description text-subtext">프로젝트/업무 단위 경력 정리</p>
        <div className="from-primary/30 via-border/40 to-accent/30 mt-4 h-px w-full bg-gradient-to-r" />
      </header>

      {/* 타임라인 레일 */}
      <section>
        <ol className="border-border/60 relative border-l pl-3">
          {/* 레일 배경 은은한 그라데이션 */}
          <div className="from-primary/30 via-border/60 to-accent/30 pointer-events-none absolute top-0 left-[-1px] h-full w-[2px] bg-gradient-to-b" />
          <div className="grid gap-5">
            {sorted.map((item) => (
              <CareerCard key={item.id} item={item} />
            ))}
          </div>
        </ol>
      </section>
    </main>
  );
}
