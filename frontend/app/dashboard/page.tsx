"use client";

import { AppShell } from "@/components/layout/app-shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card } from "@/components/ui/card";
import { SearchBox } from "@/components/search/search-box";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <section className="space-y-5">
            <p className="text-sm text-muted">Good morning. Your research workspace is ready.</p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-tight">Find the signal inside academic noise.</h1>
            <SearchBox large onSearch={(query) => { window.location.href = `/search?q=${encodeURIComponent(query)}`; }} />
          </section>
          <Card className="flex flex-col justify-between">
            <div>
              <p className="text-sm text-muted">Recommendation logic</p>
              <h2 className="mt-2 text-2xl font-semibold">Personal feed</h2>
            </div>
            <p className="mt-8 text-sm leading-6 text-muted">Combines search history, bookmarks, followed topics, author signals, recency, and citation impact.</p>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard label="Indexed papers" value="Local" />
          <StatCard label="Data sources" value="4" />
          <StatCard label="AI tools" value="8" />
          <StatCard label="PDF chats" value="Saved" />
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {["Recent high-impact papers", "Followed topic updates", "Saved literature reviews"].map((item) => (
            <Card key={item} className="min-h-40"><h2 className="font-semibold">{item}</h2><p className="mt-3 text-sm leading-6 text-muted">Content appears here after ingestion and user activity.</p></Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
