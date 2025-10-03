# Z-Sentinel (네트워크 취약점 분석 솔루션 MVP)

## 개요

- **기간**: 2025.02 ~ 2025.03
- **역할**: Frontend Engineer
- **기술 스택**: Next.js, TypeScript, TailwindCSS, AWS Amplify, Jest
- **요약**: 2025 SECON 보안 컨퍼런스 전시를 목표로 단기간 내 개발된 네트워크 취약점 분석 솔루션 MVP.  
  대용량 네트워크 패킷 데이터(10만 건 이상)를 렌더링하는 과정에서 Skeleton UI/UX로 사용자 경험을 개선했고, TDD 기반 개발 방식을 자체 적용해 품질 확보에 도전.

## 프로젝트 배경

- 네트워크 취약점 분석은 대량의 패킷 데이터를 처리해야 하므로, 웹 클라이언트에서 **렌더링 지연** 문제가 불가피했음.
- 컨퍼런스 출품용 MVP로 빠른 개발 사이클과 동시에, **대용량 데이터 처리 경험 검증**이 필요했음.
- 사용자에게 지연을 최소화하는 **UX 전략(Skeleton UI)** 과 안정성을 위한 **테스트 주도 개발(TDD)** 방식을 도입.

## 주요 기여

- **퍼블리싱/UI 개발**: TailwindCSS 기반 대시보드 화면 제작.
- **프론트엔드 개발**: Next.js/TypeScript로 데이터 시각화 모듈 구현.
- **대용량 데이터 처리**
  - API로 수집된 10만 건 이상의 패킷 데이터를 효율적으로 가져오고 렌더링.
  - 렌더링 지연 구간에 **Skeleton UI** 적용 → 사용자 피드백 개선.
- **대시보드 시각화**
  - **도넛 차트**: 취약점 유형별 분포 시각화.
  - **토폴로지 뷰**: 네트워크 기기 및 취약점 관계를 노드-링크 다이어그램 형태로 구현.
- **TDD 적용**
  - Jest 기반 단위 테스트 작성으로, 데이터 처리/렌더링 모듈의 정확성을 검증.
  - 자체 스터디 성격으로 TDD 개발 공법을 적용하며 학습 효과 확보.
- **배포 환경**
  - AWS Amplify를 이용해 컨퍼런스용 배포 환경 신속 구축.
- **반응형 설계**
  - 본 솔루션은 **PC 웹 대시보드 전용**으로 제작되어 반응형 설계는 의도적으로 적용하지 않음.

## 상세 내용

- **Skeleton UI/UX**
  - API 호출 후 대용량 데이터가 도착하기까지 렌더링 지연 발생.
  - 주요 그래프·대시보드 컴포넌트에 Skeleton 화면을 적용하여 로딩 구간의 불편 완화.

![Z-ONE Figma 캡쳐](/images/z-sentinel/skeleton.png)

```ts
export default function Devices() {
  const [tab, setTab] = useState<number>(0);

  return (
    <div className="flex flex-col gap-[10px]">
      <Tab items={m["tab"]} tab={tab} setTab={setTab} />

      {tab === 0 && (
        <Suspense fallback={<>devices loading...</>}>
          <TabList />
        </Suspense>
      )}
      {tab === 1 && (
        <Suspense fallback={<SecurityAlertsGraphSkeleton />}>
          <TabGraph />
        </Suspense>
      )}
    </div>
  );
}
```

- **Topology 시각화**
  - 네트워크 노드-링크 기반 다이어그램 구현.
  - 노드 클릭 시 상세 취약점 정보 표시.
- **도넛 그래프**
  - 취약점 분포를 도넛 차트로 표현해 직관적 현황 파악 가능.
- **테스트 주도 개발**
  - Jest를 활용해 데이터 처리 로직, 렌더링 모듈을 TDD 방식으로 작성.
  - 초기부터 테스트 케이스를 준비해 개발 안정성을 확보.

```ts
// 파일 위치 예시: app/vulnerabilities/vulnerabilities.test.tsx

describe(`${t["title"]}`, () => {
  (useQuery as jest.Mock).mockReturnValue({
    data: MOCK,
    isLoading: false,
    isError: false,
    isRefetching: false,
  });
  (VulnerabilitiesLogic as jest.Mock).mockReturnValue({});
  render(
    <Provider>
      <Vulnerabilities />
    </Provider>,
  );

  test("title 표출", () => {
    expect(screen.getByText(m["title"])).toBeInTheDocument();
  });

  test("TAB: Overview", () => {
    expect(screen.getByTestId(t["tab-overview"])).toBeInTheDocument();
  });

  // Overview 탭
  test("CHART: 위험도 수준 표출", () => {
    const ele = screen.getByTestId(t["tile-infra-security-level"]);
    expect(ele).toBeInTheDocument();
    // 값 표출
    if (false) {
      expect(ele).toHaveTextContent(``);
    }
  ...
```

## 성과 및 배운 점

- **성능 대응 경험**: 대용량 패킷 데이터 렌더링 과정에서 Skeleton UI를 활용해 UX를 개선.
- **TDD 실험**: Jest 기반 단위 테스트와 TDD 사이클을 직접 적용해 코드 품질 및 개발 경험 향상.
- **시각화 역량 강화**: 토폴로지·도넛 그래프 등 보안 분석 대시보드 시각화 경험 확보.
- **단기간 프로젝트 완수**: 2개월이라는 짧은 기간 안에 컨퍼런스 전시용 MVP를 완성.
