import { FileEdit, HandCoins, Eye, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";

const STEPS = [
  { icon: FileEdit, title: "Request", body: "Describe the job and get matched with a specialist, or request one directly." },
  { icon: HandCoins, title: "Agree & deposit 50%", body: "Confirm scope, price, and turnaround — then pay a 50% deposit to kick things off." },
  { icon: Eye, title: "Preview delivered work", body: "Review a locked preview once it's ready. Full files stay protected until you pay." },
  { icon: CheckCircle2, title: "Final payment & delivery", body: "Pay the remaining 50% and the full deliverable unlocks instantly." },
];

export function HowItWorksSteps() {
  return (
    <section className="bg-navy-50/50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading eyebrow="How it works" title="Simple, protected from request to delivery" align="center" className="mx-auto" />
        </Reveal>

        <div className="relative mt-16 grid gap-10 md:grid-cols-4">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-navy-200 to-transparent md:block" />
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delayMs={i * 120} className="flex flex-col items-center text-center md:items-start md:text-left">
              <div className="relative flex flex-col items-center text-center md:items-start md:text-left">
                <span className="group relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-navy-900 shadow-md shadow-navy-900/10 ring-4 ring-navy-50 transition-transform duration-300 hover:-translate-y-1 hover:scale-105">
                  <step.icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <span className="mt-4 text-xs font-semibold text-accent-600">Step {i + 1}</span>
                <h3 className="mt-1 font-display font-semibold text-navy-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-500">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
