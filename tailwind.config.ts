import typography from "@tailwindcss/typography";
import plugin from "tailwindcss/plugin";

const config = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./pages/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f172a",
        surface: "#111827",
        text: "#e2e8f0",
        subtext: "#94a3b8",
        primary: "#38bdf8",
        accent: "#a78bfa",
        border: "#1f2937",
      },
      // next/font로 주입한 CSS 변수를 사용
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-noto-kr)", "system-ui", "sans-serif"],
        mono: [
          "var(--font-jetbrains)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
    },
  },
  plugins: [
    // 의미 기반 타이포(모바일 기본 → lg에서 자동 확대)
    plugin(function ({ addBase, theme }) {
      const mono = theme("fontFamily.mono");

      // Tailwind의 기본 사이즈 토큰을 재사용
      const titleSm = theme("fontSize.2xl");
      const titleLg = theme("fontSize.5xl");
      const sectionSm = theme("fontSize.xl");
      const sectionLg = theme("fontSize.3xl");
      const bodySm = theme("fontSize.sm");
      const bodyLg = theme("fontSize.base");
      const descSm = theme("fontSize.xs");
      const descLg = theme("fontSize.sm");
      const codeSm = theme("fontSize.sm");
      const codeLg = theme("fontSize.base");

      const lg = theme("screens.lg"); // 예: "1024px"

      // 1) 기본(모바일)
      addBase({
        ".text-title": {
          fontSize: titleSm[0],
          lineHeight: titleSm[1].lineHeight,
          fontWeight: "700",
        },
        ".text-section": {
          fontSize: sectionSm[0],
          lineHeight: sectionSm[1].lineHeight,
          fontWeight: "600",
        },
        ".text-body": {
          fontSize: bodySm[0],
          lineHeight: bodySm[1].lineHeight,
          fontWeight: "400",
        },
        ".text-description": {
          fontSize: descSm[0],
          lineHeight: descSm[1].lineHeight,
          fontWeight: "400",
        },
        ".text-code": {
          fontSize: codeSm[0],
          lineHeight: codeSm[1].lineHeight,
          fontWeight: "400",
          fontFamily: mono,
        },
      });

      // 2) 데스크탑(뷰포트 ≥ lg) — @screen 대신 명시적 미디어쿼리
      addBase({
        [`@media (min-width: ${lg})`]: {
          ".text-title": {
            fontSize: titleLg[0],
            lineHeight: titleLg[1].lineHeight,
          },
          ".text-section": {
            fontSize: sectionLg[0],
            lineHeight: sectionLg[1].lineHeight,
          },
          ".text-body": {
            fontSize: bodyLg[0],
            lineHeight: bodyLg[1].lineHeight,
          },
          ".text-description": {
            fontSize: descLg[0],
            lineHeight: descLg[1].lineHeight,
          },
          ".text-code": {
            fontSize: codeLg[0],
            lineHeight: codeLg[1].lineHeight,
          },
        },
      });
    }),
    typography,
  ],
};

export default config;
