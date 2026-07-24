import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans_KR, Noto_Serif_KR } from "next/font/google";
import "./globals.css";

const plexMono = IBM_Plex_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-mono-plex",
});

const plexSansKR = IBM_Plex_Sans_KR({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-sans-kr",
});

const notoSerifKR = Noto_Serif_KR({
  weight: ["600", "900"],
  subsets: ["latin"],
  variable: "--font-serif-kr",
});

export const metadata: Metadata = {
  title: "AI 기반 신용평가모형 개발 — 강의 아카이브",
  description: "신용평가모델 한 학기 아카이브 — 요약 / 쇼츠 / 웹툰",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${plexMono.variable} ${plexSansKR.variable} ${notoSerifKR.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
