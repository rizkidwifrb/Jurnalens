import { BrainCircuit, CheckCircle2, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";

export function AnswerPanel({ answer, citations }: { answer?: string | null; citations?: Array<{ index: number; title: string; doi: string }> }) {
  return (
    <Card className="space-y-5 overflow-hidden">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold"><BrainCircuit className="h-4 w-4 text-accent" /> Jurnalens Synthesis</div>
        <span className="inline-flex items-center gap-1 rounded-md bg-lime/10 px-2 py-1 text-xs text-lime"><CheckCircle2 className="h-3 w-3" /> Grounded</span>
      </div>
      <p className="whitespace-pre-wrap text-sm leading-7 text-[#c7d2df]">{answer || "Run a search to generate a grounded answer from indexed and live academic sources."}</p>
      <div className="space-y-2">
        {(citations ?? []).map((citation) => (
          <div key={citation.index} className="rounded-md border border-white/10 bg-black/20 p-3 text-xs leading-5 text-muted">
            <Quote className="mr-1 inline h-3 w-3 text-accent" />
            <span className="text-foreground">[{citation.index}]</span> {citation.title} <span className="break-all text-muted/80">DOI {citation.doi}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
