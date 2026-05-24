"use client";

import { Upload } from "lucide-react";
import { Card } from "@/components/ui/card";

export function UploadPanel() {
  return (
    <Card className="flex min-h-64 flex-col items-center justify-center gap-4 text-center">
      <Upload className="h-10 w-10 text-accent" />
      <div>
        <h2 className="text-xl font-semibold">Upload a PDF paper</h2>
        <p className="mt-2 text-sm text-muted">The backend extracts text with PyMuPDF, chunks it, embeds it, and enables page-aware chat.</p>
      </div>
      <input type="file" accept="application/pdf" className="rounded-md border border-border p-2 text-sm" />
    </Card>
  );
}
