import { BookOpen, PenLine, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function BrandLogo({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <div className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-lg border border-white/15 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(206,222,232,0.78)_45%,rgba(137,214,255,0.28))] text-[#071018] shadow-[0_18px_55px_rgba(111,213,255,0.22)]">
        <BookOpen className="absolute left-1.5 top-2 h-5 w-5 opacity-75" strokeWidth={2.4} />
        <PenLine className="absolute bottom-2 right-1.5 h-5 w-5 opacity-75" strokeWidth={2.4} />
        <Search className="relative h-6 w-6 rounded-full bg-white/30 p-0.5" strokeWidth={2.8} />
      </div>
      {!compact && (
        <span className="min-w-0">
          <span className="block text-[1.05rem] font-semibold leading-tight tracking-normal text-foreground">Jurnalens</span>
          <span className="block text-xs leading-tight text-muted">Academic AI Lens</span>
        </span>
      )}
    </div>
  );
}
