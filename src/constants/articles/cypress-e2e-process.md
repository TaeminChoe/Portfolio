# Cypress 기반 E2E 테스트와 GitHub Actions 자동화

## 개요

프로젝트 개발 과정에서 코드 안정성을 보장하기 위해 **E2E(End-to-End) 테스트**를 Cypress로 작성하고, 이를 **GitHub Actions**와 연동하여 `develop` 브랜치에 대한 Pull Request(PR) 작성 시 자동으로 실행되도록 구축하였습니다.  
이를 통해 팀 내 협업 시 코드 머지 전 단계에서 기능 정상 동작 여부를 사전에 검증할 수 있는 품질 게이트(Quality Gate)를 마련했습니다.

## 문제 상황

- 기존에는 로컬 환경에서만 테스트를 진행했기 때문에, 팀원 간 환경 차이나 누락으로 인해 기능 오류가 PR 이후 발견되는 경우가 있었습니다.
- 반복적인 수동 테스트는 리소스가 낭비될 뿐만 아니라, 중요한 버그가 발견되지 못한 채 넘어갈 가능성도 있었습니다.

## 해결 방법

1. **Cypress 도입**
   - 사용자 시나리오를 기반으로 라우팅 및 주요 기능 검증을 E2E 테스트로 작성했습니다.
   - 예: 로그인, 대시보드 진입, 주요 페이지 라우팅 정상 여부 확인.

```ts
// login.cy.ts
describe("로그인", () => {
  beforeEach(() => {
    cy.visitKo("/login");
  });

  it("1. 로그인 페이지 조회", () => {
    cy.contains("로그인");
  });

  it("2. 잘못된 계정 로그인", () => {
    const idInput = cy.get("input[name='username']");
    const pwInput = cy.get("input[name='password']");
    const loginButton = cy.get("form button[type='submit']");

    idInput.type("id");
    pwInput.type("pw");
    loginButton.click();
    cy.contains("로그인 실패");
  });

  it("3. 올바른 계정 로그인", () => {
    const username = Cypress.env("E2E_USERNAME");
    const password = Cypress.env("E2E_PASSWORD");

    const idInput = cy.get("input[name='username']");
    const pwInput = cy.get("input[name='password']");
    const loginButton = cy.get("form button[type='submit']");

    idInput.clear().type(username, { log: false });
    pwInput.clear().type(password, { log: false });
    loginButton.click();
    cy.url().should("include", "/dashboard");
  });
});
```

2. **GitHub Actions 연동**
   - PR 생성 시 워크플로우가 자동으로 실행되도록 트리거 설정.
   - `build → start → cypress run` 순서로 테스트가 진행되며, 실패할 경우 경고 메시지가 발생합니다.
   - 현재는 Git 규칙에 병합 차단까지는 걸려있지 않지만, 추후 **머지 차단 규칙과 연계**하여 품질 게이트로 발전시킬 수 있습니다.

```yml
name: E2E (build -> start -> test)

on:
  pull_request:
    branches: [develop]

concurrency:
  group: e2e-${{ github.head_ref }}
  cancel-in-progress: true

jobs:
  e2e:
    runs-on: ubuntu-latest
    timeout-minutes: 40

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "22"
          cache: "npm"

      - name: Install deps
        run: npm ci

      - name: Build (Next.js production)
        run: npm run build
        env:
          NEXT_PUBLIC_API_URL: ${{ vars.NEXT_PUBLIC_API_URL }}

      - name: Run E2E (npm run test:e2e)
        uses: cypress-io/github-action@v6
        with:
          install: false
          command: npm run test:e2e
        env:
          PORT: 3000
          NODE_ENV: production
          NEXT_PUBLIC_API_URL: ${{ vars.NEXT_PUBLIC_API_URL }}
          CYPRESS_E2E_USERNAME: ${{ secrets.CYPRESS_E2E_USERNAME }}
          CYPRESS_E2E_PASSWORD: ${{ secrets.CYPRESS_E2E_PASSWORD }}
      ...
```

3. **보안: 로그인 테스트의 환경변수 분리**
   - 로그인 테스트에 필요한 **ID/PW를 코드에 하드코딩하지 않고**, Cypress 환경변수 파일(`cypress.env.json`)과 GitHub Actions의 Secrets를 통해 관리했습니다.

```json
// cypress.env.json
{
  "E2E_USERNAME": "...",
  "E2E_PASSWORD": "..."
}
```

```ts
// login.cy.ts
  ...
  it("3. 올바른 계정 로그인", () => {
    const username = Cypress.env("E2E_USERNAME");
    const password = Cypress.env("E2E_PASSWORD");

    const idInput = cy.get("input[name='username']");
    const pwInput = cy.get("input[name='password']");
    const loginButton = cy.get("form button[type='submit']");

    idInput.clear().type(username, { log: false });
    pwInput.clear().type(password, { log: false });
    loginButton.click();
    cy.url().should("include", "/dashboard");
  });
  ...
```

## 자동화의 효과

- 인간의 실수 감소: 매 PR마다 동일한 시나리오로 자동 실행되므로, 테스트 누락/오류 가능성을 줄입니다.

- 일관된 퀄리티 유지: 항상 같은 기준(시나리오/환경/검증)으로 체크하여 코드 품질의 편차를 줄입니다.

- 회귀 버그 조기 탐지: 라우팅 누락, 환경변수 오류 등 변경에 따른 사이드이펙트를 PR 단계에서 차단합니다.

- 리뷰 효율 향상: 리뷰어는 테스트 결과를 믿고 로직/설계에 집중할 수 있습니다.

- 향후 발전 가능성: 현재는 경고만 표시되지만, Git 규칙과 연동해 PR 병합 차단까지 이어지도록 확장할 수 있습니다.

## 성과

- PR 단계에서 기능 오류를 사전에 발견하여, QA 및 운영 단계에서 발생할 수 있는 리스크를 줄였습니다.

- 팀원 누구나 동일한 테스트 기준으로 코드를 검증할 수 있게 되면서 협업 효율이 높아졌습니다.

- 실제 사례로, 라우팅 누락 문제와 환경 변수 설정 오류가 PR 단계에서 차단되어 운영 반영 전에 해결할 수 있었습니다.

## 배운 점

- 단순히 코드를 작성하는 것에서 그치지 않고, CI/CD 파이프라인과 품질 관리 프로세스에 직접 기여할 수 있다는 점을 경험했습니다.

- Cypress와 GitHub Actions의 결합은 비교적 간단히 구축할 수 있으면서도, 서비스 안정성 확보에 큰 효과를 가져온다는 것을 확인했습니다.

- 앞으로는 테스트 범위를 더 확장하고, 병렬 실행/캐시 최적화 등 성능 개선 방안도 적용해볼 계획입니다.
