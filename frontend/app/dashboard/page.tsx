"use client";

import { AppShell } from "@/components/layout/app-shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card } from "@/components/ui/card";
import { SearchBox } from "@/components/search/search-box";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-6xl space-y-5">
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
          <section className="space-y-5">
            <p className="text-sm text-muted">Jurnalens workspace is ready.</p>
            <h1 className="text-balance max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">Find the signal inside academic noise.</h1>
            <SearchBox large onSearch={(query) => { window.location.href = `/search?q=${encodeURIComponent(query)}`; }} />
          </section>
          <Card className="flex flex-col justify-between">
            <div>
              <p className="text-sm text-muted">Recommendation logic</p>
              <h2 className="mt-2 text-xl font-semibold">Research feed</h2>
            </div>
            <p className="mt-6 text-sm leading-6 text-muted">Combines search history, bookmarks, followed topics, author signals, recency, and citation impact.</p>
          </Card>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Indexed papers" value="Local" />
          <StatCard label="Data sources" value="4" />
          <StatCard label="AI tools" value="8" />
          <StatCard label="PDF chats" value="Saved" />
        </div>
        <div className="grid gap-3 lg:grid-cols-3">
          {[
            ["Recent high-impact papers", "Search any topic to populate live academic results."],
            ["Followed topic updates", "Follow topics from the Topics page to shape recommendations."],
            ["Saved literature reviews", "Generate reviews from Assistant, then keep drafts here."]
          ].map(([title, copy]) => (
            <Card key={title} className="min-h-32"><h2 className="font-semibold">{title}</h2><p className="mt-3 text-sm leading-6 text-muted">{copy}</p></Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
