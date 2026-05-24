import { BookOpenCheck, FileText, Lightbulb, Map, MessageSquareText, PenLine, Route, Sparkles, Target, Wand2 } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tools = [
  ["Summarize", "Condense a paper into contribution, method, finding.", FileText],
  ["Explain Simply", "Turn dense abstracts into plain language.", MessageSquareText],
  ["Compare Papers", "Line up methods, datasets, and claims.", BookOpenCheck],
  ["Literature Review", "Draft a grounded section from selected papers.", PenLine],
  ["Research Gap", "Find open problems and weak evidence.", Target],
  ["Methodology", "Extract variables, samples, and procedures.", Wand2],
  ["Novelty", "Score originality against nearby work.", Lightbulb],
  ["Roadmap", "Plan next readings and experiments.", Route],
  ["Thesis Titles", "Generate sharper title directions.", Sparkles],
  ["APA / IEEE / BibTeX", "Format citations for export.", Map]
] as const;

export default function AssistantPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-6xl space-y-5">
        <header>
          <p className="text-sm text-muted">Jurnalens assistant</p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight">Research actions</h1>
        </header>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
          <Card className="grid gap-3 sm:grid-cols-2">
            {tools.map(([label, copy, Icon]) => (
              <button key={label} className="group rounded-lg border border-white/10 bg-white/[0.045] p-4 text-left transition hover:-translate-y-0.5 hover:border-accent/30 hover:bg-white/[0.075]">
                <Icon className="h-5 w-5 text-accent" />
                <h2 className="mt-4 font-semibold">{label}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{copy}</p>
              </button>
            ))}
          </Card>
          <Card className="space-y-4">
            <div>
              <h2 className="font-semibold">Draft workspace</h2>
              <p className="mt-2 text-sm leading-6 text-muted">Select papers from search, then run one of the actions to create a grounded output here.</p>
            </div>
            <textarea className="min-h-52 w-full resize-none rounded-md border border-white/10 bg-black/20 p-3 text-sm outline-none placeholder:text-muted focus:border-accent/40" placeholder="Research question, outline, or selected paper notes..." />
            <Button className="w-full bg-white text-black hover:bg-white/90">Generate</Button>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
