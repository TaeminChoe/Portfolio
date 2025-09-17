---
title: "대규모 IoT 취약점 시각화 솔루션"
role: "Frontend Engineer"
period: "2024.01–2025.06"
date: "2025-06-30"
tags: ["Next.js", "Tailwind", "Cypress", "PDF"]
status: "published"
summary: "멀티 테넌트·권한 기반 뷰와 표준 리포트 파이프라인으로 리포팅 효율을 극대화."
---

## Context

대규모 IoT 자산의 취약점 분석 결과를 시각화하는 내부 솔루션.  
멀티 테넌트, 권한 기반 뷰, 리포트 자동화가 핵심 요구사항.

## Problem → Solution → Result

- **Problem.** 리포트 생성 플로우가 길고, 일관성 유지가 어려움.
- **Solution.** 표준 리포트 컴포넌트/템플릿 + PDF 파이프라인 구축.
- **Result.** 생성 단계 7→4로 간소화, 회귀 이슈 감소(정량값 비공개).

## My Responsibilities

- Next.js(App Router) 기반 대시보드/리포트 UI 설계 및 구현
- 공통 컴포넌트화(모달/테이블/배지) & 접근성/성능 가이드 수립
- Cypress E2E 라우팅 검증 파이프라인 도입

## Architecture

```text
[Client] Next.js(App) → [API] Gateway → [Service] Django → [DB] PostgreSQL
(다국어, 멀티 테넌트, 권한/역할 기반 뷰)
```
