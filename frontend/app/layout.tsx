import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jurnalens",
  description: "Academic AI lens for journal search, grounded synthesis, PDF chat, citations, and recommendations."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
