import { Activity } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { ActionButton } from "@/components/ui/action-button";
import { SettingsPanel } from "@/components/settings/settings-panel";

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-6xl space-y-5">
        <header>
          <p className="text-sm text-muted">Kontrol workspace</p>
          <h1 className="mt-2 text-3xl font-semibold">Pengaturan</h1>
        </header>
        <SettingsPanel />
        <Card className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold">Kesehatan produksi</h2>
            <p className="mt-1 text-sm text-muted">Backend Railway dan API akademik eksternal dikonfigurasi dari environment variables.</p>
          </div>
          <ActionButton className="bg-white text-black hover:bg-white/90" message="Cek health tersedia di /api/admin/external-health pada backend Railway.">
            <Activity className="h-4 w-4" /> Cek health
          </ActionButton>
        </Card>
      </div>
    </AppShell>
  );
}
