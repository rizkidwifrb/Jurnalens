import { AppShell } from "@/components/layout/app-shell";
import { ResearchGraph } from "@/components/graph/research-graph";

export default function GraphPage() {
  return <AppShell><h1 className="mb-6 text-3xl font-semibold">Research Graph</h1><ResearchGraph /></AppShell>;
}
