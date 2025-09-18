"use client";

import React, { useMemo } from "react";
import stripIndent from "strip-indent";
import hljs from "highlight.js/lib/core";
import ts from "highlight.js/lib/languages/typescript";
import js from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import bash from "highlight.js/lib/languages/bash";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
// GitHub Dark 테마 (요구사항)
import "highlight.js/styles/github-dark.css";

hljs.registerLanguage("typescript", ts);
hljs.registerLanguage("javascript", js);
hljs.registerLanguage("json", json);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("css", css);

type CodeBlockProps = {
  code: string;
  language?: "tsx" | "ts" | "js" | "json" | "bash" | "html" | "xml" | "css";
  className?: string;
};

function normalize(code: string) {
  // 1) 앞뒤 공백 줄 제거
  const trimmedEdges = code.replace(/^\s*\n/, "").replace(/\n\s*$/, "");
  // 2) 공통 들여쓰기 제거
  const dedented = stripIndent(trimmedEdges);
  // 3) 마지막 안전 trim
  return dedented.trimEnd();
}

export default function CodeBlock({ code, language = "ts", className }: CodeBlockProps) {
  const langForHljs = language === "tsx" ? "typescript" : language === "html" ? "xml" : language;

  const normalized = useMemo(() => normalize(code), [code]);

  const highlighted = useMemo(() => {
    try {
      return hljs.highlight(normalized, { language: langForHljs }).value;
    } catch {
      return hljs.highlightAuto(normalized).value;
    }
  }, [normalized, langForHljs]);

  return (
    <pre className="m-0 overflow-auto p-4">
      <code
        className={`hljs language-${langForHljs} text-desription`}
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </pre>
  );
}
