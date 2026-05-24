import { FileText, ListChecks, PenLine, Sparkles } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const sections = ["Background", "Theoretical basis", "Method comparison", "Research gap", "Future work"];

export default function LiteratureReviewPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-6xl space-y-5">
        <header>
          <p className="text-sm text-muted">Draft builder</p>
          <h1 className="mt-2 text-3xl font-semibold">Literature Review</h1>
        </header>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
          <Card className="space-y-4">
            <div className="flex items-center gap-2">
              <PenLine className="h-5 w-5 text-accent" />
              <h2 className="font-semibold">Review brief</h2>
            </div>
            <input className="h-10 w-full rounded-md border border-white/10 bg-black/20 px-3 text-sm outline-none placeholder:text-muted focus:border-accent/40" placeholder="Topic or research question" />
            <textarea className="min-h-56 w-full resize-none rounded-md border border-white/10 bg-black/20 p-3 text-sm outline-none placeholder:text-muted focus:border-accent/40" placeholder="Paste selected paper titles, notes, or constraints..." />
            <div className="grid gap-2 sm:grid-cols-2">
              <Button><FileText className="h-4 w-4" />Markdown</Button>
              <Button className="bg-white text-black hover:bg-white/90"><Sparkles className="h-4 w-4" />Generate</Button>
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
