import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function MetricTile({
  icon: Icon,
  label,
  value,
  tone = "neutral",
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  tone?: "neutral" | "accent" | "danger";
}) {
  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-sm shadow-navy-900/5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-navy-400">{label}</p>
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg",
            tone === "accent" ? "bg-accent-50" : tone === "danger" ? "bg-status-danger-bg" : "bg-navy-50"
          )}
        >
          <Icon
            className={cn(
              "h-4 w-4",
              tone === "accent" ? "text-accent-600" : tone === "danger" ? "text-status-danger" : "text-navy-400"
            )}
          />
        </div>
      </div>
      <p className="mt-2 font-display text-3xl font-semibold text-navy-950">{value}</p>
    </div>
  );
}
