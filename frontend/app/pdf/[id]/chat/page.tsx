import { Bot, FileText, MessageSquareText, Send } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PdfChatPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-5xl space-y-5">
        <header>
          <p className="text-sm text-muted">Document chat</p>
          <h1 className="mt-2 text-3xl font-semibold">PDF Chat</h1>
        </header>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
          <Card className="flex min-h-80 flex-col justify-between">
            <div className="space-y-4">
              <div className="max-w-[85%] rounded-lg border border-white/10 bg-white/[0.055] p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold"><Bot className="h-4 w-4 text-accent" /> Jurnalens</div>
                <p className="text-sm leading-6 text-muted">Upload or select a PDF to ask page-aware questions about methodology, findings, limitations, and citations.</p>
              </div>
            </div>
            <div className="mt-5 flex gap-2">
              <Input placeholder="Ask about methodology, limitations, results..." />
              <Button className="h-11 bg-white text-black hover:bg-white/90"><Send className="h-4 w-4" /></Button>
            </div>
          </Card>
          <Card className="space-y-4">
            <FileText className="h-5 w-5 text-accent" />
            <h2 className="font-semibold">Document context</h2>
            <div className="space-y-2 text-sm text-muted">
              <p>Pages indexed: pending</p>
              <p>Chunks embedded: pending</p>
              <p>Citations: page-aware</p>
            </div>
            <Button className="w-full"><MessageSquareText className="h-4 w-4" />Summarize PDF</Button>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
