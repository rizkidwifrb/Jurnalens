import Link from "next/link";
import { Bookmark, ExternalLink, Quote, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { SearchResult } from "@/types";

export function PaperCard({ result }: { result: SearchResult }) {
  const paper = result.paper;
  return (
    <Card className="group space-y-4 transition duration-300 hover:-translate-y-1 hover:border-white/20">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2 text-xs text-muted">
            <span className="rounded-md bg-accent/10 px-2 py-1 text-accent">{paper.source || "Indexed"}</span>
            <span className="rounded-md bg-white/[0.06] px-2 py-1">{paper.year ?? "Year not available"}</span>
            <span className="rounded-md bg-white/[0.06] px-2 py-1">{paper.open_access ? "Open access" : "Access unknown"}</span>
          </div>
          <Link href={`/papers/${paper.id}`} className="block text-xl font-semibold leading-snug tracking-normal text-foreground transition group-hover:text-accent">{paper.title}</Link>
        </div>
        <Button title="Bookmark" className="h-9 w-9 shrink-0 px-0"><Bookmark className="h-4 w-4" /></Button>
      </div>
      <p className="line-clamp-3 text-sm leading-7 text-[#aebbc9]">{result.ai_summary || paper.abstract || "Abstract not available."}</p>
      <div className="grid gap-2 rounded-lg border border-white/10 bg-black/20 p-3 text-xs text-muted sm:grid-cols-3">
        <span>{paper.journal || "Source not available"}</span>
        <span><Quote className="mr-1 inline h-3 w-3" />{paper.citation_count ?? "Not available"} citations</span>
        <span><Sparkles className="mr-1 inline h-3 w-3" />Relevance {result.relevance_score.toFixed(2)}</span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {paper.doi && <span className="rounded-md bg-white/[0.07] px-2 py-1 text-xs text-muted">DOI {paper.doi}</span>}
        {paper.url && <Link href={paper.url} className="inline-flex items-center gap-1 text-xs text-accent" target="_blank">Source <ExternalLink className="h-3 w-3" /></Link>}
      </div>
    </Card>
  );
}
