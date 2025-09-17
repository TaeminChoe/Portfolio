"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";

import { cx } from "@/utils";
import { PROJECTS } from "@/constants";
import KeywordTag from "@/components/common/KeywordTag";

export default function ProjectsPage() {
  const [query, setQuery] = useState("");
  const [showDrafts, setShowDrafts] = useState(false);

  const projects = useMemo(() => {
    const queryString = query.trim().toLowerCase();
    return (
      PROJECTS
        // draft || published filter
        .filter((a) => (showDrafts ? true : a.status !== "draft"))
        // query filter
        .filter((p) => {
          if (!queryString) return true;
          return (
            p.name.toLowerCase().includes(queryString) ||
            p.summary.toLowerCase().includes(queryString) ||
            p.tags.some((t) => t.toLowerCase().includes(queryString))
          );
        })
    );
  }, [query, showDrafts]);

  return (
    <main className="bg-background text-text min-h-dvh">
      <div className="mx-auto w-[1024px] max-w-[1024px] px-4 py-8 lg:px-6 lg:py-10">
        <header className="mb-6 lg:mb-8" aria-label="Projects Header">
          <h1 className="text-title">Projects</h1>
          <p className="text-description text-subtext mt-1">
            회사 내부 프로젝트 특성상 민감 정보는 공개하지 않습니다. 비식별화된 개요와 제 역할
            중심으로 구성합니다.
          </p>

          {/* Controls */}
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="flex-1">
              <span className="sr-only">Search projects</span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, tag, summary"
                className={cx(
                  "border-border bg-background text-body text-text w-full rounded-md border px-3 py-2",
                  "focus:ring-primary/50 focus:ring-2 focus:outline-none",
                )}
                aria-label="Search projects"
              />
            </label>
            <label className="text-description text-subtext inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={showDrafts}
                onChange={(e) => setShowDrafts(e.target.checked)}
                className="border-border bg-background h-4 w-4 rounded"
                aria-label="Only active projects"
              />
              Show drafts
            </label>
          </div>
        </header>

        {/* Projects list */}
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6" role="list">
          {projects.map((project) => (
            <li key={project.href}>
              <Link
                href={`/projects/${project.href}`}
                className={cx(
                  "border-border bg-surface block w-full rounded-2xl border p-5 lg:p-6",
                  "focus:ring-primary/50 transition-colors transition-transform hover:-translate-y-0.5 hover:shadow-lg focus:ring-2 focus:outline-none",
                )}
                aria-label={`${project.name} detail`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-body text-text font-semibold">{project.name}</h2>
                    <p className="text-description text-subtext mt-0.5">
                      Role: {project.role} · Period: {project.period}
                    </p>
                  </div>
                  {project.status && (
                    <span
                      className={cx(
                        "rounded-full border px-2 py-0.5 text-xs",
                        project.status === "published"
                          ? "text-accent border-accent/40 bg-accent/10"
                          : "text-subtext border-border bg-background/40",
                      )}
                    >
                      {project.status}
                    </span>
                  )}
                </div>
                <p className="text-body text-subtext mt-2">{project.summary}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <KeywordTag key={tag}>{tag}</KeywordTag>
                  ))}
                </div>
                <p className="text-description text-primary mt-2">View Detail →</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
