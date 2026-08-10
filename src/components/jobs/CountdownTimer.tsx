import { Clock, AlertTriangle, FileClock } from "lucide-react";
import { countdownFrom } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  targetIso: string | null;
  variant?: "due" | "purge";
  className?: string;
}

/** Renders the due-date countdown (in_progress jobs) or the 30-day file-purge countdown (completed jobs). */
export function CountdownTimer({ targetIso, variant = "due", className }: CountdownTimerProps) {
  const { label, isPast } = countdownFrom(targetIso);
  const urgent = variant === "due" && !isPast && targetIso && new Date(targetIso).getTime() - new Date("2026-08-06T12:00:00Z").getTime() < 1000 * 60 * 60 * 24;

  const Icon = variant === "purge" ? FileClock : isPast ? AlertTriangle : Clock;
  const title = variant === "purge" ? "Files available until" : isPast ? "Overdue by" : "Due in";

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full px-3.5 py-2",
        isPast && variant === "due"
          ? "bg-status-danger-bg text-status-danger"
          : urgent
            ? "bg-accent-50 text-accent-700"
            : "bg-navy-50 text-navy-700",
        className
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="text-xs font-medium">{title}</span>
      <span className="text-sm font-display font-semibold">{label}</span>
    </div>
  );
}
