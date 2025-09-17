export interface RouteItem {
  url: string; // 이동할 경로
  name: string; // 메뉴에 표시될 이름
}

export interface CareerItem {
  id: number;
  title: string;
  period: string; // "YYYY.MM ~ YYYY.MM" | "YYYY.MM ~ 현재"
  company: string;
  type: string; // "유지보수" | "상용 개발" | "MVP" | ...
  description: string;
  role: string;
  contributions: string[];
  techStack: string[];
}

export interface ArticleItem {
  href: string;
  title: string;
  date: string; // '2025-08-21'
  summary: string;
  tags: string[]; // keywords
  readingTime: string; // '6 min read'
  status?: "published" | "draft";
}

export interface PulginItem {
  href: string;
  name: string;
  summary: string;
  tags: string[];
  demoName: string;
}

export interface ComponentSection {
  key: string;
  title: string;
  summary?: string;
  Demo: React.ComponentType; // inline demo component
  code: string;
}

export interface ComponentItem {
  name: string;
  summary: string;
  tags: string[]; // keywords
  demoName: string; // maps to /demo/[demoName]
  sections: ComponentSection[];
}

export interface ProjectItem {
  href: string; // URL slug -> /project/[slug]
  name: string;
  role: string; // e.g., FE Engineer
  period: string; // e.g., 2024.01–2025.06
  summary: string;
  tags: string[]; // keywords
  status?: "published" | "draft";
}
