# Z-ONE 보안 컨설팅 솔루션 (마이그레이션 & 고도화)

## 개요

- **기간**: 2024.11 ~ 2025.10(예정)
- **역할**: PM / Full-stack Engineer
- **기술 스택**: Next.js, TypeScript, TailwindCSS, Django, Figma, GCP, Docker
- **요약**: Vue/Spring 기반 특정 고객사 전용 솔루션을 Next.js/Django로 전환하고, 범용성을 강화하기 위한 신규 기능 및 디자인 시스템을 구축한 프로젝트

## 프로젝트 배경

- 기존 솔루션은 특정 고객사 전용으로 구축되어 있어, 다른 기업에서 활용하기 어려운 구조와 API 의존성이 존재함
- 유지보수 편의성과 확장성을 위해 **Spring → Django**, **Vue.js → Next.js**로 전환 필요

![Z-ONE 마이그레이션](/images/z-one/migration.png)

- 단순 마이그레이션을 넘어 **범용적 활용이 가능한 고도화된 시스템**으로 발전시키기 위한 페이즈 진행

## 주요 기여

- 프로젝트 매니저(PM)로서 일정 관리, 프리랜서 백엔드 개발 관리, 기획/디자인 의사결정 참여
- 프론트엔드 마이그레이션 (Vue → Next.js) 및 신규 기능 개발
- 디자인 시스템 외부 의뢰 및 내부 Figma 설계 확장
- POC 환경 배포 (GCP VM 컨테이너 기반) 구축

## 상세 내용

### 1. 기획/디자인

- 기존 고객사 중심의 워크플로우를 범용화할 수 있도록 신규 기능 기획
- **디자인 시스템 개발을 외부 디자이너에 의뢰**하고, 산출물을 기반으로 모든 주요 페이지·모달·컴포넌트를 직접 Figma에서 설계
- UI/UX 일관성을 확보하기 위해 컴포넌트 단위의 설계 기준 수립

![Z-ONE Figma 디자인 시스템](/images/z-one/figma01.png)
![Z-ONE Figma 캡쳐](/images/z-one/figma02.png)

### 2. 프론트엔드 개발

- Vue.js 기반 코드를 **Next.js + TypeScript**로 재구현
- **프로젝트 구조 설계**: pages/app router 구조 정의, feature 단위 폴더링, ESLint/Prettier/Tailwind config 정비

```
project-root
├── .vscode
├── .prettierrc
├── .eslint.config.mjs
├── ...
├── docker
│   └── dev
├── public
└── src
    ├── api
    ├── app
    │   ├── (auth)
    │   │   ├── login
    │   │   └── signup
    │   └── (with-layout)
    │       ├── asset
    │       │   └── [idx]
    │       ├── home
    │       ├── inspection
    │       │   ├── cloud
    │       │   ├── infra
    │       │   └── pentest
    │       ├── inspection-guide
    │       ├── not-found
    │       ├── report
    │       └── vuln
    ├── constants
    ├── contexts
    ├── css
    ├── features
    │   ├── mails
    │   ├── material-react-table
    │   └── react-hook-form
    ├── hooks
    ├── types
    ├── ui
    │   ├── datepicker
    │   ├── icons
    │   ├── layout
    │   ├── primitive
    │   └── modals
    └── utils

```

- **컴포넌트 모듈 설계**: 공통 UI(모달, 테이블, 폼) 컴포넌트를 모듈화해 재사용성 강화
- TailwindCSS를 활용해 빠른 퍼블리싱 및 디자인 시스템과 연계

```ts
// tailwind.config.ts
const typographyRoles = {
  title: { fontSize: "32px", fontWeight: "700" },
  menu: { fontSize: "15px", fontWeight: "700" },
  "sub-menu": { fontSize: "15px", fontWeight: "500" },
  "section-title": { fontSize: "18px", fontWeight: "700" },
  header: { fontSize: "15px", fontWeight: "700" },
  filter: { fontSize: "15px", fontWeight: "600", color: "#555555" },
  label: { fontSize: "15px", fontWeight: "500", color: "#333333" },
  value: { fontSize: "15px", fontWeight: "400", color: "#777777" },
  "error-description": {
    fontSize: "13px",
    fontWeight: "400",
    color: "#FF4B30",
  },
  description: { fontSize: "13px", fontWeight: "400", color: "#555555" },
};

export default {
  mode: "jit", // JIT 모드 활성화
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"], // 파일 경로 추가
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "slide-down": "slide-down 0.3s ease-out",
      },
      colors: {
        primary: "#5454BC",
        accent: "#00D8DA",
        alert: "#FF8800",
        error: "#FF4B30",
        text: "#333333",
        background: "#F4F5F7", //
        green: "#48BB78",
        ...
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    ...
  ],
} satisfies Config;
```

### 3. 백엔드/배포

- Django 백엔드 개발을 프리랜서와 협업 → API 연동/테스트 및 일정 관리 총괄
- **POC 환경을 GCP VM + Docker 컨테이너 기반**으로 구성, 개발기 수준에서 안정적인 배포 테스트 가능

<img src="/images/z-one/gcp_model.png" width="500" height="200"/>

- 추후 다수 고객사 대상 홍보를 위한 **배포 및 안정성 테스트 진행 예정**

### 4. 문제 해결

- **도메인/API 종속성 제거**: 특정 고객사에 묶인 기능을 분리하고 범용 구조로 리팩토링  
  Before
  [Vue.js FE] ---> [Spring BE] ---> [고객사 전용 API/도메인]

After
[Next.js FE] ---> [Django BE] ---> [범용 API] ---> [GCP VM (POC 배포)]

- **프론트/백 협업**: Django 백엔드와 Next.js 프론트를 분리 개발하면서 인터페이스 명세를 정의해 충돌 최소화
- **디자인 리소스 부족 문제**: 외부 의뢰 + 내부 Figma 직접 설계로 보완

## 성과 및 배운 점

- 단순 기술 전환이 아닌 **범용 솔루션화**로 확장 가능성을 확보
- **PM 경험**을 통해 일정 관리, 외부 리소스(디자인·백엔드 프리랜서) 관리 능력 강화
- 프론트엔드·백엔드·배포·디자인까지 아우르는 **풀 프로세스 경험** 축적
- 차후 다수 고객사에 적용 가능한 **Z-ONE 2.0** 기반 마련
