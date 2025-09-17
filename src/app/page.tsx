"use client";
import React from "react";
import Link from "next/link";

import { PROJECTS } from "@/constants";

const CONTACT = {
  phone: "010-7192-4370",
  email: "xoa28@naver.com",
  // github: "https://github.com/username",
  // linkedin: "https://linkedin.com/in/username",
};

export default function DashboardPage() {
  return (
    <main className="bg-background text-text min-h-dvh">
      <div className="mx-auto w-[1024px] max-w-[1024px] px-4 py-8 lg:px-6 lg:py-10">
        <header className="mb-6 lg:mb-8">
          <h1 className="text-title">Dashboard</h1>
        </header>

        <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
          {/* About */}
          <section className="border-border bg-surface rounded-2xl border p-5 lg:col-span-2 lg:p-6">
            <h2 className="text-section">About</h2>
            <p className="text-body text-subtext">
              4년차 프론트엔드 엔지니어. IoT 보안 솔루션 및 멀티 테넌트 SaaS 환경 경험. 기능적
              품질과 UI/UX 일관성을 강조.
            </p>
          </section>
          {/* Contact */}
          <section className="border-border bg-surface rounded-2xl border p-5 lg:col-span-1 lg:p-6">
            <h2 className="text-section">Contact</h2>
            <ul className="text-body text-subtext space-y-2">
              <li>Phone : {CONTACT.phone}</li>
              <li>E-mail : {CONTACT.email}</li>
              {/* <li>
                <Link href={CONTACT.github} className="text-primary underline">
                  GitHub
                </Link>
              </li>
              <li>
                <Link href={CONTACT.linkedin} className="text-primary underline">
                  LinkedIn
                </Link>
              </li> */}
            </ul>
          </section>
        </div>

        {/* Projects */}
        <section className="border-border bg-surface mb-6 rounded-2xl border p-5 lg:p-6">
          <h2 className="text-section">Projects</h2>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6" role="list">
            {PROJECTS.map((project) => (
              <li key={project.href}>
                <Link
                  href={`/projects/${project.href}`}
                  className="border-border bg-background/40 focus:ring-primary/50 block w-full rounded-xl border p-4 transition-colors transition-transform hover:-translate-y-0.5 hover:shadow-lg focus:ring-2 focus:outline-none"
                >
                  <h3 className="text-body text-text font-semibold">{project.name}</h3>
                  <p className="text-description text-subtext mt-1">{project.summary}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border-border bg-primary/10 text-primary inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-description text-primary mt-2">View Detail →</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Skills Matrix */}
        <section className="border-border bg-surface rounded-2xl border p-5 lg:p-6">
          <h2 className="text-section">Skills Matrix</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="border-border bg-background/40 rounded-xl border p-3">
              <h3 className="text-body text-text font-semibold">Frontend</h3>
              <ul className="mt-2 space-y-2" role="list">
                <li className="text-body text-subtext flex items-center justify-between">
                  <span>Next.js (App Router)</span>
                  <span className="border-accent/40 bg-accent/10 text-accent inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs">
                    High
                  </span>
                </li>
                <li className="text-body text-subtext flex items-center justify-between">
                  <span>TypeScript</span>
                  <span className="border-primary/40 bg-primary/10 text-primary inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs">
                    Medium
                  </span>
                </li>
                <li className="text-body text-subtext flex items-center justify-between">
                  <span>Tailwind CSS</span>
                  <span className="border-primary/40 bg-primary/10 text-primary inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs">
                    Medium
                  </span>
                </li>
              </ul>
            </div>
            <div className="border-border bg-background/40 rounded-xl border p-3">
              <h3 className="text-body text-text font-semibold">Platform / DevOps</h3>
              <ul className="mt-2 space-y-2" role="list">
                <li className="text-body text-subtext flex items-center justify-between">
                  <span>Docker</span>
                  <span className="border-primary/40 bg-primary/10 text-primary inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs">
                    Medium
                  </span>
                </li>
                <li className="text-body text-subtext flex items-center justify-between">
                  <span>PostgreSQL</span>
                  <span className="border-border bg-background/40 text-subtext inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs">
                    Low
                  </span>
                </li>
                <li className="text-body text-subtext flex items-center justify-between">
                  <span>Cypress E2E</span>
                  <span className="border-primary/40 bg-primary/10 text-primary inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs">
                    Medium
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
