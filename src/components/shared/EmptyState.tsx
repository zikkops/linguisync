import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-navy-200 bg-navy-50/30 px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm shadow-navy-900/5">
        <Icon className="h-6 w-6 text-navy-300" strokeWidth={1.75} />
      </div>
      <h3 className="font-display font-semibold text-navy-900">{title}</h3>
      <p className="max-w-sm text-sm text-navy-400">{description}</p>
      {action}
    </div>
  );
}
