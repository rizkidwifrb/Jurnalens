import { Download, ExternalLink, FolderOpen, GitCompare, Star } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const saved = [
  ["Student mental health prediction", "Saved from live search", "APA"],
  ["Digital communication in higher education", "Ready for comparison", "BibTeX"],
  ["Multimodal learning analytics", "Needs methodology extraction", "IEEE"]
] as const;

export default function BookmarksPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-6xl space-y-5">
        <header>
          <p className="text-sm text-muted">Library</p>
          <h1 className="mt-2 text-3xl font-semibold">Bookmarks</h1>
        </header>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="space-y-3">
            {saved.map(([title, status, format]) => (
              <Card key={title} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="mb-2 inline-flex items-center gap-1 rounded-md bg-accent/10 px-2 py-1 text-xs text-accent"><Star className="h-3 w-3" /> Saved</div>
                  <h2 className="font-semibold">{title}</h2>
                  <p className="mt-2 text-sm text-muted">{status}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button className="h-9 px-3"><GitCompare className="h-4 w-4" />Compare</Button>
                  <Button className="h-9 px-3"><Download className="h-4 w-4" />{format}</Button>
                </div>
              </Card>
            ))}
          </div>
          <Card className="space-y-4">
            <FolderOpen className="h-6 w-6 text-accent" />
            <h2 className="font-semibold">Collections</h2>
            <div className="space-y-2 text-sm text-muted">
              <p>Thesis background</p>
              <p>Methodology references</p>
              <p>High-citation papers</p>
            </div>
            <Button className="w-full"><ExternalLink className="h-4 w-4" />Open export queue</Button>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
