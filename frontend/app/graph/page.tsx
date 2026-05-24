import { Network } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { ResearchGraph } from "@/components/graph/research-graph";
import { Card } from "@/components/ui/card";

export default function GraphPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-6xl space-y-5">
        <header>
          <p className="text-sm text-muted">Peta pengetahuan</p>
          <h1 className="mt-2 text-3xl font-semibold">Graph Riset</h1>
        </header>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
          <ResearchGraph />
          <Card className="space-y-3">
            <Network className="h-5 w-5 text-accent" />
            <h2 className="font-semibold">Sinyal graph</h2>
            <p className="text-sm leading-6 text-muted">Node paper, penulis, topik, dan jurnal dipetakan dari metadata terindeks.</p>
            <div className="space-y-2 text-xs text-muted">
              <p>4 tipe entitas</p>
              <p>3 tipe relasi</p>
              <p>Ekspansi live siap</p>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
