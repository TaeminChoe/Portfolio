"use client";
import Link from "next/link";
import { useMemo, useState } from "react";

import KeywordTag from "@/components/common/KeywordTag";
import { ARTICLES } from "@/constants";
import { cx, formatDate } from "@/utils";

// Unique tag list
const ALL_TAGS = Array.from(new Set(ARTICLES.flatMap((a) => a.tags))).sort();

export default function ArticlesIndexPage() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [showDrafts, setShowDrafts] = useState(false);

  const articleList = useMemo(() => {
    const queryString = query.trim().toLowerCase();
    return (
      ARTICLES
        // draft || published filter
        .filter((a) => (showDrafts ? true : a.status !== "draft"))
        // tag filter
        .filter((a) => !tag || a.tags.includes(tag))
        // query filter
        .filter((a) => {
          if (!queryString) return true;
          return (
            a.title.toLowerCase().includes(queryString) ||
            a.summary.toLowerCase().includes(queryString) ||
            a.tags.some((t) => t.toLowerCase().includes(queryString))
          );
        })
        .sort((a, b) => b.date.localeCompare(a.date))
    );
  }, [query, tag, showDrafts]);

  return (
    <main className="bg-background text-text min-h-dvh">
      <div className="mx-auto px-4 py-8 lg:w-[1024px] lg:max-w-[1024px] lg:px-6 lg:py-10">
        <header className="mb-6 lg:mb-8" aria-label="Articles Header">
          <h1 className="text-title">Articles</h1>
          <p className="text-description text-subtext mt-1">
            정리된 글들을 모았습니다. 내부 정보는 비식별/일반화하여 서술합니다.
          </p>

          {/* Controls */}
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="flex-1">
              <span className="sr-only">Search articles</span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, tag, summary"
                className={cx(
                  "border-border bg-background text-body text-text w-full rounded-md border px-3 py-2",
                  "focus:ring-primary/50 focus:ring-2 focus:outline-none",
                )}
                aria-label="Search articles"
              />
            </label>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setTag(null)}
                aria-pressed={tag === null}
                className={cx(
                  "rounded-full border px-3 py-1 text-xs",
                  tag === null
                    ? "text-text bg-background border-border"
                    : "text-subtext border-border/60",
                )}
              >
                All
              </button>
              {ALL_TAGS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTag(tag === t ? null : t)}
                  aria-pressed={tag === t}
                  className={cx(
                    "rounded-full border px-3 py-1 text-xs",
                    tag === t
                      ? "text-text bg-background border-border"
                      : "text-subtext border-border/60",
                  )}
                >
                  {t}
                </button>
              ))}
              <label className="text-description text-subtext ml-2 inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showDrafts}
                  onChange={(e) => setShowDrafts(e.target.checked)}
                  className="border-border bg-background h-4 w-4 rounded"
                  aria-label="Show drafts"
                />
                Show drafts
              </label>
            </div>
          </div>
        </header>

        {/* Articles list */}
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6" role="list">
          {articleList.map((article) => (
            <li key={article.href}>
              <Link
                href={`/articles/${article.href}`}
                className={cx(
                  "border-border bg-surface block w-full rounded-2xl border p-5 lg:p-6",
                  "focus:ring-primary/50 transition-colors transition-transform hover:-translate-y-0.5 hover:shadow-lg focus:ring-2 focus:outline-none",
                )}
                aria-label={`${article.title} detail`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-body text-text font-semibold">{article.title}</h2>
                    <p className="text-description text-subtext mt-0.5">
                      {formatDate(article.date)} · {article.readingTime}
                    </p>
                  </div>
                  {article.status === "draft" && (
                    <span className="border-border bg-background/40 text-subtext rounded-full border px-2 py-0.5 text-xs">
                      draft
                    </span>
                  )}
                </div>
                <p className="text-body text-subtext mt-2">{article.summary}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <KeywordTag key={tag}>{tag}</KeywordTag>
                  ))}
                </div>
                <p className="text-description text-primary mt-2">Read →</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
