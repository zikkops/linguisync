import type { Metadata } from "next";
import { Reveal } from "@/components/shared/Reveal";

export const metadata: Metadata = { title: "Privacy Policy — LinguiSync" };

const SECTIONS = [
  {
    title: "1. What we collect",
    body: "Account details (name, email, password), profile information (bio, services, portfolio for workers), job content (briefs, files, messages), and payment records.",
  },
  {
    title: "2. First-name-only identity rule",
    body: "Consumers and workers see each other by first name only — never last name, email, or phone number, in either direction. This is mutual and applies everywhere: job pages, chat, favorites, and reviews. Only platform admins can see full identity details, and only as needed for payments, support, or disputes.",
  },
  {
    title: "3. File retention",
    body: "Deliverable and reference files are automatically and permanently deleted 30 days after a job is marked completed. Job and payment records are kept longer for accounting purposes, but the files themselves are not.",
  },
  {
    title: "4. Account & data deletion",
    body: "You can request deletion of your account at any time from your profile settings. We process the request after any active jobs, pending payouts, or open disputes are resolved, then anonymize personal fields. Transaction records are retained, with identity fields removed, for accounting and legal compliance.",
  },
  {
    title: "5. Security",
    body: "All file storage is private, access-controlled, and served through short-lived signed links. Uploaded files are scanned before they become accessible to anyone. See our Terms for the confidentiality commitment that governs job content.",
  },
];

export default function PrivacyPage() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-sm font-medium text-navy-500">Legal</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-navy-950">Privacy Policy</h1>
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
