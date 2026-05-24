import { Nav } from "@/components/layout/nav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="app-noise pointer-events-none fixed inset-0 opacity-70" />
      <div className="premium-grid pointer-events-none fixed inset-0 opacity-45" />
      <Nav />
      <section className="relative w-full px-4 pb-24 pt-20 sm:px-5 lg:min-h-screen lg:pl-64 lg:pr-6 lg:pt-6 xl:pr-8">
        {children}
      </section>
    </main>
  );
}
