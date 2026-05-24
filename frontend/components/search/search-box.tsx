"use client";

import { FormEvent, useState } from "react";
import { Command, Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SearchBox({ onSearch, large = false }: { onSearch: (query: string) => void; large?: boolean }) {
  const [query, setQuery] = useState("");
  function submit(event: FormEvent) {
    event.preventDefault();
    if (query.trim()) onSearch(query.trim());
  }
  return (
    <form onSubmit={submit} className={`glass group w-full rounded-lg p-2 transition duration-300 hover:border-white/20 ${large ? "shadow-[0_34px_120px_rgba(0,0,0,0.36)]" : ""}`}>
      <div className="flex items-center gap-2">
        <div className="ml-1 grid h-10 w-10 place-items-center rounded-md bg-white text-black">
          <Search className="h-4 w-4" />
        </div>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search papers, methods, topics, or ask a research question..."
          className={`w-full bg-transparent px-2 outline-none placeholder:text-muted ${large ? "h-14 text-lg" : "h-11 text-sm"}`}
        />
        <Button type="button" title="Advanced filters" className="hidden w-10 px-0 sm:inline-flex"><SlidersHorizontal className="h-4 w-4" /></Button>
        <Button type="submit" className="bg-white text-black hover:bg-white/90"><Sparkles className="h-4 w-4" />Search</Button>
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
