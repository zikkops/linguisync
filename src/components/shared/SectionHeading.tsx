import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" ? "text-center mx-auto" : "text-left", "max-w-2xl", className)}>
      {eyebrow && (
        <p className="text-sm font-semibold tracking-wide text-navy-500 mb-2">{eyebrow}</p>
      )}
      <h2 className="text-3xl md:text-4xl font-semibold text-navy-950">{title}</h2>
      {subtitle && <p className="mt-3 text-navy-500 text-base md:text-lg">{subtitle}</p>}
    </div>
  );
}
