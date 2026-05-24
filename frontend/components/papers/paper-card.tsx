import Link from "next/link";
import { Bookmark, ExternalLink, Quote, Sparkles, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { SearchResult } from "@/types";

export function PaperCard({ result }: { result: SearchResult }) {
  const paper = result.paper;
  return (
    <Card className="group relative overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_24px_90px_rgba(0,0,0,0.38)]">
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(139,211,255,0.72),rgba(185,242,124,0.52),transparent)] opacity-70" />
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 space-y-3">
            <div className="flex flex-wrap gap-2 text-xs text-muted">
              <span className="rounded-md bg-accent/10 px-2 py-1 text-accent">{paper.source || "Indexed"}</span>
              <span className="rounded-md bg-white/[0.06] px-2 py-1">{paper.year ?? "Year not available"}</span>
              <span className="inline-flex items-center gap-1 rounded-md bg-white/[0.06] px-2 py-1">{paper.open_access && <Unlock className="h-3 w-3 text-lime" />}{paper.open_access ? "Open access" : "Access unknown"}</span>
            </div>
            <Link href={`/papers/${paper.id}`} className="block text-lg font-semibold leading-snug tracking-normal text-foreground transition group-hover:text-accent sm:text-xl">{paper.title}</Link>
          </div>
          <Button title="Bookmark" className="h-10 w-10 shrink-0 px-0 self-start"><Bookmark className="h-4 w-4" /></Button>
        </div>
        <p className="line-clamp-3 text-sm leading-7 text-[#aebbc9]">{result.ai_summary || paper.abstract || "Abstract not available."}</p>
        <div className="grid gap-2 rounded-lg border border-white/10 bg-black/20 p-3 text-xs text-muted sm:grid-cols-3">
          <span className="truncate">{paper.journal || "Source not available"}</span>
          <span><Quote className="mr-1 inline h-3 w-3" />{paper.citation_count ?? "Not available"} citations</span>
          <span><Sparkles className="mr-1 inline h-3 w-3 text-accent" />Relevance {result.relevance_score.toFixed(2)}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {paper.doi && <span className="max-w-full rounded-md bg-white/[0.07] px-2 py-1 text-xs text-muted"><span className="text-foreground/80">DOI</span> <span className="break-all">{paper.doi}</span></span>}
          {paper.url && <Link href={paper.url} className="inline-flex items-center gap-1 rounded-md border border-accent/20 bg-accent/10 px-2 py-1 text-xs text-accent transition hover:bg-accent/15" target="_blank">Source <ExternalLink className="h-3 w-3" /></Link>}
        </div>
      </div>
    </Card>
  );
}
