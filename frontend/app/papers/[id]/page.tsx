import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function PaperDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <AppShell>
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <Card className="space-y-4">
          <p className="text-sm text-muted">Paper ID {id}</p>
          <h1 className="text-3xl font-semibold">Paper Detail</h1>
          <p className="text-muted">Fetches title, abstract, authors, source, DOI, citations, related papers, citation intelligence, and graph metadata from the backend.</p>
          <div className="flex flex-wrap gap-2"><Button>Explain Simply</Button><Button>Summarize</Button><Button>Export Citation</Button></div>
        </Card>
        <Card><h2 className="font-semibold">Citation Intelligence</h2><p className="mt-2 text-sm text-muted">Influential citations, cited-by, references, author graph, and topic graph appear here when source metadata is available.</p></Card>
      </div>
    </AppShell>
  );
}
