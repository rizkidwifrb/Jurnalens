import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";

export default function BookmarksPage() {
  return <AppShell><h1 className="mb-6 text-3xl font-semibold">Bookmarks</h1><Card className="text-muted">Saved papers appear here with export and compare actions.</Card></AppShell>;
}
