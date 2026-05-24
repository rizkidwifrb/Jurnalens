import { Nav } from "@/components/layout/nav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="app-noise pointer-events-none fixed inset-0 opacity-70" />
      <div className="premium-grid pointer-events-none fixed inset-0 opacity-45" />
      <Nav />
      <section className="relative mx-auto w-full px-4 pb-28 pt-24 sm:px-6 lg:ml-72 lg:min-h-screen lg:px-8 lg:py-7 xl:px-10">
        {children}
      </section>
    </main>
  );
}
