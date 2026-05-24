import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";

export default function TopicsPage() {
  return <AppShell><h1 className="mb-6 text-3xl font-semibold">Topics</h1><Card className="text-muted">Follow topics to improve recommendations and notifications.</Card></AppShell>;
}
