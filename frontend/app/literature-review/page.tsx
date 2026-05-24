import { FileText, ListChecks, PenLine, Sparkles } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { ActionButton } from "@/components/ui/action-button";

const sections = ["Latar belakang", "Landasan teori", "Perbandingan metode", "Research gap", "Arah riset"];

export default function LiteratureReviewPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-6xl space-y-5">
        <header>
          <p className="text-sm text-muted">Pembuat draft</p>
          <h1 className="mt-2 text-3xl font-semibold">Literature Review</h1>
        </header>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
          <Card className="space-y-4">
            <div className="flex items-center gap-2">
              <PenLine className="h-5 w-5 text-accent" />
              <h2 className="font-semibold">Brief review</h2>
            </div>
            <input className="h-10 w-full rounded-md border border-white/10 bg-black/20 px-3 text-sm outline-none placeholder:text-muted focus:border-accent/40" placeholder="Topik atau pertanyaan riset" />
            <textarea className="min-h-56 w-full resize-none rounded-md border border-white/10 bg-black/20 p-3 text-sm outline-none placeholder:text-muted focus:border-accent/40" placeholder="Tempel judul paper, catatan, atau batasan review..." />
            <div className="grid gap-2 sm:grid-cols-2">
              <ActionButton message="Export Markdown disiapkan."><FileText className="h-4 w-4" />Markdown</ActionButton>
              <ActionButton className="bg-white text-black hover:bg-white/90" message="Generator literature review siap dijalankan setelah paper dipilih."><Sparkles className="h-4 w-4" />Generate</ActionButton>
            </div>
          </Card>
          <Card className="space-y-4">
            <div className="flex items-center gap-2">
              <ListChecks className="h-5 w-5 text-accent" />
              <h2 className="font-semibold">Outline</h2>
            </div>
            <div className="space-y-2">
              {sections.map((section, index) => (
                <div key={section} className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.045] px-3 py-2 text-sm">
                  <span className="grid h-6 w-6 place-items-center rounded-md bg-white/[0.08] text-xs text-muted">{index + 1}</span>
                  {section}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
