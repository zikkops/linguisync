import type { Metadata } from "next";
import { ShieldCheck, Lock, Users } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { IntroBand } from "@/components/marketing/IntroBand";
import { Reveal } from "@/components/shared/Reveal";

export const metadata: Metadata = { title: "About — LinguiSync" };

const POINTS = [
  { icon: Lock, title: "Escrow-style protection", body: "Deposits are held until work is delivered, and full files stay locked until final payment clears — for both sides." },
  { icon: ShieldCheck, title: "Secure by default", body: "Every file is scanned and access-controlled. Nothing is ever public unless you choose to make it so." },
  { icon: Users, title: "Real specialists", body: "Every job is delivered by a human specialist — rated, reviewed, and accountable for their work." },
];

export default function AboutPage() {
  return (
    <>
      <IntroBand>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-navy-300">About LinguiSync</p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-white">
            Built so strangers can trust each other with real work.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-navy-300">
            LinguiSync exists to make it safe to hire a translator, editor, subtitler, or writer you&apos;ve never met —
            and just as safe to be that specialist getting hired.
          </p>
        </div>
      </IntroBand>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading eyebrow="Why it works" title="Trust, built into the platform" align="center" className="mx-auto" />
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {POINTS.map((p, i) => (
              <Reveal key={p.title} delayMs={i * 100}>
                <div className="rounded-2xl border border-navy-100 p-6 shadow-sm shadow-navy-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-navy-900/10">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900">
                    <p.icon className="h-5 w-5 text-white" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-4 font-display font-semibold text-navy-950">{p.title}</h3>
                  <p className="mt-2 text-sm text-navy-500">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
