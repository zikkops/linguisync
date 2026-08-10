import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/types";
import { SERVICE_ICONS } from "@/lib/constants";

export function ServiceCard({ service, detailed = false }: { service: Service; detailed?: boolean }) {
  const Icon = SERVICE_ICONS[service.slug];
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-sm shadow-navy-900/5 transition-all duration-200 hover:-translate-y-1 hover:border-navy-200 hover:shadow-lg hover:shadow-navy-900/10"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 transition-colors group-hover:bg-navy-800">
        <Icon className="h-6 w-6 text-white" strokeWidth={1.75} />
      </div>
      <h3 className="mt-5 font-display text-lg font-semibold text-navy-950">{service.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-navy-500">{service.shortDescription}</p>

      {detailed && (
        <ul className="mt-4 flex flex-col gap-1.5">
          {service.whatsIncluded.slice(0, 3).map((item) => (
            <li key={item} className="text-xs text-navy-400">
              — {item}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 flex items-center justify-between border-t border-navy-100 pt-4 text-xs font-semibold text-navy-400">
        <span>{service.startingPrice}</span>
      </div>

      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 transition-colors group-hover:text-accent-600">
        Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
