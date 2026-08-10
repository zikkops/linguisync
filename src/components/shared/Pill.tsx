import { cn } from "@/lib/utils";

const TONE_CLASSES = {
  success: "bg-status-success-bg text-status-success",
  progress: "bg-status-progress-bg text-status-progress",
  info: "bg-status-info-bg text-status-info",
  neutral: "bg-status-neutral-bg text-status-neutral",
  danger: "bg-status-danger-bg text-status-danger",
} as const;

export function Pill({ tone, children, className }: { tone: keyof typeof TONE_CLASSES; children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-medium capitalize", TONE_CLASSES[tone], className)}>
      {children}
    </span>
  );
}
