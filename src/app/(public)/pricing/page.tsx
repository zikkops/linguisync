import type { Metadata } from "next";
import { HandCoins, Eye, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { IntroBand } from "@/components/marketing/IntroBand";
import { Reveal } from "@/components/shared/Reveal";
import { SERVICE_ICONS } from "@/lib/constants";
import { services } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Pricing — LinguiSync" };

export default function PricingPage() {
  return (
    <>
      <IntroBand>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-navy-300">Pricing</p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-white">Straightforward, starting-from pricing</h1>
          <p className="mt-4 text-navy-300">
            Every job gets a specific quote after you submit a request — the numbers below are a starting guide, not a final invoice.
          </p>
        </div>
      </IntroBand>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const Icon = SERVICE_ICONS[s.slug];
              return (
                <Reveal key={s.slug} delayMs={i * 80}>
                  <div className="rounded-2xl border border-navy-100 p-6 shadow-sm shadow-navy-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-navy-900/10">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="mt-3 font-display font-semibold text-navy-950">{s.name}</h3>
                    <p className="mt-2 font-display text-2xl font-semibold text-navy-950">{s.startingPrice}</p>
                    <p className="mt-1 text-xs font-medium text-navy-400">{s.typicalTurnaround}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-navy-50/50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <SectionHeading eyebrow="How you pay" title="One straightforward structure, every job" align="center" className="mx-auto" />
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Reveal delayMs={0}>
              <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm shadow-navy-900/5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900">
                  <HandCoins className="h-5 w-5 text-white" />
                </div>
                <h3 className="mt-3 font-display font-semibold text-navy-950">50% deposit to start</h3>
                <p className="mt-2 text-sm text-navy-500">Paid once you and the worker agree on scope, price, and turnaround. Work begins immediately after.</p>
              </div>
            </Reveal>
            <Reveal delayMs={120}>
              <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm shadow-navy-900/5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900">
                  <Eye className="h-5 w-5 text-white" />
                </div>
                <h3 className="mt-3 font-display font-semibold text-navy-950">50% final, on delivery</h3>
                <p className="mt-2 text-sm text-navy-500">Review a locked preview first. Full files unlock the moment your final payment clears.</p>
              </div>
            </Reveal>
          </div>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-navy-500">
            <CheckCircle2 className="h-4 w-4 text-navy-500" /> No hidden fees, no surprise charges.
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
