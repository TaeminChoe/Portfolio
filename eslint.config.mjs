import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

// 메인 설정을 변수에 담고 export (import/no-anonymous-default-export 방지)
const config = [
  // 무시 경로
  { ignores: ["node_modules", ".next", "dist"] },

  // JS 권장 규칙(Flat)
  js.configs.recommended,

  // 레거시 확장들 Flat 호환으로 가져오기
  ...compat.extends(
    "next/core-web-vitals", // next + react + jsx-a11y + react-hooks
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended", // prettier 연동 (충돌 규칙 off + 'prettier/prettier' on)
  ),

  // 공통 규칙(개발 편의 위주로 off/완화)
  {
    rules: {
      // React/Next 편의
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/prop-types": "off",
      "react/display-name": "off",
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "off",
      "@next/next/no-html-link-for-pages": "off",

      // TS 편의
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/ban-ts-comment": ["warn", { "ts-ignore": "allow-with-description" }],

      // 일반
      "no-undef": "off",
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",

      // 🔧 prettier를 ESLint에서 명시적으로 고정(싱글쿼트 등)
      // .prettierrc를 못 읽는 환경에서도 일관 유지
      "prettier/prettier": [
        "error",
        {
          singleQuote: false,
          semi: true,
          trailingComma: "all",
          tabWidth: 2,
          printWidth: 100,
        },
      ],
    },
  },

  // 파일별 override
  {
    files: ["eslint.config.mjs"],
    rules: {
      // 이 파일에서만 익명 default export 경고 비활성
      "import/no-anonymous-default-export": "off",
    },
  },
  {
    files: ["next-env.d.ts"],
    rules: {
      // Next가 생성하는 triple-slash reference 경고 끄기
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
];

export default config;
