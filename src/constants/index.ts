import { ArticleItem, PulginItem, RouteItem, SkillItem } from "@/types";

export const ROUTES: RouteItem[] = [
  { url: "/", name: "Dashboard" },
  { url: "/career", name: "Career" },
  { url: "/projects", name: "Projects" },
  // { url: "/plugins", name: "Plugins" },
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
export const PROJECTS = [
  {
    href: "z-one",
    name: "Z-ONE",
    role: "PM / Full-stack Engineer",
    period: "2024.11–2025.10(예정)",
    summary:
      "보안 컨설팅 솔루션 마이그레이션 및 고도화 시리즈. Vue/Spring → Next.js/Django 전환, 신규 기능 기획·POC·디자인 시스템 구축.",
    tags: ["Next.js", "Django", "TypeScript", "TailwindCSS", "Figma", "GCP", "Docker"],
    status: "published",
  },
  {
    href: "zien-ops",
    name: "ZIEN Ops",
    role: "Full-stack Engineer",
    period: "2024.10–현재",
    summary:
      "ZIEN 홈페이지·Z-IoT 솔루션 운영 및 개선. Node 서버 및 인증서 자동화, CI/CD, 배포 환경 관리.",
    tags: ["Next.js", "NestJS", "Node.js", "Docker", "Cypress", "GitHub Actions", "AWS EC2"],
    status: "published",
  },
  {
    href: "z-red",
    name: "Z-RED",
    role: "Frontend Engineer",
    period: "2025.06–2025.07",
    summary: "유럽 RED 규제 대응 자가진단 설문 웹앱. 반응형 설계 및 MOU 체결 성과 기여.",
    tags: ["Next.js", "TypeScript", "TailwindCSS"],
    status: "published",
  },
  {
    href: "z-sentinel",
    name: "Z-Sentinel",
    role: "Frontend Engineer",
    period: "2025.02–2025.03",
    summary:
      "SECON 2025 출품용 네트워크 취약점 분석 솔루션 MVP. Topology 시각화 및 대용량 렌더링 성능 검증.",
    tags: ["Next.js", "TypeScript", "TailwindCSS", "Amplify", "WebGL"],
    status: "published",
  },
  {
    href: "sk-smartlink",
    name: "SK Smartlink",
    role: "Frontend Engineer",
    period: "2022.11–2023.06",
    summary:
      "차량 카셰어링 사용자 웹앱. 기존 3개 앱을 통합하고 예약·변경 등 핵심 기능 개발, GraphQL 기반 API 연동 경험.",
    tags: ["React", "Redux", "GraphQL", "Apollo"],
    status: "published",
  },
];

export const SKILLS: Record<string, SkillItem[]> = {
  Front: [
    { name: "React", level: "High" },
    { name: "Next.js", level: "High" },
    { name: "TypeScript", level: "High" },
    { name: "TailwindCSS", level: "High" },
    { name: "React Query", level: "Medium" },
  ],
  Util: [
    { name: "Figma", level: "Medium" },
    { name: "Git/GitHub", level: "Medium" },
    { name: "Cypress", level: "Medium" },
    { name: "i18next", level: "Medium" },
  ],
  Devops: [
    { name: "AWS (EC2, Route53)", level: "Low" },
    { name: "Docker", level: "Medium" },
    { name: "CI/CD (GitHub Actions)", level: "Medium" },
    { name: "PostgreSQL", level: "Low" },
  ],
};
