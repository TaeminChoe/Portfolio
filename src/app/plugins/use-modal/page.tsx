"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";

import { ComponentItem } from "@/types";
import IconChevron from "@/components/icons/IconChevron";
import PluginViewer from "@/components/common/ComponentViewer";
import ComponentCard from "@/components/common/ComponentCard";

function DemoModalCore() {
  const [open, setOpen] = useState(false);
  return (
    <div className="text-body text-subtext">
      <button
        className="border-border bg-background focus:ring-primary/50 rounded-md border px-3 py-1 transition-colors transition-transform hover:-translate-y-0.5 hover:shadow-lg focus:ring-2 focus:outline-none"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="demo-modal"
      >
        Open Modal
      </button>
      {open && (
        <div
          id="demo-modal"
          role="dialog"
          aria-modal="true"
          className="border-border bg-surface mt-3 rounded-xl border p-3"
        >
          <div className="flex items-center justify-between">
            <p className="text-body text-text">Hello from Modal!</p>
            <button
              className="border-border bg-background text-description text-subtext focus:ring-primary/50 rounded-md border px-2 py-1 focus:ring-2 focus:outline-none"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function DemoModalExample() {
  const [step, setStep] = useState<"idle" | "confirm" | "done">("idle");
  return (
    <div className="text-body text-subtext">
      {step === "idle" && (
        <button
          className="border-border bg-background focus:ring-primary/50 rounded-md border px-3 py-1 transition-colors transition-transform hover:-translate-y-0.5 hover:shadow-lg focus:ring-2 focus:outline-none"
          onClick={() => setStep("confirm")}
        >
          Delete item
        </button>
      )}
      {step === "confirm" && (
        <div
          className="border-border bg-surface mt-3 rounded-xl border p-3"
          role="dialog"
          aria-modal="true"
        >
          <p className="text-body text-text">정말 삭제할까요?</p>
          <div className="mt-2 flex gap-2">
            <button
              className="border-border bg-background text-description rounded-md border px-2 py-1"
              onClick={() => setStep("idle")}
            >
              취소
            </button>
            <button
              className="border-primary bg-primary/10 text-description text-primary rounded-md border px-2 py-1"
              onClick={() => setStep("done")}
            >
              확인
            </button>
          </div>
        </div>
      )}
      {step === "done" && <p className="text-description text-accent mt-2">완료되었습니다.</p>}
    </div>
  );
}

const CODE_MODAL_CORE = `// useModal (core)
import { useState } from 'react';
export function useModal(){
  const [open, setOpen] = useState(false);
  return { open, openModal: () => setOpen(true), closeModal: () => setOpen(false) };
}`.trim();

const CODE_MODAL_EXAMPLE = `// confirm flow (example)
function useConfirm(){
  const [open, setOpen] = useState(false);
  const confirm = (cb: () => void) => { setOpen(true); /* on approve -> cb() */ };
  return { open, confirm, close: () => setOpen(false) };
}`.trim();

const COMPONENTS: ComponentItem[] = [
  {
    name: "useModal",
    summary: "모달 상태/제어 훅과 접근성 패턴. 코어/예시로 분리.",
    tags: ["hook", "modal", "a11y"],
    demoName: "use-modal",
    sections: [
      {
        key: "core",
        title: "Core",
        summary: "기본 open/close 제어",
        Demo: DemoModalCore,
        code: CODE_MODAL_CORE,
      },
      {
        key: "examples",
        title: "Examples",
        summary: "확인(Confirm) 패턴",
        Demo: DemoModalExample,
        code: CODE_MODAL_EXAMPLE,
      },
    ],
  },
];

export default function PluginsPage() {
  const components = useMemo(() => COMPONENTS, []);

  return (
    <main className="bg-background text-text min-h-dvh">
      <div className="mx-auto w-[1024px] max-w-[1024px] px-4 py-8 lg:px-6 lg:py-10">
        {/* hard-fixed overall width */}
        <header className="mb-6 lg:mb-8" aria-label="Plugins Header">
          <h1 className="text-title">useModal</h1>
          <p className="text-description text-subtext mt-1">
            플러그인의 미니 문서(Preview/Code)와 별도의 데모 라우트(/demo/[demoName])로 구성됩니다.
          </p>
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
                    {component.tags.map((t) => (
                      <span
                        key={t}
                        className="border-border bg-primary/10 text-primary inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <PluginViewer component={component} />
                <Link
                  href={`/demo/${component.demoName}`}
                  className="text-description text-primary mt-2 inline-flex items-center gap-2"
                >
                  <span>Open Demo</span>
                  <IconChevron className="h-4 w-4 rotate-270" />
                </Link>
              </div>
            </ComponentCard>
          ))}
        </div>
      </div>
    </main>
  );
}
