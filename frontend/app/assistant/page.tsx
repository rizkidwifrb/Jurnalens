import { BookOpenCheck, FileText, Lightbulb, Map, MessageSquareText, PenLine, Route, Sparkles, Target, Wand2 } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { ActionButton } from "@/components/ui/action-button";

const tools = [
  ["Ringkas", "Padatkan kontribusi, metode, dan temuan paper.", FileText],
  ["Jelaskan Sederhana", "Ubah abstrak padat menjadi bahasa mudah.", MessageSquareText],
  ["Bandingkan Paper", "Sejajarkan metode, dataset, dan klaim.", BookOpenCheck],
  ["Literature Review", "Buat draft berbasis paper terpilih.", PenLine],
  ["Research Gap", "Temukan masalah terbuka dan bukti lemah.", Target],
  ["Metodologi", "Ekstrak variabel, sampel, dan prosedur.", Wand2],
  ["Novelty", "Nilai kebaruan terhadap riset terdekat.", Lightbulb],
  ["Roadmap", "Rencanakan bacaan dan eksperimen berikutnya.", Route],
  ["Judul Skripsi/Tesis", "Buat opsi judul yang lebih tajam.", Sparkles],
  ["APA / IEEE / BibTeX", "Format sitasi untuk export.", Map]
] as const;

export default function AssistantPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-6xl space-y-5">
        <header>
          <p className="text-sm text-muted">Asisten Jurnalens</p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight">Aksi riset</h1>
        </header>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
          <Card className="grid gap-3 sm:grid-cols-2">
            {tools.map(([label, copy, Icon]) => (
              <ActionButton key={label} message={`Aksi ${label} siap. Pilih paper atau isi brief untuk menjalankan.`} className="h-auto w-full justify-start rounded-lg border-white/10 bg-white/[0.045] p-4 text-left hover:border-accent/30 hover:bg-white/[0.075]">
                <span className="block">
                  <Icon className="h-5 w-5 text-accent" />
                  <span className="mt-4 block font-semibold">{label}</span>
                  <span className="mt-2 block text-sm font-normal leading-6 text-muted">{copy}</span>
                </span>
              </ActionButton>
            ))}
          </Card>
          <Card className="space-y-4">
            <div>
              <h2 className="font-semibold">Workspace draft</h2>
              <p className="mt-2 text-sm leading-6 text-muted">Pilih paper dari pencarian, lalu jalankan aksi untuk membuat output berbasis sumber.</p>
            </div>
            <textarea className="min-h-52 w-full resize-none rounded-md border border-white/10 bg-black/20 p-3 text-sm outline-none placeholder:text-muted focus:border-accent/40" placeholder="Pertanyaan riset, outline, atau catatan paper..." />
            <ActionButton className="w-full bg-white text-black hover:bg-white/90" message="Generator siap. Sambungkan pilihan paper untuk output berbasis sumber.">Generate</ActionButton>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
