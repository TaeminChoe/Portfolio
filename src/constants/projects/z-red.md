# Z-RED (유럽 RED 규제 대응 자가진단 솔루션)

## 개요

- **기간**: 2025.06 ~ 2025.07
- **역할**: Frontend Engineer
- **기술 스택**: Next.js, TypeScript, TailwindCSS
- **요약**: 무선기기 제조사를 대상으로 유럽 RED 규제 대응 수준을 자가 설문 형태로 점검하고, 결과 리포트를 이메일로 전달하며 컨설팅으로 연결하는 SaaS형 웹앱. 반응형 UI와 인터랙션 중심 설계, 분석/알림 시스템 연동을 통해 실제 리드 전환에 기여.

## 프로젝트 배경

- 유럽 RED(Radio Equipment Directive) 규제는 유럽 시장 진출을 위한 필수 준수사항.
- 국내 제조사는 규제 문항 복잡도와 해석 난이도로 초기 진입장벽이 높았음.
- “간단하게 시작”을 목표로, **모바일·PC 모두 자연스러운 반응형**과 **문항 단위 포커싱·애니메이션**을 적용한 자가진단 설문 웹앱을 기획·개발.

## 주요 기여

- **퍼블리싱/UX 설계**: TailwindCSS 기반 반응형 레이아웃, 문항 전환 애니메이션, 포커스 이동 UX 설계.
- **프론트엔드 개발**: Next.js로 설문 진행/저장/결과 페이지 구현, 결과 요약 **이메일 발송** 플로우 구성.
- **외부 연동**:
  - **Google Analytics**로 유입/전환/완료율 측정.
  - **Slack Webhook**으로 설문 완료 시 운영팀 실시간 알림.
- **리드 전환**: 결과 리포트 내 **컨설팅 제안 CTA** 제공으로 후속 상담 전환 유도.

## 상세 내용

- **설문 인터페이스**
  - RED 기준에 맞춘 문항 세트 구성, 섹션별 진행도 안내.
  - `ref`를 활용해 설문 문항 전환 시 해당 영역에 **자동 포커싱 및 스크롤 이동**되도록 설계.
  - 마이크로 인터랙션은 별도 라이브러리를 사용하지 않고 CSS transition과 DOM 제어만으로 구현.

```ts
// 활성화 된 질문으로 스크롤 이동
useEffect(() => {
  const el = refs.current[activeStep];
  if (el) {
    const rect = el.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    // 화면 중앙 30%~70% 사이를 보이는 범위로 정의
    const minVisible = viewportHeight * 0.2;
    const maxVisible = viewportHeight * 0.8;

    const isInCenterRange = rect.top >= minVisible && rect.bottom <= maxVisible;

    if (!isInCenterRange) {
      // 화면 중앙에 오도록 스크롤
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }
}, [activeStep]);

// 질문을 선택했을 때 다음 질문으로 포커싱 이동
useEffect(() => {
  if (step <= fieldOrder.length && activeStep === step && isMeaningfulValue(currentValue)) {
    const delay = setTimeout(() => {
      setStep((prev) => prev + 1);
      if (activeStep !== fieldOrder.length) setActiveStep((prev) => prev + 1);
    }, 100);
    return () => clearTimeout(delay);
  }
}, [currentValue, activeStep, currentError, step]);
```

- **결과 리포트 & 이메일**
  - 설문 종료 직후, 충족/미충족 현황을 요약한 결과를 **이메일로 자동 발송**.
  - Calendly 같은 외부 예약 서비스는 사용하지 않고, **회사 Support 메일**로 결과와 고객 정보가 전달되어 후속 대응이 가능하도록 구성.
- **운영/모니터링**
  - GA 기반 유입 채널, 이탈 지점, 섹션별 완료율 추적.
  - Slack 알림으로 실시간 리드 감지 및 운영 대응 속도 개선.

```ts
// Slack 알림 예시 (간소화)
await fetch(process.env.SLACK_WEBHOOK_URL!, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    text: `새 RED 설문 완료\n이메일: ${email}\n완료 시각: ${new Date().toISOString()}`,
  }),
});
```

## 성과 및 배운점

- **접근성 강화**: 반응형·포커싱 UI로 모바일 첫 방문자의 이탈률을 낮추고 설문 완료율 개선.
- **운영 효율화**: Analytics/Slack 연동으로 리드 파이프라인을 가시화하고 대응 시간을 단축.
- **전환 설계**: 결과 리포트 기반의 컨설팅 CTA로 실제 문의 전환에 기여.
