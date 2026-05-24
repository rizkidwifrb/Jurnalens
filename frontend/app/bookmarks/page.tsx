import { Download, ExternalLink, FolderOpen, GitCompare, Star } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { ActionButton } from "@/components/ui/action-button";

const saved = [
  ["Prediksi kesehatan mental mahasiswa", "Disimpan dari pencarian live", "APA"],
  ["Komunikasi digital di pendidikan tinggi", "Siap dibandingkan", "BibTeX"],
  ["Analitik pembelajaran multimodal", "Butuh ekstraksi metodologi", "IEEE"]
] as const;

export default function BookmarksPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-6xl space-y-5">
        <header>
          <p className="text-sm text-muted">Perpustakaan</p>
          <h1 className="mt-2 text-3xl font-semibold">Bookmarks</h1>
        </header>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="space-y-3">
            {saved.map(([title, status, format]) => (
              <Card key={title} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                <div className="mb-2 inline-flex items-center gap-1 rounded-md bg-accent/10 px-2 py-1 text-xs text-accent"><Star className="h-3 w-3" /> Tersimpan</div>
                  <h2 className="font-semibold">{title}</h2>
                  <p className="mt-2 text-sm text-muted">{status}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <ActionButton className="h-9 px-3" message={`Mode banding untuk ${title} siap.`}><GitCompare className="h-4 w-4" />Bandingkan</ActionButton>
                  <ActionButton className="h-9 px-3" message={`Export ${format} disiapkan.`}><Download className="h-4 w-4" />{format}</ActionButton>
                </div>
              </Card>
            ))}
          </div>
          <Card className="space-y-4">
            <FolderOpen className="h-6 w-6 text-accent" />
            <h2 className="font-semibold">Koleksi</h2>
            <div className="space-y-2 text-sm text-muted">
              <p>Latar belakang skripsi</p>
              <p>Referensi metodologi</p>
              <p>Paper sitasi tinggi</p>
            </div>
            <ActionButton className="w-full" message="Export queue siap dipakai saat paper dipilih."><ExternalLink className="h-4 w-4" />Buka export queue</ActionButton>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
