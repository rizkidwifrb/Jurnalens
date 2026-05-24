import { Building2, Network, Plus, UserRoundCheck } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { ActionButton } from "@/components/ui/action-button";

const authors = [
  ["Siti Rahmawati", "Universitas Indonesia", "24 papers"],
  ["Rizal Pratama", "Institut Teknologi Bandung", "18 papers"],
  ["Maya Chen", "National University of Singapore", "31 papers"],
  ["Andi Saputra", "Universitas Gadjah Mada", "15 papers"]
] as const;

export default function AuthorsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-6xl space-y-5">
        <header>
          <p className="text-sm text-muted">Graf orang</p>
          <h1 className="mt-2 text-3xl font-semibold">Penulis</h1>
        </header>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {authors.map(([name, affiliation, count]) => (
            <Card key={name} className="space-y-4">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-white text-black"><UserRoundCheck className="h-5 w-5" /></div>
              <div>
                <h2 className="font-semibold">{name}</h2>
                <p className="mt-2 flex items-center gap-1 text-sm leading-6 text-muted"><Building2 className="h-3.5 w-3.5" />{affiliation}</p>
                <p className="mt-1 text-xs text-muted">{count}</p>
              </div>
              <ActionButton className="w-full" message={`Penulis ${name} ditambahkan ke daftar pantauan.`}><Plus className="h-4 w-4" />Ikuti</ActionButton>
            </Card>
          ))}
        </div>
        <Card className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold">Peta kolaborasi</h2>
            <p className="mt-1 text-sm text-muted">Ikuti penulis untuk membuka jaringan co-author dan sitasi terdekat.</p>
          </div>
          <ActionButton message="Graf kolaborasi dibuka."><Network className="h-4 w-4" />Buka graph</ActionButton>
        </Card>
      </div>
    </AppShell>
  );
}
