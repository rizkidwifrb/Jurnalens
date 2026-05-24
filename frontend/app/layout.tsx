import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jurnalens",
  description: "Lensa AI akademik untuk pencarian jurnal, sintesis berbasis sumber, PDF chat, sitasi, dan rekomendasi."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className="dark">
      <body>{children}</body>
    </html>
  );
}
