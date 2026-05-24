"use client";

import { ButtonHTMLAttributes, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ActionButton({
  message,
  className,
  children,
  onClick,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { message: string }) {
  const [active, setActive] = useState(false);

  return (
    <span className="relative inline-flex">
      <Button
        className={className}
        {...props}
        onClick={(event) => {
          onClick?.(event);
          setActive(true);
          window.setTimeout(() => setActive(false), 2200);
        }}
      >
        {children}
      </Button>
      <span
        className={cn(
          "pointer-events-none absolute left-1/2 top-full z-50 mt-2 w-56 -translate-x-1/2 rounded-md border border-white/10 bg-[#101720] px-3 py-2 text-center text-xs leading-5 text-foreground opacity-0 shadow-[0_18px_50px_rgba(0,0,0,0.35)] transition",
          active && "opacity-100"
        )}
      >
        {message}
      </span>
    </span>
  );
}
