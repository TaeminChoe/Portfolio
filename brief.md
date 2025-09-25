# 프로젝트 상세 내용 작성 요청 가이드

## 요청 방법

프로젝트 상세 내용을 작성해달라고 할 때는 **아래 데이터**를 함께 제공해주시면 됩니다.

1. **기본 정보**
   - 프로젝트명 / 제목
   - 기간
   - 역할
   - 회사명(있다면)

2. **Summary 데이터**
   - `summary` 또는 요약 설명
   - 사용 기술 스택(`techStack`)

3. **상세 데이터**
   - `description`: 프로젝트에 대한 간략 설명
   - `contributions`: 주요 기여 사항 (배열 형식이면 가장 좋음)

4. **작성 성격**
   - 신규 개발 / 마이그레이션 / 운영·유지보수 중 어떤 성격인지 알려주세요.
   - 운영 중심일 경우: 안정화, 자동화, CI/CD, 유지보수 관점 강조
   - 마이그레이션일 경우: 기술 전환 배경, 기존 문제점, 개선 포인트 강조

---

## 질문 예시

아래와 같이 질문하면 됩니다:

프로젝트 상세 내용을 작성해줘.

제목: ZIEN Ops (홈페이지·IoT 솔루션 운영 및 개선)
기간: 2024.10 ~ 현재
역할: Full-stack Engineer
summary: "ZIEN 홈페이지·Z-IoT 솔루션 운영 및 개선. Node 서버 및 인증서 자동화, CI/CD, 배포 환경 관리."
description: "홍보 웹사이트, 관리자 시스템, IoT 보안 진단 솔루션을 통합 관리하며 안정적 운영과 기능 개선 담당"
contributions:

Next.js 기반 UI 개선 및 관리자 react-admin 기능 보완

NestJS 서버 API 신규 기능 개발 및 수정

인증서 자동화 프로세스 구축 및 HTTPS 적용

Docker 기반 배포 환경 안정화

Cypress 기반 E2E 테스트 및 GitHub Actions 연동으로 CI/CD 품질 보장
techStack: ["Next.js", "TypeScript", "NestJS", "React-admin", "TailwindCSS", "Docker", "Cypress", "GitHub Actions"]
작성 성격: 운영·유지보수 중심

---

## 결과

제가 위 데이터를 기반으로, 포트폴리오에 바로 넣을 수 있는 `.md` 형식 문서를  
아래 구조에 맞게 작성해드립니다:

- 개요
- 프로젝트 배경
- 주요 기여
- 상세 내용
- 성과 및 배운 점
