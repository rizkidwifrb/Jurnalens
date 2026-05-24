"use client";

import { FormEvent, useEffect, useState } from "react";
import { Command, Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SearchBox({
  onSearch,
  large = false,
  initialQuery = ""
}: {
  onSearch: (query: string) => void;
  large?: boolean;
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (query.trim()) onSearch(query.trim());
  }

  return (
    <form onSubmit={submit} className={`glass group w-full rounded-lg p-2 transition duration-300 hover:border-white/20 ${large ? "shadow-[0_34px_120px_rgba(0,0,0,0.36)]" : ""}`}>
      <div className="grid gap-2 sm:grid-cols-[auto_minmax(0,1fr)_auto_auto] sm:items-center">
        <div className="hidden h-11 w-11 place-items-center rounded-md bg-white text-black shadow-[0_12px_30px_rgba(139,211,255,0.18)] sm:grid">
          <Search className="h-4 w-4" />
        </div>
        <label className="relative block min-w-0">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted sm:hidden" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search papers, methods, topics..."
            className={`w-full rounded-md border border-white/10 bg-black/18 pl-10 pr-3 text-foreground outline-none transition placeholder:text-muted focus:border-accent/45 sm:border-0 sm:bg-transparent sm:pl-2 ${large ? "h-[3.25rem] text-base sm:h-14 sm:text-lg" : "h-11 text-sm"}`}
          />
        </label>
        <Button type="button" title="Advanced filters" className="hidden w-11 px-0 sm:inline-flex"><SlidersHorizontal className="h-4 w-4" /></Button>
        <Button type="submit" className="h-11 w-full bg-white text-black hover:bg-white/90 sm:w-auto"><Sparkles className="h-4 w-4" />Search</Button>
      </div>
      {large && (
        <div className="mt-2 flex flex-wrap items-center gap-2 px-2 pb-1 text-xs text-muted">
          <span className="inline-flex items-center gap-1 rounded-md bg-white/[0.06] px-2 py-1"><Command className="h-3 w-3" /> natural language</span>
          <span className="rounded-md bg-white/[0.06] px-2 py-1">hybrid retrieval</span>
          <span className="rounded-md bg-white/[0.06] px-2 py-1">grounded citations</span>
        </div>
      )}
    </form>
  );
}
