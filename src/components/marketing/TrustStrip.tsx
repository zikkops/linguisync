import { ShieldCheck, Lock, BadgeCheck, Zap } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";

const ITEMS = [
  { icon: Lock, label: "Escrow-protected payments" },
  { icon: ShieldCheck, label: "Files locked until you pay" },
  { icon: BadgeCheck, label: "Rated, reviewed workers" },
  { icon: Zap, label: "Fast turnaround" },
];

export function TrustStrip() {
  return (
    <section className="bg-white pb-16">
      <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-3 px-6">
        {ITEMS.map(({ icon: Icon, label }, i) => (
          <Reveal key={label} delayMs={i * 90}>
            <div className="flex items-center gap-2.5 rounded-full border border-navy-100 bg-navy-50/60 px-5 py-3 text-sm font-medium text-navy-700 transition-colors hover:border-navy-200 hover:bg-navy-50">
              <Icon className="h-4 w-4 shrink-0 text-navy-500" />
              {label}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
