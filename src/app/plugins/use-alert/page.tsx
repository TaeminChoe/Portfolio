"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import stripIndent from "strip-indent";

import { useAlert } from "@/features/alerts";
import { ComponentItem } from "@/types";
import AlertButton from "@/features/alerts/components/AlertButton";
import IconChevron from "@/components/icons/IconChevron";
import ComponentCard from "@/components/common/ComponentCard";
import ComponentViewer from "@/components/common/ComponentViewer";

export default function Page() {
  const { openAlert, openConfirmAlert } = useAlert();
  const components = useMemo<ComponentItem[]>(
    () => [
      {
        name: "openAlert",
        summary: "간단한 메시지를 사용자에게 전달하는 1차 경고창 훅.",
        tags: ["hook", "alert", "modal"],
        sections: [
          {
            key: "core",
            title: "Core",
            summary: "기본 Alert 제어",
            Demo: () => (
              <AlertButton
                onClick={() => {
                  openAlert("기본 Alert 창입니다.", (res) => {
                    console.log(res);
                    // 확인 버튼 눌렀을 때 : OK
                    // 그 외 : undefined
                  });
                }}
              >
                click!
              </AlertButton>
            ),
            code: stripIndent(`
              <AlertButton
                onClick={() => {
                  openAlert("기본 Alert 창입니다.", (res) => {
                    console.log(res);
                    // 확인 버튼 눌렀을 때 : OK
                    // 그 외 : undefined
                  });
                }}
              >
                click!
              </AlertButton>
            `),
          },
        ],
      },
      {
        name: "openConfirmAlert",
        summary: "확인/취소 액션이 필요한 상황에서 사용자 선택을 받는 확인창 훅.",
        tags: ["hook", "alert", "modal"],
        sections: [
          {
            key: "core",
            title: "Core",
            summary: "기본 네/아니오 제어",
            Demo: () => (
              <AlertButton
                onClick={() => {
                  openConfirmAlert({ message: "Confirm 창입니다." }, (res) => {
                    console.log(res);
                    // 네 버튼 눌렀을 때 : OK
                    // 아니오 버튼 눌렀을 때 : NO
                    // 그 외 : undefined
                  });
                }}
              >
                click!
              </AlertButton>
            ),
            code: stripIndent(`
              <AlertButton
                onClick={() => {
                  openConfirmAlert({ message: "Confirm 창입니다." }, (res) => {
                    console.log(res);
                    // 네 버튼 눌렀을 때 : OK
                    // 아니오 버튼 눌렀을 때 : NO
                    // 그 외 : undefined
                  });
                }}
              >
                click!
              </AlertButton>
            `),
          },
          {
            key: "custom",
            title: "Custom button",
            summary: "네/아니오 버튼 커스텀 제어",
            Demo: () => (
              <AlertButton
                onClick={() => {
                  openConfirmAlert(
                    { message: "Confirm 창입니다.", yes: "YES~", no: "NO!!!" },
                    (res) => {
                      console.log(res);
                      // 네 버튼 눌렀을 때 : OK
                      // 아니오 버튼 눌렀을 때 : NO
                      // 그 외 : undefined
                    },
                  );
                }}
              >
                click!
              </AlertButton>
            ),
            code: stripIndent(`
              <AlertButton
                onClick={() => {
                  openConfirmAlert(
                    { message: "Confirm 창입니다.", yes: "YES~", no: "NO!!!" },
                    (res) => {
                      console.log(res);
                      // 네 버튼 눌렀을 때 : OK
                      // 아니오 버튼 눌렀을 때 : NO
                      // 그 외 : undefined
                    },
                  );
                }}
              >
                click!
              </AlertButton>
            `),
          },
        ],
      },
    ],
    [],
  );

  return (
    <main className="bg-background text-text min-h-dvh">
      <div className="mx-auto w-[1024px] max-w-[1024px] px-4 py-8 lg:px-6 lg:py-10">
        <header className="mb-6 lg:mb-8" aria-label="Plugins Header">
          <h1 className="text-title">useAlert</h1>
          <p className="text-description text-subtext mt-5">
            프로젝트에서 Alert/Confirm 모달을 간단하게 호출하고, 다양한 상황에 맞게 제어할 수 있도록
            제공되는 유틸리티입니다.
          </p>

          {/* 특징 리스트 */}
          <ul className="mt-4 list-inside list-disc space-y-2">
            <li className="text-body text-subtext">
              <span className="text-text font-medium">다중 모달 활용 가능</span> — 여러 개의
              Alert/Confirm 창을 동시에 띄워도 충돌 없이 관리할 수 있습니다.
            </li>
            <li className="text-body text-subtext">
              <span className="text-text font-medium">간단한 호출 방식</span> — openAlert,
              openConfirmAlert 함수를 호출해 tsx 트리에 직접 작성하지 않고도 모달을 띄울 수
              있습니다.
            </li>
            <li className="text-body text-subtext">
              <span className="text-text font-medium">유연한 onClose &amp; 분기 처리</span> —
              onClose 지원, Confirm 창은 네/아니오 선택에 따라 간단히 분기 제어가 가능합니다.
            </li>
          </ul>
        </header>

        <div className="grid grid-cols-1 gap-4 lg:gap-6">
          {components.map((component) => (
            <ComponentCard key={component.name} label={component.name} className="min-h-56">
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-body text-text font-semibold">{component.name}</h2>
                    <p className="text-description text-subtext mt-0.5">{component.summary}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {component.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border-border bg-primary/10 text-primary inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <ComponentViewer component={component} />
                {component.demoName && (
                  <Link
                    href={`/demo/${component.demoName}`}
                    className="text-description text-primary mt-2 inline-flex items-center gap-2"
                  >
                    <span>Open Demo</span>
                    <IconChevron className="h-4 w-4 rotate-270" />
                  </Link>
                )}
              </div>
            </ComponentCard>
          ))}
        </div>
      </div>
    </main>
  );
}
