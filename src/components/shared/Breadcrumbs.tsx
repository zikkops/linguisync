import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ items, dark = false }: { items: { label: string; href?: string }[]; dark?: boolean }) {
  return (
    <nav className="flex items-center flex-wrap gap-1.5 text-xs font-semibold uppercase tracking-wide text-navy-400">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="h-3.5 w-3.5" />}
          {item.href ? (
            <Link href={item.href} className="hover:text-accent-600">
              {item.label}
            </Link>
          ) : (
            <span className={dark ? "text-white" : "text-navy-900"}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
