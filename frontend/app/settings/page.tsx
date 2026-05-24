import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";

export default function SettingsPage() {
  return <AppShell><h1 className="mb-6 text-3xl font-semibold">Settings</h1><Card className="text-muted">Configure local API URL, profile, optional Groq key, and source preferences.</Card></AppShell>;
}
