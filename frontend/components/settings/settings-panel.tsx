"use client";

import { useState } from "react";
import { Bell, Database, KeyRound, Link2, UserRound } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ActionButton } from "@/components/ui/action-button";

const settings = [
  ["Profil", "Nama, email, dan identitas workspace.", UserRound],
  ["Endpoint API", "Frontend terhubung ke backend Railway.", Link2],
  ["Sumber Data", "OpenAlex, CORE, Crossref, dan index lokal.", Database],
  ["Penyedia AI", "OpenRouter disimpan di environment backend.", KeyRound],
  ["Notifikasi", "Preferensi digest topik dan penulis.", Bell]
] as const;

export function SettingsPanel() {
  const [language, setLanguage] = useState<"id" | "en">("id");

  return (
    <div className="space-y-5">
      <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-semibold">Bahasa</h2>
          <p className="mt-1 text-sm text-muted">Default aplikasi memakai Bahasa Indonesia. English tersedia untuk tampilan internasional.</p>
        </div>
        <div className="grid grid-cols-2 rounded-lg border border-white/10 bg-black/20 p-1">
          <button onClick={() => setLanguage("id")} className={`rounded-md px-4 py-2 text-sm transition ${language === "id" ? "bg-white text-black" : "text-muted hover:text-foreground"}`}>Indonesia</button>
          <button onClick={() => setLanguage("en")} className={`rounded-md px-4 py-2 text-sm transition ${language === "en" ? "bg-white text-black" : "text-muted hover:text-foreground"}`}>English</button>
        </div>
      </Card>

      <div className="grid gap-3 lg:grid-cols-2">
        {settings.map(([title, copy, Icon]) => (
          <Card key={title} className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/[0.08] text-accent"><Icon className="h-5 w-5" /></div>
              <div className="min-w-0">
                <h2 className="font-semibold">{title}</h2>
                <p className="mt-1 text-sm leading-6 text-muted">{copy}</p>
              </div>
            </div>
            <ActionButton className="h-9 shrink-0 px-3" message={`${title} dibuka. Panel detail siap disambungkan ke backend.`}>Buka</ActionButton>
          </Card>
        ))}
      </div>
    </div>
  );
}
