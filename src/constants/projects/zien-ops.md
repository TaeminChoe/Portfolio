# ZIEN Ops (홈페이지·IoT 보안 솔루션 운영 및 개선)

## 개요

- **기간**: 2024.10 ~ 현재
- **역할**: Full-stack Engineer
- **기술 스택**: Next.js, TypeScript, TailwindCSS, NestJS, React-admin, Docker, Cypress, GitHub Actions, AWS EC2
- **요약**: ZIEN 회사 홈페이지와 IoT 보안 진단 솔루션을 통합적으로 운영·유지보수하며, 인증서 자동화, 배포 환경 관리, CI/CD 체계 고도화를 수행한 프로젝트.

## 프로젝트 배경

- 회사 홍보 홈페이지, 관리자 시스템, IoT 보안 진단 솔루션이 각각 별도로 운영되고 있었음.
- 담당자가 바뀌면서 **배포 및 운영 효율성이 떨어지고, 새로운 기능을 개발할 때마다 사이드 이펙트가 발생하는 문제**가 지속됨.
- 기존 배포 환경은 수동 인증서 갱신과 불안정한 배포 프로세스로 운영 리스크 존재.
- **Z-IoT 보안 진단 솔루션은 주기적인 기능 개발과 패치가 필요하면서 동시에 안정적인 운영이 요구되었기 때문에, 사이드 이펙트가 발생하지 않도록 지속적인 유지보수가 필요했음.**
- 배포 및 테스트 과정에서 일관성을 확보하기 위해 **CI/CD 자동화 및 표준화된 테스트 환경**이 필수적이었음.

## 주요 기여

- **프론트엔드/UI 개선**: Next.js 기반 홈페이지 및 관리자 react-admin 기능 보완.
- **백엔드/서버 유지보수**: 기존 NestJS 서버 코드 분석 및 안정적 운영 지원.
- **운영 자동화**: 인증서 자동화 프로세스 구축(HTTPS 전환), Docker 기반 배포 안정화.
- **테스트 및 품질 보증**: Cypress 기반 E2E 테스트 작성, GitHub Actions와 연동한 CI/CD 자동화.
- **IoT 솔루션 안정화**: 기존 코드 리팩토링 및 일부 기능 추가를 통한 유지보수성 개선.

## 상세 내용

- **홈페이지 및 관리자 유지보수**
  - 홍보용 홈페이지의 UI 개선 및 콘텐츠 관리 기능 확장.
  - 관리자 시스템(react-admin)에서 사용자/공지 관리 기능 보완.
- **서버 및 배포 환경**
  - 기존 NestJS 서버 코드 분석 및 유지보수.
  - 인증서 자동화 프로세스 구축 및 HTTPS 환경 전환.
  - Docker Compose 기반 배포 환경 관리, AWS EC2에서 운영 안정화.
- **IoT 보안 솔루션**
  - 기존 코드 리팩토링을 통한 유지보수성 개선.
  - 일부 기능 추가 및 진단 결과 대시보드 가독성 개선.
- **CI/CD 및 테스트**
  - Cypress 기반 자동화 테스트 작성 → 주요 시나리오 검증.
  - GitHub Actions 파이프라인에 테스트를 통합하여 배포 안정성 확보.

```ts
// cypress/e2e/login.cy.ts
describe("로그인 기능", () => {
  it("올바른 계정으로 로그인 성공", () => {
    cy.visit("/login");
    cy.get("input[name=email]").type("test@example.com");
    cy.get("input[name=password]").type("password123");
    cy.contains("로그인").click();
    cy.url().should("include", "/dashboard");
  });
});
```

```yaml
# .github/workflows/e2e.yml
name: CI Pipeline
on:
  pull_request:
    branches: ["main"]
jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install dependencies
        run: npm ci
      - name: Run Cypress tests
        run: npm run cy:run
```

![Git actions](/images/zien-ops/action.png)

## 성과 및 배운 점

- **운영 안정화**: 인증서 자동화 및 Docker 기반 배포로 서비스 다운타임 최소화.
- **품질 보장**: CI/CD 파이프라인과 E2E 테스트 도입으로 배포 시 품질 신뢰성 확보.
- **지속 가능성 확보**: 기존 코드 분석과 유지보수를 통해 안정적인 장기 운영 기반 마련.
- **풀스택 운영 경험 강화**: 프론트엔드, 백엔드, 서버 인프라까지 아우르는 운영·유지보수 역량 확립.

# ZIEN Ops (홈페이지·IoT 보안 솔루션 운영 및 개선)

## 성과 및 배운 점

- **운영 안정화**: 인증서 자동화 및 Docker 기반 배포로 서비스 다운타임 최소화.
- **품질 보장**: CI/CD 파이프라인과 E2E 테스트 도입으로 배포 시 품질 신뢰성 확보.
- **지속 가능성 확보**: 기존 코드 분석과 유지보수를 통해 안정적인 장기 운영 기반 마련.
- **풀스택 운영 경험 강화**: 프론트엔드, 백엔드, 서버 인프라까지 아우르는 운영·유지보수 역량 확립.
