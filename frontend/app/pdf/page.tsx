import { FileText, MessageSquareText, UploadCloud } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { UploadPanel } from "@/components/pdf/upload-panel";
import { Card } from "@/components/ui/card";

const docs = [
  ["Literature review draft.pdf", "Ready for chat", "18 pages"],
  ["Methodology notes.pdf", "Text extracted", "7 pages"]
] as const;

export default function PdfPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-6xl space-y-5">
        <header>
          <p className="text-sm text-muted">Document workspace</p>
          <h1 className="mt-2 text-3xl font-semibold">PDF Library</h1>
        </header>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
          <UploadPanel />
          <Card className="space-y-4">
            <div className="flex items-center gap-2">
              <UploadCloud className="h-5 w-5 text-accent" />
              <h2 className="font-semibold">Recent PDFs</h2>
            </div>
            <div className="space-y-3">
              {docs.map(([title, status, pages]) => (
                <div key={title} className="rounded-md border border-white/10 bg-white/[0.045] p-3">
                  <div className="flex items-start gap-3">
                    <FileText className="mt-0.5 h-4 w-4 text-accent" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{title}</p>
                      <p className="mt-1 text-xs text-muted">{status} · {pages}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-md border border-accent/20 bg-accent/10 p-3 text-sm leading-6 text-muted">
              <MessageSquareText className="mr-2 inline h-4 w-4 text-accent" />
              Page-aware chat appears after upload and extraction.
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
