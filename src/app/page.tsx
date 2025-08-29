import ContentLayout from "@/components/layout/ContentLayout";

export default function Page() {
  return (
    <ContentLayout
      title="대시보드"
      subtitle="요약 지표와 최신 활동을 확인하세요."
      actions={
        <button className="bg-primary/20 hover:bg-primary/30 rounded-lg px-3 py-1.5">
          새로고침
        </button>
      }
      divider
    >
      <div className="card p-6">
        <h2 className="text-section mb-2">섹션 타이틀</h2>
        <p className="text-body text-subtext">실제 콘텐츠는 여기서 자유롭게 구성합니다.</p>
      </div>

      <div className="card p-6">
        <h2 className="text-section mb-2">다른 섹션</h2>
        <pre className="text-code">{`console.log("Hello")`}</pre>
      </div>
    </ContentLayout>
  );
}
