import { Bell, Check, Flame, Plus } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { ActionButton } from "@/components/ui/action-button";

const topics = [
  ["Penulisan akademik", "142 paper", true],
  ["Komunikasi digital", "89 paper", true],
  ["Prediksi kesehatan mental", "76 paper", false],
  ["Learning analytics", "64 papers", false],
  ["Metodologi riset", "51 paper", true],
  ["LLM evaluation", "43 papers", false]
] as const;

export default function TopicsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-6xl space-y-5">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
          <p className="text-sm text-muted">Pengaturan rekomendasi</p>
          <h1 className="mt-2 text-3xl font-semibold">Topik</h1>
        </div>
          <ActionButton className="self-start bg-white text-black hover:bg-white/90" message="Form topik baru siap disambungkan."><Plus className="h-4 w-4" />Topik baru</ActionButton>
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
                  {followed ? "Diikuti" : "Ikuti"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted">
                <Flame className="h-3.5 w-3.5 text-rose" /> Tren pencarian terbaru
              </div>
            </Card>
          ))}
        </div>
        <Card className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold">Digest notifikasi</h2>
            <p className="mt-1 text-sm text-muted">Update mingguan untuk topik yang diikuti dan paper berdampak baru.</p>
          </div>
          <ActionButton message="Pengaturan digest notifikasi dibuka."><Bell className="h-4 w-4" />Atur</ActionButton>
        </Card>
      </div>
    </AppShell>
  );
}
