import { Bell, Database, KeyRound, Link2, UserRound } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const settings = [
  ["Profile", "Name, email, and workspace identity.", UserRound],
  ["API endpoint", "Frontend points to Railway backend.", Link2],
  ["Source preferences", "OpenAlex, CORE, Crossref, and local index.", Database],
  ["AI provider", "OpenRouter key is stored only in backend env.", KeyRound],
  ["Notifications", "Topic and author digest preferences.", Bell]
] as const;

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-6xl space-y-5">
        <header>
          <p className="text-sm text-muted">Workspace control</p>
          <h1 className="mt-2 text-3xl font-semibold">Settings</h1>
        </header>
        <div className="grid gap-3 lg:grid-cols-2">
          {settings.map(([title, copy, Icon]) => (
            <Card key={title} className="flex items-start gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/[0.08] text-accent"><Icon className="h-5 w-5" /></div>
              <div className="min-w-0">
                <h2 className="font-semibold">{title}</h2>
                <p className="mt-1 text-sm leading-6 text-muted">{copy}</p>
              </div>
            </Card>
          ))}
        </div>
        <Card className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold">Production health</h2>
            <p className="mt-1 text-sm text-muted">Railway backend and external academic APIs are configured from environment variables.</p>
          </div>
          <Button className="bg-white text-black hover:bg-white/90">Check health</Button>
        </Card>
      </div>
    </AppShell>
  );
}
