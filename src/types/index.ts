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
