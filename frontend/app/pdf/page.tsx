import { AppShell } from "@/components/layout/app-shell";
import { UploadPanel } from "@/components/pdf/upload-panel";

export default function PdfPage() {
  return <AppShell><div className="space-y-6"><h1 className="text-3xl font-semibold">PDF Library</h1><UploadPanel /></div></AppShell>;
}
