"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, ShieldCheck } from "lucide-react";
import { BrandLogo } from "@/components/brand/brand-logo";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { isFirebaseReady, loginWithGoogle } from "@/lib/firebase";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  async function handleRegister() {
    await apiFetch("/auth/register", { method: "POST", body: JSON.stringify({ name, email, password }) });
    setMessage("Akun berhasil dibuat. Kamu bisa login sekarang.");
  }

  async function handleGoogle() {
    try {
      await loginWithGoogle();
      setMessage("Akun Google berhasil tersambung di browser.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Google sign-in gagal.");
    }
  }

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-4 py-10">
      <div className="premium-grid pointer-events-none absolute inset-0 opacity-50" />
      <Card className="relative w-full max-w-md space-y-5 p-6">
        <Link href="/" className="inline-flex items-center gap-3">
          <BrandLogo />
        </Link>
        <div>
          <h1 className="text-2xl font-semibold">Buat workspace</h1>
          <p className="mt-2 text-sm leading-6 text-muted">Simpan bookmark, riwayat pencarian, PDF, dan output AI.</p>
        </div>
        <Button className="w-full bg-white text-black hover:bg-white/90" onClick={handleGoogle}>
          <ShieldCheck className="h-4 w-4" /> Daftar dengan Google
        </Button>
        {!isFirebaseReady() && <p className="text-xs leading-5 text-rose">Firebase belum lengkap. Isi authDomain, projectId, dan appId di Vercel Environment Variables.</p>}
        <div className="flex items-center gap-3 text-xs text-muted">
          <span className="h-px flex-1 bg-white/10" /> atau email <span className="h-px flex-1 bg-white/10" />
        </div>
        <div className="space-y-3">
          <Input placeholder="Nama" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Kata sandi" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button className="w-full" onClick={handleRegister}><Mail className="h-4 w-4" />Daftar dengan Email</Button>
        {message && <p className="rounded-md border border-white/10 bg-white/[0.05] p-3 text-sm leading-6 text-muted">{message}</p>}
        <p className="text-center text-sm text-muted">Sudah punya akun? <Link href="/login" className="text-accent">Masuk</Link></p>
      </Card>
    </main>
  );
}
