"use client";

import { Upload } from "lucide-react";
import { Card } from "@/components/ui/card";

export function UploadPanel() {
  return (
    <Card className="flex min-h-56 flex-col items-center justify-center gap-4 border-dashed text-center">
      <div className="grid h-12 w-12 place-items-center rounded-lg bg-accent/10 text-accent">
        <Upload className="h-6 w-6" />
      </div>
      <div>
        <h2 className="text-lg font-semibold">Upload a PDF paper</h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted">Extract text, chunk pages, create embeddings, and chat with the document.</p>
      </div>
      <input type="file" accept="application/pdf" className="max-w-full rounded-md border border-border bg-black/20 p-2 text-sm" />
    </Card>
  );
}
