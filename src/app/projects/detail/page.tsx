// app/projects/[slug]/page.tsx
export default function ProjectDetailPage() {
  return (
    <main className="bg-background text-text min-h-dvh">
      <div className="mx-auto w-[1024px] max-w-[1024px] px-4 py-8 lg:px-6 lg:py-10">
        <header className="mb-6">
          <h1 className="text-title">[프로젝트명(비식별)]</h1>
          <p className="text-description text-subtext mt-1">
            Role: Frontend Engineer · Period: 2024.01–2025.06
          </p>
        </header>

        <section className="border-border bg-surface rounded-2xl border p-5">
          <h2 className="text-section text-text mb-3">Context</h2>
          <p className="text-body text-subtext">
            대규모 IoT 자산의 취약점 분석 결과를 시각화하는 내부 솔루션. 멀티 테넌트, 권한 기반 뷰,
            리포트 자동화가 핵심 요구사항.
          </p>
        </section>

        <section className="border-border bg-surface mt-4 rounded-2xl border p-5">
          <h2 className="text-section text-text mb-3">Problem → Solution → Result</h2>
          <ul className="text-body text-subtext list-disc space-y-1 pl-5">
            <li>
              <strong className="text-text">Problem.</strong> 리포트 생성 플로우가 길고, 일관성
              유지가 어려움.
            </li>
            <li>
              <strong className="text-text">Solution.</strong> 표준 리포트 컴포넌트/템플릿 + PDF
              파이프라인 구축.
            </li>
            <li>
              <strong className="text-text">Result.</strong> 생성 단계 7→4로 간소화, 회귀 이슈
              감소(정량값 비공개).
            </li>
          </ul>
        </section>

        <section className="border-border bg-surface mt-4 rounded-2xl border p-5">
          <h2 className="text-section text-text mb-3">My Responsibilities</h2>
          <ul className="text-body text-subtext list-disc space-y-1 pl-5">
            <li>Next.js(App Router) 기반 대시보드/리포트 UI 설계 및 구현</li>
            <li>공통 컴포넌트화(모달/테이블/배지) & 접근성/성능 가이드 수립</li>
            <li>Cypress E2E 라우팅 검증 파이프라인 도입</li>
          </ul>
        </section>

        <section className="border-border bg-surface mt-4 rounded-2xl border p-5">
          <h2 className="text-section text-text mb-3">Architecture (개념)</h2>
          <pre className="text-code text-subtext whitespace-pre-wrap">
            {`[Client] Next.js(App) → [API] Gateway → [Service] Django → [DB] PostgreSQL
(다국어, 멀티 테넌트, 권한/역할 기반 뷰)`}
          </pre>
        </section>

        <section className="border-border bg-surface mt-4 rounded-2xl border p-5">
          <h2 className="text-section text-text mb-3">Lessons & Next</h2>
          <ul className="text-body text-subtext list-disc space-y-1 pl-5">
            <li>템플릿화로 신규 리포트 추가 속도 향상</li>
            <li>다국어/권한 조합 테스트 자동화 필요</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
