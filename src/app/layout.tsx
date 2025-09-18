import { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

import Provider from "@/components/common/Provider";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import "highlight.js/styles/github-dark.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoKR = Noto_Sans_KR({
  weight: ["400", "500", "700"],
  variable: "--font-noto-kr",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "포트폴리오 - 최태민",
  description: "프론트엔드 개발자 최태민의 포트폴리오입니다.",
  icons: {
    icon: "/favicon.ico",
  },
  // 다크 배경에 맞는 테마 컬러
  themeColor: "#0f172a",
  applicationName: "Project Starter",
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  colorScheme: "dark", // 시스템 다크 기준
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${inter.variable} ${notoKR.variable} ${jetbrains.variable}`}
    >
      <body
        className={`bg-background text-text selection:bg-primary/20 selection:text-text flex min-h-dvh flex-col antialiased`}
      >
        <Provider>
          <Header />
          <main id="main" className="mx-auto w-full px-4 py-8 lg:max-w-[1024px] lg:px-6">
            {children}
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
