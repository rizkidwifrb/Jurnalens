import Link from "next/link";
import { BookOpen, Brain, FileText, Network, Search, Settings, Star, TrendingUp } from "lucide-react";

const items = [
  ["/dashboard", "Dashboard", Brain],
  ["/search", "Search", Search],
  ["/assistant", "Assistant", BookOpen],
  ["/pdf", "PDF", FileText],
  ["/bookmarks", "Bookmarks", Star],
  ["/graph", "Graph", Network],
  ["/topics", "Topics", TrendingUp],
  ["/settings", "Settings", Settings]
] as const;

export function Nav() {
  return (
    <aside className="relative hidden min-h-screen w-72 border-r border-white/10 bg-black/25 p-4 backdrop-blur-xl lg:block">
      <Link href="/" className="mb-8 flex items-center gap-3 rounded-lg px-2 py-2 text-lg font-semibold">
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-white text-black shadow-[0_18px_50px_rgba(139,211,255,0.18)]">
          <Brain className="h-5 w-5" />
        </span>
        <span>
          <span className="block leading-tight">Research</span>
          <span className="block text-xs font-normal text-muted">Academic AI OS</span>
        </span>
      </Link>
      <nav className="space-y-1.5">
        {items.map(([href, label, Icon]) => (
          <Link key={href} href={href} className="group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-muted transition hover:bg-white/[0.08] hover:text-foreground">
            <Icon className="h-4 w-4" /> {label}
          </Link>
        ))}
      </nav>
      <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-white/10 bg-white/[0.055] p-4">
        <p className="text-xs font-medium text-foreground">Local-first stack</p>
        <p className="mt-1 text-xs leading-5 text-muted">OpenAlex, arXiv, Crossref, Qdrant, OpenSearch, Groq-ready.</p>
      </div>
    </aside>
  );
}
