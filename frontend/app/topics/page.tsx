import { Bell, Check, Flame, Plus } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const topics = [
  ["Academic writing", "142 papers", true],
  ["Digital communication", "89 papers", true],
  ["Mental health prediction", "76 papers", false],
  ["Learning analytics", "64 papers", false],
  ["Research methodology", "51 papers", true],
  ["LLM evaluation", "43 papers", false]
] as const;

export default function TopicsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-6xl space-y-5">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-muted">Recommendation tuning</p>
            <h1 className="mt-2 text-3xl font-semibold">Topics</h1>
          </div>
          <Button className="self-start bg-white text-black hover:bg-white/90"><Plus className="h-4 w-4" />New topic</Button>
        </header>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {topics.map(([name, count, followed]) => (
            <Card key={name} className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold">{name}</h2>
                  <p className="mt-1 text-sm text-muted">{count}</p>
                </div>
                <span className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs ${followed ? "bg-lime/10 text-lime" : "bg-white/[0.06] text-muted"}`}>
                  {followed ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                  {followed ? "Followed" : "Follow"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted">
                <Flame className="h-3.5 w-3.5 text-rose" /> Trending in recent search
              </div>
            </Card>
          ))}
        </div>
        <Card className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold">Notification digest</h2>
            <p className="mt-1 text-sm text-muted">Weekly updates for followed topics and new high-impact papers.</p>
          </div>
          <Button><Bell className="h-4 w-4" />Configure</Button>
        </Card>
      </div>
    </AppShell>
  );
}
