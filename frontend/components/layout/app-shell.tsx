import { Nav } from "@/components/layout/nav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex min-h-screen overflow-hidden">
      <div className="premium-grid pointer-events-none absolute inset-0 opacity-60" />
      <Nav />
      <section className="relative w-full px-4 py-5 sm:px-6 lg:px-8">{children}</section>
    </main>
  );
}
