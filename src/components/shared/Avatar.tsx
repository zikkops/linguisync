import { cn } from "@/lib/utils";

const SIZE_CLASSES = {
  sm: "h-8 w-8 text-xs",
  md: "h-11 w-11 text-sm",
  lg: "h-16 w-16 text-xl",
};

/** Circular avatar, shows first-initial only — never a full name/photo of a counterparty. */
export function Avatar({
  initial,
  size = "md",
  tone = "navy",
  className,
}: {
  initial: string;
  size?: keyof typeof SIZE_CLASSES;
  tone?: "navy" | "accent";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full font-display font-semibold shrink-0",
        tone === "navy" ? "bg-navy-900 text-white" : "bg-accent-100 text-accent-700 ring-2 ring-accent-500/40",
        SIZE_CLASSES[size],
        className
      )}
    >
      {initial}
    </div>
  );
}
