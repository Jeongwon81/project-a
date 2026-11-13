import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "STUDIO ONDO hello | 브랜드의 온도를 디자인합니다",
  description:
    "브랜딩, 웹 디자인, 대시보드 UI를 만드는 디자인 스튜디오 STUDIO ONDO",
  openGraph: {
    title: "STUDIO ONDO | 브랜드의 온도를 디자인합니다",
    description:
      "브랜딩, 웹 디자인, 대시보드 UI를 만드는 디자인 스튜디오 STUDIO ONDO",
    images: [{ url: "/images/hero-main.jpg" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
