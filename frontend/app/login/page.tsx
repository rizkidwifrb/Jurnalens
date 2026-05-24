"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BrandLogo } from "@/components/brand/brand-logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { login } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-4">
      <div className="premium-grid pointer-events-none absolute inset-0 opacity-60" />
      <Card className="relative w-full max-w-md space-y-6 p-7">
        <Link href="/" className="inline-flex items-center gap-3">
          <BrandLogo />
        </Link>
        <div>
          <h1 className="text-3xl font-semibold">Welcome back</h1>
          <p className="mt-2 text-sm text-muted">Continue your Jurnalens workspace.</p>
        </div>
        <div className="space-y-3">
          <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button className="w-full bg-white text-black" onClick={async () => { await login(email, password); router.push("/dashboard"); }}>Login</Button>
        <p className="text-center text-sm text-muted">No account? <Link href="/register" className="text-accent">Register</Link></p>
      </Card>
    </main>
  );
}
