/** "2025.02 ~ 2025.03" | "2024.10 ~ 현재" | "2022.01 ~ 2022.06" 등에서 시작일을 Date로 파싱 */
export function parseStart(period: string): Date {
  // 앞쪽 YYYY.MM만 파싱
  const m = period.match(/(\d{4})\.(\d{2})/);
  if (!m) return new Date(0);
  const year = Number(m[1]);
  const month = Number(m[2]) - 1; // 0-based
  return new Date(year, month, 1);
}

export function cx(...cls: (string | false | null | undefined)[]) {
  return cls.filter(Boolean).join(" ");
}

export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${y}.${m}.${d}`; // 2025.09.16
}
