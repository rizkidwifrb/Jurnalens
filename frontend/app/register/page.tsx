"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandLogo } from "@/components/brand/brand-logo";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-4">
      <div className="premium-grid pointer-events-none absolute inset-0 opacity-60" />
      <Card className="relative w-full max-w-md space-y-6 p-7">
        <Link href="/" className="inline-flex items-center gap-3">
          <BrandLogo />
        </Link>
        <div>
          <h1 className="text-3xl font-semibold">Create workspace</h1>
          <p className="mt-2 text-sm text-muted">Free local account for bookmarks, history, PDFs, and AI outputs.</p>
        </div>
        <div className="space-y-3">
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button className="w-full bg-white text-black" onClick={async () => { await apiFetch("/auth/register", { method: "POST", body: JSON.stringify({ name, email, password }) }); setDone(true); }}>Create account</Button>
        {done && <p className="text-sm text-lime">Account created. You can log in now.</p>}
      </Card>
    </main>
  );
}
