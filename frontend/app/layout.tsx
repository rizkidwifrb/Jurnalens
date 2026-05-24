import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Academic Research Engine",
  description: "Free local AI research search, analysis, PDF chat, citations, and recommendations."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
