// ZIEN Dark Theme v1.0.0 — Plugins Gallery & Demo (Fixed 1024px width + Demo routing)
// Date: 2025-09-16
// Status: Draft (plugins → sections → preview/code) + demo pages at /demo/[demoName]
//
// File path proposal
// - app/(me)/plugins/page.tsx                    // Gallery with nested sections & links to demo
// - app/demo/[demoName]/page.tsx                 // Standalone demo usage page (see templates at bottom)
// - app/(me)/plugins/_data/plugins.ts            // (optional) move registry here
// - app/(me)/plugins/[slug]/[section]/page.tsx   // (optional) deep link to specific section of plugin
//
"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";

// ──────────────────────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────────────────────

type PluginSection = {
  key: string; // url-safe id (e.g., 'core', 'examples')
  title: string; // display title
  summary?: string; // short line
  Demo: React.ComponentType; // inline demo component
  code: string; // source string
};

type PluginMeta = {
  slug: string; // id for plugin
  name: string; // display name
  summary: string; // short description
  tags: string[]; // tokens only
  demoName: string; // maps to /demo/[demoName]
  sections: PluginSection[]; // one more depth
};

// ──────────────────────────────────────────────────────────────────────────────
// Mock Demos
// ──────────────────────────────────────────────────────────────────────────────

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

function DemoBadgeToken() {
  return (
    <div className="flex flex-wrap gap-2">
      {["info", "success", "warning"].map((t) => (
        <span
          key={t}
          className="border-border bg-primary/10 text-primary inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

const CODE_BADGE_TOKEN = `// <Badge /> token-only
export function Badge({ children }){
  return <span className=\"inline-flex items-center gap-1 rounded-full border border-border bg-primary/10 px-2 py-0.5 text-xs text-primary\">{children}</span>;
}`.trim();

// ──────────────────────────────────────────────────────────────────────────────
// Registry with one more depth & demoName mapping
// ──────────────────────────────────────────────────────────────────────────────

const PLUGINS: PluginMeta[] = [
  {
    slug: "use-modal",
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
  {
    slug: "badge",
    name: "Badge",
    summary: "토큰만 사용하는 배지 컴포넌트.",
    tags: ["ui", "token"],
    demoName: "badge",
    sections: [
      {
        key: "token",
        title: "Token-only",
        summary: "primary/보더만",
        Demo: DemoBadgeToken,
        code: CODE_BADGE_TOKEN,
      },
    ],
  },
];

// ──────────────────────────────────────────────────────────────────────────────
// Primitives
// ──────────────────────────────────────────────────────────────────────────────

function cx(...cls: (string | false | null | undefined)[]) {
  return cls.filter(Boolean).join(" ");
}

function Card(
  props: React.PropsWithChildren<{ className?: string; ariaLabel?: string; href?: string }>,
) {
  const Wrapper = props.href ? Link : "section";
  return (
    // @ts-ignore — Link vs section share common props used here.
    <Wrapper
      aria-label={props.ariaLabel}
      href={props.href as any}
      className={cx(
        // Fixed page width container handles overall size; card stretches full width
        "bg-surface border-border block w-full rounded-2xl border p-5 lg:p-6",
        "transition-colors transition-transform hover:-translate-y-0.5 hover:shadow-lg",
        props.className,
      )}
    >
      {props.children}
    </Wrapper>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-section text-text mb-3 lg:mb-4">{children}</h2>;
}

function Icon({ name, className }: { name: "code" | "play" | "arrow"; className?: string }) {
  if (name === "code")
    return (
      <svg
        className={className}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path d="M9 18l-6-6 6-6" stroke="currentColor" />
        <path d="M15 6l6 6-6 6" stroke="currentColor" />
      </svg>
    );
  if (name === "play")
    return (
      <svg
        className={className}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path d="M8 5v14l11-7z" stroke="currentColor" />
      </svg>
    );
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M9 5l7 7-7 7" stroke="currentColor" />
    </svg>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Viewer (Plugin → Section → Tab[Preview|Code])
// ──────────────────────────────────────────────────────────────────────────────

function PluginViewer({ plugin }: { plugin: PluginMeta }) {
  const [sectionKey, setSectionKey] = useState(plugin.sections[0]?.key ?? "");
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const current = plugin.sections.find((s) => s.key === sectionKey) ?? plugin.sections[0];
  const Demo = current.Demo;

  return (
    <div className="border-border bg-background/40 rounded-xl border">
      {/* Section Tabs */}
      <div className="border-border flex flex-wrap items-center justify-between gap-2 border-b px-3 py-2">
        <div className="flex flex-wrap items-center gap-2">
          {plugin.sections.map((s) => (
            <button
              key={s.key}
              type="button"
              className={cx(
                "rounded-full border px-3 py-1 text-xs",
                sectionKey === s.key
                  ? "text-text bg-background border-border"
                  : "text-subtext border-border/60",
              )}
              aria-pressed={sectionKey === s.key}
              onClick={() => setSectionKey(s.key)}
            >
              {s.title}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={cx(
              "text-description rounded-md px-2 py-1",
              tab === "preview" ? "text-text border-border bg-background border" : "text-subtext",
            )}
            aria-pressed={tab === "preview"}
            onClick={() => setTab("preview")}
          >
            <span className="inline-flex items-center gap-1">
              <Icon name="play" /> Preview
            </span>
          </button>
          <button
            type="button"
            className={cx(
              "text-description rounded-md px-2 py-1",
              tab === "code" ? "text-text border-border bg-background border" : "text-subtext",
            )}
            aria-pressed={tab === "code"}
            onClick={() => setTab("code")}
          >
            <span className="inline-flex items-center gap-1">
              <Icon name="code" /> Code
            </span>
          </button>
        </div>
      </div>

      {/* Content area with stable heights */}
      <div className="p-3">
        {tab === "preview" ? (
          <div className="text-body text-subtext min-h-28">
            <Demo />
          </div>
        ) : (
          <pre className="text-code text-subtext max-h-64 overflow-auto break-words whitespace-pre-wrap">
            {current.code}
          </pre>
        )}
        {current.summary && <p className="text-description text-subtext mt-2">{current.summary}</p>}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Page (Fixed 1024px container width)
// ──────────────────────────────────────────────────────────────────────────────

export default function PluginsPage() {
  const plugins = useMemo(() => PLUGINS, []);
  return (
    <main className="bg-background text-text min-h-dvh">
      <div className="mx-auto w-[1024px] max-w-[1024px] px-4 py-8 lg:px-6 lg:py-10">
        {/* hard-fixed overall width */}
        <header className="mb-6 lg:mb-8" aria-label="Plugins Header">
          <h1 className="text-title">Plugins</h1>
          <p className="text-description text-subtext mt-1">
            플러그인의 미니 문서(Preview/Code)와 별도의 데모 라우트(/demo/[demoName])로 구성됩니다.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 lg:gap-6">
          {plugins.map((p) => (
            <Card key={p.slug} ariaLabel={p.name} className="min-h-56">
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-body text-text font-semibold">{p.name}</h2>
                    <p className="text-description text-subtext mt-0.5">{p.summary}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="border-border bg-primary/10 text-primary inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <PluginViewer plugin={p} />
                <Link
                  href={`/demo/${p.demoName}`}
                  className="text-description text-primary mt-2 inline-flex items-center gap-2"
                >
                  <span>Open Demo</span>
                  <Icon name="arrow" />
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <footer className="text-description text-subtext mt-8" aria-label="Footer">
          <p>Built with Next.js(App Router) + TypeScript + Tailwind — ZIEN Dark Theme v1.0.0</p>
        </footer>
      </div>
    </main>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Demo Page Templates (paste into separate files)
// ──────────────────────────────────────────────────────────────────────────────

/*
// app/demo/use-modal/page.tsx
export default function UseModalDemoPage(){
  return (
    <main className="bg-background min-h-dvh text-text">
      <div className="mx-auto w-[1024px] max-w-[1024px] px-4 lg:px-6 py-8 lg:py-10">
        <h1 className="text-title">Demo — useModal</h1>
        <p className="text-description text-subtext mt-1">플러그인을 실제 화면 플로우에 적용한 예시입니다.</p>
        <section className="mt-4 rounded-2xl border border-border bg-surface p-5">
          <h2 className="text-section text-text mb-3">Basic</h2>
          <DemoBasic />
        </section>
        <section className="mt-4 rounded-2xl border border-border bg-surface p-5">
          <h2 className="text-section text-text mb-3">Confirm Flow</h2>
          <DemoConfirm />
        </section>
      </div>
    </main>
  );
}

// NOTE: You can inline small demo components here or import from shared lib.
function DemoBasic(){
  const [open, setOpen] = React.useState(false);
  return (
    <div className="text-body text-subtext">
      <button className="rounded-md border border-border bg-background px-3 py-1" onClick={() => setOpen(true)}>Open</button>
      {open && (
        <div className="mt-3 rounded-xl border border-border bg-surface p-3" role="dialog" aria-modal="true">
          <div className="flex items-center justify-between">
            <span className="text-body text-text">Modal content</span>
            <button className="rounded-md border border-border bg-background px-2 py-1" onClick={() => setOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

function DemoConfirm(){
  const [step, setStep] = React.useState<'idle'|'confirm'|'done'>('idle');
  return (
    <div className="text-body text-subtext">
      {step==='idle' && <button className="rounded-md border border-border bg-background px-3 py-1" onClick={() => setStep('confirm')}>Delete</button>}
      {step==='confirm' && (
        <div className="mt-3 rounded-xl border border-border bg-surface p-3" role="dialog" aria-modal="true">
          <p className="text-body text-text">확인하세요.</p>
          <div className="mt-2 flex gap-2">
            <button className="rounded-md border border-border bg-background px-2 py-1" onClick={() => setStep('idle')}>취소</button>
            <button className="rounded-md border border-primary bg-primary/10 px-2 py-1 text-primary" onClick={() => setStep('done')}>확인</button>
          </div>
        </div>
      )}
      {step==='done' && <p className="mt-2 text-description text-accent">완료</p>}
    </div>
  );
}
*/
