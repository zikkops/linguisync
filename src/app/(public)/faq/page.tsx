import type { Metadata } from "next";
import { Accordion } from "@/components/shared/Accordion";
import { Reveal } from "@/components/shared/Reveal";

export const metadata: Metadata = { title: "FAQ — LinguiSync" };

const FAQ_ITEMS = [
  {
    question: "How does payment and escrow work?",
    answer: "You pay a 50% deposit once you and the worker agree on scope, price, and turnaround. The remaining 50% is due once the work is delivered — full files only unlock after that final payment clears.",
  },
  {
    question: "What if I'm not happy with the delivered work?",
    answer: "You can raise it directly in the job chat, or open a dispute for admin review. Our disputes team looks at the original agreement, chat history, and files to reach a fair resolution.",
  },
  {
    question: "How are workers vetted?",
    answer: "Worker sign-up is currently open — anyone can register and start taking jobs. Quality is driven by public ratings, completed-job counts, and portfolios rather than an approval queue, so check a worker's profile before requesting them directly.",
  },
  {
    question: "What file types can I upload or receive?",
    answer: "Images (JPG, PNG, WEBP), video (MP4, MOV), documents (PDF, DOCX), and subtitle files (SRT, VTT) are all supported, with size limits depending on file type.",
  },
  {
    question: "How long can I access my files after a job is done?",
    answer: "Deliverable and reference files are available for 30 days after a job is marked completed, then automatically deleted. We'll remind you a few days before that happens so you don't lose access without warning.",
  },
  {
    question: "How long does a typical job take?",
    answer: "Turnaround depends on the service and scope — most jobs are agreed with a 24–96 hour window, shown clearly before you pay a deposit.",
  },
  {
    question: "How do I become a worker?",
    answer: "Head to the Become a Worker page, sign up, and complete your profile (services, languages, portfolio). You can start browsing and accepting jobs right away.",
  },
];

export default function FaqPage() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <p className="text-sm font-medium text-navy-500">FAQ</p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-navy-950">Frequently asked questions</h1>
        </Reveal>
        <Reveal delayMs={100} className="mt-10">
          <Accordion items={FAQ_ITEMS} />
        </Reveal>
      </div>
    </section>
  );
}
