import type { JobStatus } from "@/types";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS: { key: string; label: string; statuses: JobStatus[] }[] = [
  { key: "requested", label: "Requested", statuses: ["requested"] },
  { key: "quoted", label: "Quoted", statuses: ["quoted"] },
  { key: "agreed", label: "Agreed & Deposit", statuses: ["agreement_confirmed", "deposit_paid"] },
  { key: "in_progress", label: "In Progress", statuses: ["in_progress"] },
  { key: "delivered", label: "Delivered", statuses: ["delivered", "final_payment_paid"] },
  { key: "released", label: "Released", statuses: ["released", "completed"] },
];

const TERMINAL_BRANCHES: JobStatus[] = ["disputed", "cancelled", "refunded"];

export function JobStatusTimeline({ status }: { status: JobStatus }) {
  if (TERMINAL_BRANCHES.includes(status)) {
    return (
      <div className="rounded-2xl bg-status-danger-bg px-4 py-3 text-sm font-medium text-status-danger">
        This job&apos;s normal timeline was interrupted — status: {status}
      </div>
    );
  }

  const activeIndex = STEPS.findIndex((s) => s.statuses.includes(status));

  return (
    <div className="flex items-stretch">
      {STEPS.map((step, i) => {
        const isDone = i < activeIndex;
        const isActive = i === activeIndex;
        return (
          <div key={step.key} className="flex flex-1 flex-col items-center">
            <div className="flex w-full items-center">
              <div
                className={cn(
                  "h-px flex-1",
                  i === 0 ? "opacity-0" : isDone || isActive ? "bg-navy-700" : "bg-navy-100"
                )}
              />
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                  isDone
                    ? "bg-navy-900 text-white"
                    : isActive
                      ? "bg-white text-navy-900 ring-2 ring-navy-900"
                      : "bg-navy-50 text-navy-300"
                )}
              >
                {isDone ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <div
                className={cn(
                  "h-px flex-1",
                  i === STEPS.length - 1 ? "opacity-0" : isDone ? "bg-navy-700" : "bg-navy-100"
                )}
              />
            </div>
            <span
              className={cn(
                "mt-2 px-1 text-center text-[11px] font-medium",
                isActive ? "text-navy-900" : isDone ? "text-navy-600" : "text-navy-300"
              )}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
