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
          <p className="text-sm text-muted">ID Paper {id}</p>
          <h1 className="mt-2 text-3xl font-semibold">Paper Detail</h1>
        </header>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
          <Card className="space-y-5">
            <div className="flex items-center gap-2 text-sm text-accent"><BookOpenText className="h-4 w-4" /> Tampilan metadata</div>
            <h2 className="text-2xl font-semibold">Paper akademik terpilih</h2>
            <p className="max-w-3xl text-sm leading-7 text-muted">Judul, abstrak, penulis, sumber, DOI, sitasi, dan metadata paper terkait dimuat dari backend saat paper asli dipilih.</p>
            <div className="flex flex-wrap gap-2">
              <Button><Sparkles className="h-4 w-4" />Jelaskan</Button>
              <Button><Download className="h-4 w-4" />Sitasi</Button>
              <Button className="bg-white text-black hover:bg-white/90"><ExternalLink className="h-4 w-4" />Buka sumber</Button>
            </div>
          </Card>
          <Card className="space-y-4">
            <BarChart3 className="h-5 w-5 text-accent" />
            <h2 className="font-semibold">Intelijen Sitasi</h2>
            <div className="grid gap-2 text-sm text-muted">
              <p>Referensi berpengaruh</p>
              <p>Paper yang mengutip</p>
              <p>Graph penulis</p>
              <p>Graph topik</p>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
