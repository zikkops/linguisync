import type { Metadata } from "next";
import { Reveal } from "@/components/shared/Reveal";

export const metadata: Metadata = { title: "Terms of Service — LinguiSync" };

const SECTIONS = [
  {
    title: "1. Payment structure",
    body: "Jobs are paid in two installments: a 50% deposit due once scope, price, and turnaround are confirmed (the \"agreement\"), and a 50% final payment due once work is delivered. The confirmed agreement is the governing record of what was agreed for that job.",
  },
  {
    title: "2. Content ownership",
    body: "On job completion, ownership of the delivered work (translation, edited video, subtitles, copy, etc.) transfers fully to the consumer. Neither LinguiSync nor the worker retains rights to reuse or redistribute it. A worker may list a completed job in their portfolio only with the consumer's explicit consent.",
  },
  {
    title: "3. Confidentiality",
    body: "Uploaded content — briefs, reference files, and deliverables — is only ever accessible to the two parties on a job, plus platform admins for support and dispute purposes. It is never shared, sold, or used to train any model, and is not retained past our 30-day post-completion file window.",
  },
  {
    title: "4. Off-platform circumvention",
    body: "Exchanging contact information to move a job relationship off-platform is a violation of these terms. This applies equally to consumers and workers, and repeated attempts may result in account suspension.",
  },
  {
    title: "5. Account deletion",
    body: "You may request account deletion at any time from your profile settings. Your request is processed after any active jobs, pending payouts, or open disputes are resolved. Personal fields are then anonymized; transaction records (jobs, payments) are retained for accounting and legal purposes.",
  },
  {
    title: "6. Disputes",
    body: "If a job doesn't go as agreed, either party can raise a dispute for admin review. Resolutions may include a refund, release of funds to the worker, a partial split, or another outcome at admin discretion, based on the job's confirmed agreement and evidence provided.",
  },
];

export default function TermsPage() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-sm font-medium text-navy-500">Legal</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-navy-950">Terms of Service</h1>
        <p className="mt-3 text-sm text-navy-400">Last updated August 6, 2026 — draft, pending legal review.</p>

        <div className="mt-10 flex flex-col gap-8">
          {SECTIONS.map((s, i) => (
            <Reveal key={s.title} delayMs={Math.min(i, 4) * 60} className="border-t border-navy-100 pt-6">
              <h2 className="font-display text-lg font-semibold text-navy-950">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
