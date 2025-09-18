"use client";
import Link from "next/link";

import LevelTag from "@/components/common/LevelTag";
import { PROJECTS, SKILLS } from "@/constants";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <main className="bg-background text-text min-h-dvh">
      <div className="mx-auto px-4 py-8 lg:w-[1024px] lg:max-w-[1024px] lg:px-6 lg:py-10">
        <header className="mb-6 lg:mb-8">
          <h1 className="text-title">Dashboard</h1>
        </header>

        <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
          <section
            aria-label="Profile"
            className="border-border bg-surface rounded-2xl border p-5 transition-transform hover:-translate-y-0.5 hover:shadow-lg lg:col-span-1 lg:p-6"
          >
            <div className="flex items-center gap-10">
              {/* 왼쪽: 프로필 이미지 */}
              <figure className="border-border bg-background h-[120px] w-[120px] overflow-hidden rounded-2xl border">
                <Image
                  src="/images/me.jpg"
                  alt="최태민 프로필 사진"
                  width={120}
                  height={120}
                  className="h-full w-full object-cover"
                  priority
                />
              </figure>

              {/* 오른쪽: 프로필 텍스트 */}
              <div className="min-w-0">
                <h2 className="text-section text-text">Profile</h2>
                <p className="text-body text-subtext mt-1">최태민 · Front-end Engineer</p>
                <p className="text-body text-subtext mt-2">생년월일 : 1996년 6월 28일</p>
                <p className="text-body text-subtext mt-2">Phone : 010-7192-4370</p>
                <p className="text-body text-subtext mt-2">Email : xoa28@naver.com</p>
              </div>
            </div>
          </section>

          {/* About */}
          <section className="border-border bg-surface rounded-2xl border p-5 lg:col-span-1 lg:p-6">
            <h2 className="text-section">About</h2>
            <p className="text-body text-subtext">
              4년차 프론트엔드 엔지니어로, 원활한 소통과 체계적인 프로세스를 중시하며 팀과 함께
              성장해왔습니다. AWS, Figma, CI/CD 등 다양한 스택을 활용해 프론트엔드뿐 아니라 주변
              환경까지 고려한 개발 경험을 쌓아왔습니다.
            </p>
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
            {Object.keys(SKILLS).map((key) => {
              return (
                <div key={key} className="border-border bg-background/40 rounded-xl border p-3">
                  <h3 className="text-body text-text font-semibold">{key}</h3>
                  <ul className="mt-2 space-y-2" role="list">
                    {SKILLS[key].map((skill) => {
                      return (
                        <li
                          key={`${key}/${skill.name}`}
                          className="text-body text-subtext flex items-center justify-between"
                        >
                          <span>{skill.name}</span>
                          <LevelTag level={skill.level} />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
