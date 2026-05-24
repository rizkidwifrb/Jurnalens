"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, ShieldCheck } from "lucide-react";
import { BrandLogo } from "@/components/brand/brand-logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { login } from "@/lib/auth";
import { isFirebaseReady, loginWithGoogle } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  async function handleEmailLogin() {
    setMessage(null);
    await login(email, password);
    router.push("/dashboard");
  }

  async function handleGoogleLogin() {
    setMessage(null);
    try {
      await loginWithGoogle();
      setMessage("Login Google berhasil. Token Firebase tersimpan di browser.");
      router.push("/dashboard");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login Google gagal.");
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
          <h1 className="text-2xl font-semibold">Masuk ke Jurnalens</h1>
          <p className="mt-2 text-sm leading-6 text-muted">Gunakan email atau Google untuk membuka workspace riset.</p>
        </div>
        <div className="grid gap-2">
          <Button className="w-full bg-white text-black hover:bg-white/90" onClick={handleGoogleLogin}>
            <ShieldCheck className="h-4 w-4" /> Masuk dengan Google
          </Button>
          {!isFirebaseReady() && <p className="text-xs leading-5 text-rose">Firebase belum lengkap. Isi authDomain, projectId, dan appId di Vercel Environment Variables.</p>}
        </div>
        <div className="flex items-center gap-3 text-xs text-muted">
          <span className="h-px flex-1 bg-white/10" /> atau email <span className="h-px flex-1 bg-white/10" />
        </div>
        <div className="space-y-3">
          <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Kata sandi" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button className="w-full" onClick={handleEmailLogin}><Mail className="h-4 w-4" />Masuk dengan Email</Button>
        {message && <p className="rounded-md border border-white/10 bg-white/[0.05] p-3 text-sm leading-6 text-muted">{message}</p>}
        <p className="text-center text-sm text-muted">Belum punya akun? <Link href="/register" className="text-accent">Daftar</Link></p>
      </Card>
    </main>
  );
}
