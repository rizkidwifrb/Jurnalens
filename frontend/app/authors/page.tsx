import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";

export default function AuthorsPage() {
  return <AppShell><h1 className="mb-6 text-3xl font-semibold">Authors</h1><Card className="text-muted">Follow authors and inspect affiliations, papers, and collaboration graphs.</Card></AppShell>;
}
