"use client";
import React from "react";
import Link from "next/link";

import { PLUGINS } from "@/constants";

export default function PluginsOverviewPage() {
  return (
    <main className="bg-background text-text min-h-dvh">
      <div className="mx-auto w-[1024px] max-w-[1024px] px-4 py-8 lg:px-6 lg:py-10">
        <header className="mb-6 lg:mb-8">
          <h1 className="text-title">Plugins</h1>
          <p className="text-description text-subtext mt-1">
            플러그인의 간단한 설명과 링크를 제공합니다. 상세 문서와 코드 스니펫은 각 플러그인 상세
            페이지에서 확인하세요.
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-4 lg:gap-6" role="list">
          {PLUGINS.map((plugin) => (
            <li key={plugin.href}>
              <Link
                href={`/plugins/${plugin.href}`}
                className="border-border bg-surface focus:ring-primary/50 block w-full rounded-2xl border p-5 transition-colors transition-transform hover:-translate-y-0.5 hover:shadow-lg focus:ring-2 focus:outline-none lg:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-body text-text font-semibold">{plugin.name}</h2>
                    <p className="text-description text-subtext mt-0.5">{plugin.summary}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {plugin.tags.map((tag) => (
                      <span
                        key={`${plugin}/${tag}`}
                        className="border-border bg-primary/10 text-primary inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-description text-primary mt-2">View Details →</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
