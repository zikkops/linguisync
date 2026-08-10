import type { Metadata } from "next";
import { UserPlus, ListChecks, Send, Wallet } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Accordion } from "@/components/shared/Accordion";
import { ButtonLink } from "@/components/shared/Button";
import { IntroBand } from "@/components/marketing/IntroBand";
import { Reveal } from "@/components/shared/Reveal";

export const metadata: Metadata = { title: "Become a Worker — LinguiSync" };

const STEPS = [
  { icon: UserPlus, title: "Sign up", body: "Create an account — no application queue, you can start today." },
  { icon: ListChecks, title: "Set up your profile", body: "Add your services, languages, rate, and portfolio — this is what clients see." },
  { icon: Send, title: "Browse or get matched", body: "Accept open jobs, or get notified when a client requests you directly." },
  { icon: Wallet, title: "Deliver & get paid", body: "Upload your work and get paid once the client releases final payment." },
];

const FAQ = [
  { question: "How much does LinguiSync take in commission?", answer: "Commission rate is being finalized before launch — it will be clearly shown before you accept any job." },
  { question: "How do I get paid?", answer: "Payouts are tied to job release once a payment processor is finalized. You'll set your payout method in your profile." },
  { question: "Is there an approval process to become a worker?", answer: "No — sign-up is open. Your profile, portfolio, and ratings are what build trust with clients over time." },
  { question: "Can I set my own rates?", answer: "Yes, you set a base rate per service. Clients see this before requesting a job." },
];

export default function BecomeAWorkerPage() {
  return (
    <>
      <IntroBand className="py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-navy-300">For workers</p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-white md:text-5xl">
            Do the work you&apos;re good at. Get paid for it.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-navy-300">
            Translate, proofread, subtitle, edit video, or write copy — on your own schedule, at your own rate.
          </p>
          <ButtonLink href="/register" size="lg" className="mt-7 !bg-white !text-navy-900 hover:!bg-navy-50">
            Apply as a worker
          </ButtonLink>
        </div>
      </IntroBand>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading eyebrow="How it works" title="From sign-up to your first payout" align="center" className="mx-auto" />
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delayMs={i * 100}>
                <div className="rounded-2xl border border-navy-100 p-5 shadow-sm shadow-navy-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-navy-900/10">
                  <span className="font-display text-2xl font-semibold text-navy-200">{i + 1}</span>
                  <div className="mt-2 flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50">
                    <s.icon className="h-5 w-5 text-navy-600" />
                  </div>
                  <h3 className="mt-3 font-display font-semibold text-navy-950">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-navy-500">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-50/50 py-16">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <SectionHeading eyebrow="Worker FAQ" title="Common questions" />
            <div className="mt-8">
              <Accordion items={FAQ} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
