import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function BrandLogo({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <div className={cn("inline-flex min-w-0 items-center gap-3", className)}>
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/15 bg-[linear-gradient(135deg,#f8fbff,#aebfcb_52%,#7ddcff)] text-[#071018] shadow-[0_12px_36px_rgba(111,213,255,0.22)]">
        <Search className="h-5 w-5" strokeWidth={2.7} />
      </div>
      {!compact && (
        <span className="min-w-0 leading-none">
          <span className="block text-sm font-semibold leading-tight tracking-normal text-foreground">Jurnalens</span>
          <span className="block text-xs leading-tight text-muted">Academic AI Lens</span>
        </span>
      )}
    </div>
  );
}
