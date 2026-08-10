import type { PortfolioItem } from "@/types";
import { SERVICE_ICONS } from "@/lib/constants";

export function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  if (items.length === 0) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => {
        const Icon = SERVICE_ICONS[item.serviceSlug];
        return (
          <div key={item.id} className="overflow-hidden rounded-2xl border border-navy-100 shadow-sm shadow-navy-900/5">
            <div className="flex h-28 items-center justify-center bg-navy-50">
              <Icon className="h-8 w-8 text-navy-300" strokeWidth={1.5} />
            </div>
            <div className="p-4">
              <p className="font-display font-semibold text-navy-950">{item.title}</p>
              <p className="mt-1 text-sm text-navy-500">{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
