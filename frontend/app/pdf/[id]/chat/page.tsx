import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function PdfChatPage() {
  return <AppShell><div className="space-y-5"><h1 className="text-3xl font-semibold">PDF Chat</h1><Card className="min-h-96 text-muted">Grounded answers with page citations will appear here.</Card><Input placeholder="Ask about methodology, limitations, results..." /></div></AppShell>;
}
