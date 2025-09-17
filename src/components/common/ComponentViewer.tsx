import { useState } from "react";

import { cx } from "@/utils";
import { ComponentItem } from "@/types";
import IconPlay from "../icons/IconPlay";
import IconCode from "../icons/IconCode";
import CodeBlock from "./CodeBlock";

export default function ComponentViewer({ component }: { component: ComponentItem }) {
  const [sectionKey, setSectionKey] = useState(component.sections[0]?.key ?? "");
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const current = component.sections.find((s) => s.key === sectionKey) ?? component.sections[0];
  const Demo = current.Demo || <></>;

  return (
    <div className="border-border bg-background/40 rounded-xl border">
      {/* Section Tabs */}
      <div className="border-border flex flex-wrap items-center justify-between gap-2 border-b px-3 py-2">
        <div className="flex flex-wrap items-center gap-2">
          {component.sections.map((s) => (
            <button
              key={s.key}
              type="button"
              className={cx(
                "cursor-pointer rounded-full border px-3 py-1 text-xs",
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
              "text-description cursor-pointer rounded-md px-2 py-1",
              tab === "preview" ? "text-text border-border bg-background border" : "text-subtext",
            )}
            aria-pressed={tab === "preview"}
            onClick={() => setTab("preview")}
          >
            <span className="inline-flex items-center gap-1">
              <IconPlay /> Preview
            </span>
          </button>
          <button
            type="button"
            className={cx(
              "text-description cursor-pointer rounded-md px-2 py-1",
              tab === "code" ? "text-text border-border bg-background border" : "text-subtext",
            )}
            aria-pressed={tab === "code"}
            onClick={() => setTab("code")}
          >
            <span className="inline-flex items-center gap-1">
              <IconCode /> Code
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
          <CodeBlock code={current.code} language="ts" />
        )}
        {current.summary && <p className="text-description text-subtext mt-2">{current.summary}</p>}
      </div>
    </div>
  );
}
