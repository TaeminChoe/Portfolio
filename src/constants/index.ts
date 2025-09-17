import { ArticleItem, ProjectItem, PulginItem, RouteItem } from "@/types";

export const ROUTES: RouteItem[] = [
  { url: "/", name: "Dashboard" },
  { url: "/career", name: "Career" },
  { url: "/projects", name: "Projects" },
  { url: "/plugins", name: "Plugins" },
  { url: "/articles", name: "Articles" },
];

export const EXTERNAL_LINKS: RouteItem[] = [
  { url: "https://github.com/tmchoi-zien/portfolio", name: "GitHub" },
];

export const ARTICLES: ArticleItem[] = [
  {
    href: "cypress-e2e-process",
    title: "Cypress 기반 E2E 테스트와 GitHub Actions 자동화",
    date: "2025-09-16",
    summary:
      "Cypress와 GitHub Actions를 활용하여 로그인 보안 환경변수, 자동화된 E2E 테스트, 경고 기반 품질 게이트를 적용한 사례. 배포 전 테스트를 통해 사람의 실수를 줄이고, 항상 동일한 퀄리티를 유지할 수 있도록 개선한 과정을 다룹니다.",
    tags: ["Next.js", "Cypress", "CI/CD", "GitHub Actions"],
    readingTime: "5 min read",
    status: "published",
  },
  // 앞으로 여기에 새로운 article들을 계속 추가
  // {
  //   href: slug값이며 맵핑을 위해 같은 이름의 .md파일이 필요
  //   title: "다른 아티클 제목",
  //   date: "YYYY-MM-DD",
  //   summary: "짧은 설명...",
  //   tags: ["태그1", "태그2"],
  //   readingTime: "X min read",
  //   status: "draft" | "published",
  // },
];

export const PLUGINS: PulginItem[] = [
  {
    href: "use-alert",
    name: "useAlert",
    summary: "일반적으로 사용되는 Alert을 코드로 표출할 수 있는 구조로 작성한 Context모델",
    tags: ["ui", "alert"],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    href: "z-red",
    name: "Z‑RED",
    role: "Frontend Engineer",
    period: "2025.03–",
    summary: "RED 3.3 / EN 303 645 체크리스트 기반 내부 솔루션 (다국어·권한·SMTP 프로파일).",
    tags: ["Next.js", "Django", "i18next", "Email"],
    status: "published",
  },
  {
    href: "z-iot",
    name: "Z‑IoT",
    role: "Frontend Engineer",
    period: "2024.01–2025.06",
    summary: "IoT 펌웨어 분석 결과 대시보드 / 리포트 자동화 / 멀티 테넌트.",
    tags: ["Next.js", "Tailwind", "Django", "PostgreSQL", "Report/PDF"],
    status: "published",
  },
  {
    href: "z-one",
    name: "Z‑ONE 2.0",
    role: "Frontend Engineer",
    period: "2025.02–",
    summary: "멀티 테넌트 보안 플랫폼, 라우팅 E2E 검증·역할 기반 UX.",
    tags: ["Next.js", "Docker", "Cypress", "RBAC"],
    status: "published",
  },
];
