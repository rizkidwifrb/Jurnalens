import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";

export default function LiteratureReviewPage() {
  return <AppShell><h1 className="mb-6 text-3xl font-semibold">Literature Review Generator</h1><Card className="text-muted">Select papers, generate a grounded review, then export Markdown.</Card></AppShell>;
}
