import { BarChart3, BookOpenText, Download, ExternalLink, Sparkles } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function PaperDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <AppShell>
      <div className="mx-auto max-w-6xl space-y-5">
        <header>
          <p className="text-sm text-muted">Paper ID {id}</p>
          <h1 className="mt-2 text-3xl font-semibold">Paper Detail</h1>
        </header>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
          <Card className="space-y-5">
            <div className="flex items-center gap-2 text-sm text-accent"><BookOpenText className="h-4 w-4" /> Metadata view</div>
            <h2 className="text-2xl font-semibold">Selected academic paper</h2>
            <p className="max-w-3xl text-sm leading-7 text-muted">Title, abstract, authors, source, DOI, citations, and related paper metadata load here from the backend when a real paper is selected.</p>
            <div className="flex flex-wrap gap-2">
              <Button><Sparkles className="h-4 w-4" />Explain</Button>
              <Button><Download className="h-4 w-4" />Citation</Button>
              <Button className="bg-white text-black hover:bg-white/90"><ExternalLink className="h-4 w-4" />Open source</Button>
            </div>
          </Card>
          <Card className="space-y-4">
            <BarChart3 className="h-5 w-5 text-accent" />
            <h2 className="font-semibold">Citation Intelligence</h2>
            <div className="grid gap-2 text-sm text-muted">
              <p>Influential references</p>
              <p>Cited-by papers</p>
              <p>Author graph</p>
              <p>Topic graph</p>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
