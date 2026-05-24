import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn("inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-white/10 bg-white/[0.075] px-4 text-sm font-medium text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-200 hover:-translate-y-0.5 hover:bg-white/[0.12] hover:shadow-[0_14px_34px_rgba(0,0,0,0.24)] focus-visible:focus-ring disabled:translate-y-0 disabled:opacity-50", className)}
      {...props}
    />
  );
}
