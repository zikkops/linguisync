import type { JobStatus } from "@/types";
import { JOB_STATUS_CONFIG, STATUS_TONE_CLASSES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function StatusBadge({ status, className }: { status: JobStatus; className?: string }) {
  const config = JOB_STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap",
        STATUS_TONE_CLASSES[config.tone],
        className
      )}
    >
      {config.label}
    </span>
  );
}
