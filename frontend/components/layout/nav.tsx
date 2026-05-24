"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, FileText, LayoutDashboard, Network, Search, Settings, Star, TrendingUp } from "lucide-react";
import { BrandLogo } from "@/components/brand/brand-logo";
import { cn } from "@/lib/utils";

const items = [
  ["/dashboard", "Dashboard", LayoutDashboard],
  ["/search", "Cari", Search],
  ["/assistant", "Asisten", BookOpen],
  ["/pdf", "PDF", FileText],
  ["/bookmarks", "Bookmarks", Star],
  ["/graph", "Graph", Network],
  ["/topics", "Topik", TrendingUp],
  ["/settings", "Pengaturan", Settings]
] as const;

export function Nav() {
  const pathname = usePathname();
  const mainItems = items.slice(0, 5);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#05070a]/84 px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <Link href="/dashboard" aria-label="Jurnalens dashboard">
            <BrandLogo />
          </Link>
          <Link href="/search" className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.07] text-foreground">
            <Search className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-white/10 bg-[#060a10]/86 p-4 backdrop-blur-2xl lg:block">
        <Link href="/dashboard" className="mb-7 flex rounded-lg px-1 py-1">
          <BrandLogo />
        </Link>
        <nav className="space-y-1.5">
          {items.map(([href, label, Icon]) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-muted transition hover:bg-white/[0.08] hover:text-foreground",
                  active && "bg-white/[0.095] text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                )}
              >
                <Icon className={cn("h-4 w-4", active && "text-accent")} />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-white/10 bg-white/[0.055] p-3">
          <p className="text-xs font-medium text-foreground">Lensa akademik live</p>
          <p className="mt-1 text-xs leading-5 text-muted">OpenAlex, CORE, Crossref, Qdrant, dan OpenSearch-ready.</p>
        </div>
      </aside>

      <nav className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-5 rounded-lg border border-white/10 bg-[#070b11]/92 p-1 shadow-[0_18px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:hidden">
        {mainItems.map(([href, label, Icon]) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex min-w-0 flex-col items-center justify-center gap-1 rounded-md px-1 py-2 text-[0.68rem] text-muted transition",
                active && "bg-white/[0.11] text-foreground"
              )}
            >
              <Icon className={cn("h-4 w-4", active && "text-accent")} />
              <span className="truncate">{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
