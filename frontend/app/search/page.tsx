"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Filter, Flame, Library, Sparkles } from "lucide-react";
import { AnswerPanel } from "@/components/ai/answer-panel";
import { AppShell } from "@/components/layout/app-shell";
import { PaperCard } from "@/components/papers/paper-card";
import { SearchBox } from "@/components/search/search-box";
import { Card } from "@/components/ui/card";
import { hybridSearch } from "@/lib/api";
import type { SearchResponse } from "@/types";

function SearchContent() {
  const params = useSearchParams();
  const [data, setData] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  async function run(query: string) {
    setLoading(true); setError(null);
    try { setData(await hybridSearch(query)); } catch (event) { setError(event instanceof Error ? event.message : "Search failed"); }
    setLoading(false);
  }
  useEffect(() => { const q = params.get("q"); if (q) void run(q); }, [params]);
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs text-muted"><Sparkles className="h-3.5 w-3.5 text-accent" /> Hybrid academic retrieval</p>
            <h1 className="text-4xl font-semibold leading-tight">Research Search</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">Ask in natural language, then inspect grounded answers, relevance, citations, and next research questions.</p>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_390px]">
          <section className="space-y-5">
            <SearchBox onSearch={run} />
            <div className="flex flex-wrap gap-2 text-xs text-muted">
              {["Year", "Author", "Journal", "Open access", "Topic", "Citation count", "Source"].map((filter) => (
                <span key={filter} className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.045] px-3 py-2"><Filter className="h-3 w-3" />{filter}</span>
              ))}
            </div>
            {loading && <Card className="overflow-hidden text-muted"><div className="h-2 w-1/3 animate-pulse rounded bg-white/15" /><div className="mt-5 h-24 animate-pulse rounded-md bg-white/[0.06]" /></Card>}
            {error && <Card className="border-rose/40 text-rose">{error}</Card>}
            {!loading && !data && <Card className="text-muted">Try &quot;AI untuk deteksi depresi mahasiswa&quot;.</Card>}
            {data?.results.map((result) => <PaperCard key={result.paper.id} result={result} />)}
          </section>
          <aside className="space-y-4 lg:sticky lg:top-5 lg:self-start">
            <AnswerPanel answer={data?.answer} citations={data?.citations} />
            <Card>
              <h3 className="flex items-center gap-2 font-semibold"><Library className="h-4 w-4 text-accent" /> Next Questions</h3>
              <div className="mt-3 space-y-2 text-sm leading-6 text-muted">{data?.next_questions.map((q) => <p key={q}>{q}</p>) || <p>Search results will generate next research directions.</p>}</div>
            </Card>
            <Card>
              <h3 className="flex items-center gap-2 font-semibold"><Flame className="h-4 w-4 text-rose" /> Trending</h3>
              <div className="mt-3 space-y-2 text-sm text-muted">
                <p>student mental health prediction</p>
                <p>LLM evaluation for education</p>
                <p>multimodal depression screening</p>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<AppShell><Card className="text-muted">Loading search...</Card></AppShell>}>
      <SearchContent />
    </Suspense>
  );
}
