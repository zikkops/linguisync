import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Shared dark navy intro band used at the top of secondary marketing pages — echoes the Home hero's gradient + glow treatment at a smaller scale. */
export function IntroBand({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section className={cn("relative overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-900 py-16", className)}>
      <div className="glow-blob h-72 w-72 bg-accent-500/15" style={{ top: "-6rem", right: "-4rem" }} />
      <div className="glow-blob h-64 w-64 bg-navy-500/25" style={{ bottom: "-8rem", left: "-6rem" }} />
      <div className="relative mx-auto max-w-7xl px-6">{children}</div>
    </section>
  );
}
