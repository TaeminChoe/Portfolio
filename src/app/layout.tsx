import "./globals.css";
import { Inter, Noto_Sans_KR, JetBrains_Mono } from "next/font/google";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${inter.variable} ${notoKR.variable} ${jetbrains.variable}`}>
      <body className="bg-background text-text font-sans">{children}</body>
    </html>
  );
}
