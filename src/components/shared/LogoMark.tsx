import { cn } from "@/lib/utils";

/**
 * The "LinguiSync" wordmark, split across two fonts to match the animated hero
 * title: "Lingui" stays in the surrounding italic Cormorant Garamond, "Sync"
 * switches to upright Inter. Drop this inside whatever element already carries
 * the `font-display` sizing/color (a nav Link, a heading, etc.).
 */
export function LogoMark({ syncClassName = "text-accent-500" }: { syncClassName?: string }) {
  return (
    <>
      Lingui
      <span className={cn("font-sans not-italic font-semibold", syncClassName)}>Sync</span>
    </>
  );
}
