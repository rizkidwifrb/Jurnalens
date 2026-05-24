"use client";

import { AppShell } from "@/components/layout/app-shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card } from "@/components/ui/card";
import { SearchBox } from "@/components/search/search-box";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-6xl space-y-5">
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
          <section className="space-y-5">
            <p className="text-sm text-muted">Workspace Jurnalens siap dipakai.</p>
            <h1 className="text-balance max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">Temukan inti riset tanpa tenggelam di noise akademik.</h1>
            <SearchBox large onSearch={(query) => { window.location.href = `/search?q=${encodeURIComponent(query)}`; }} />
          </section>
          <Card className="flex flex-col justify-between">
            <div>
              <p className="text-sm text-muted">Logika rekomendasi</p>
              <h2 className="mt-2 text-xl font-semibold">Feed riset</h2>
            </div>
            <p className="mt-6 text-sm leading-6 text-muted">Menggabungkan riwayat pencarian, bookmark, topik yang diikuti, sinyal penulis, recency, dan dampak sitasi.</p>
          </Card>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Paper terindeks" value="Lokal" />
          <StatCard label="Sumber data" value="4" />
          <StatCard label="Alat AI" value="8" />
          <StatCard label="PDF chat" value="Siap" />
        </div>
        <div className="grid gap-3 lg:grid-cols-3">
          {[
            ["Paper berdampak terbaru", "Cari topik apa pun untuk memunculkan hasil akademik live."],
            ["Update topik diikuti", "Ikuti topik dari halaman Topik untuk membentuk rekomendasi."],
            ["Literature review tersimpan", "Buat review dari Asisten, lalu simpan draft di sini."]
          ].map(([title, copy]) => (
            <Card key={title} className="min-h-32"><h2 className="font-semibold">{title}</h2><p className="mt-3 text-sm leading-6 text-muted">{copy}</p></Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
