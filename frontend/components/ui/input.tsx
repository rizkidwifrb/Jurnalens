import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("h-11 w-full rounded-md border border-border bg-black/20 px-3 text-sm outline-none placeholder:text-muted focus:focus-ring", className)} {...props} />;
}
