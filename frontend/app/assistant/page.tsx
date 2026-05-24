import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tools = ["Summarize", "Explain Simply", "Compare Papers", "Literature Review", "Research Gap", "Methodology", "Novelty", "Roadmap", "Thesis Titles", "APA / IEEE / BibTeX"];

export default function AssistantPage() {
  return <AppShell><div className="space-y-6"><h1 className="text-3xl font-semibold">AI Research Assistant</h1><Card className="grid gap-3 md:grid-cols-2">{tools.map((tool) => <Button key={tool}>{tool}</Button>)}</Card></div></AppShell>;
}
