import type { Metadata } from "next";
import { ServiceCard } from "@/components/marketing/ServiceCard";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { IntroBand } from "@/components/marketing/IntroBand";
import { Reveal } from "@/components/shared/Reveal";
import { services } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Services — LinguiSync" };

export default function ServicesPage() {
  return (
    <>
      <IntroBand>
        <p className="text-sm font-medium text-navy-300">Services</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-white">Everything you need, one platform</h1>
        <p className="mt-3 max-w-xl text-navy-300">
          Five services, each handled by vetted specialists and protected by escrow-style payments.
        </p>
      </IntroBand>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delayMs={i * 80}>
                <ServiceCard service={s} detailed />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
