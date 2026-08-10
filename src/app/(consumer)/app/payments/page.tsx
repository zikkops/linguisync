"use client";

import { CreditCard, Download } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { Pill } from "@/components/shared/Pill";
import { useSession } from "@/lib/session";
import { getJobsByConsumer, payments, getJobById } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

const PAYMENT_TONE: Record<string, "success" | "progress" | "neutral" | "danger"> = {
  paid: "success",
  pending: "progress",
  refunded: "neutral",
  failed: "danger",
};

export default function ConsumerPaymentsPage() {
  const { session } = useSession();
  const jobIds = getJobsByConsumer(session.userId).map((j) => j.id);
  const myPayments = payments.filter((p) => jobIds.includes(p.jobId)).sort((a, b) => (b.paidAt ?? "").localeCompare(a.paidAt ?? ""));

  const totalPaid = myPayments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="font-display text-3xl font-semibold text-navy-950">Payments</h1>
      <p className="mt-1 text-navy-400">Deposits, final payments, and receipts across all your jobs.</p>

      <div className="mt-6 rounded-2xl bg-navy-950 px-6 py-5">
        <p className="text-sm font-medium text-navy-400">Total paid</p>
        <p className="mt-1 font-display text-3xl font-semibold text-white">{formatCurrency(totalPaid)}</p>
      </div>

      {myPayments.length === 0 ? (
        <div className="mt-6">
          <EmptyState icon={CreditCard} title="No payments yet" description="Payments will appear here once you start a job." />
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-navy-100 shadow-sm shadow-navy-900/5">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-navy-50/60">
              <tr>
                <th className="px-4 py-3 text-xs font-medium text-navy-500">Job</th>
                <th className="px-4 py-3 text-xs font-medium text-navy-500">Type</th>
                <th className="px-4 py-3 text-xs font-medium text-navy-500">Amount</th>
                <th className="px-4 py-3 text-xs font-medium text-navy-500">Status</th>
                <th className="px-4 py-3 text-xs font-medium text-navy-500">Date</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {myPayments.map((p) => {
                const job = getJobById(p.jobId);
                return (
                  <tr key={p.id} className="border-t border-navy-100">
                    <td className="px-4 py-3 font-medium text-navy-900">{job?.title}</td>
                    <td className="px-4 py-3 capitalize text-navy-500">{p.type}</td>
                    <td className="px-4 py-3 font-semibold text-navy-900">{formatCurrency(p.amount)}</td>
                    <td className="px-4 py-3"><Pill tone={PAYMENT_TONE[p.status]}>{p.status}</Pill></td>
                    <td className="px-4 py-3 text-navy-500">{formatDate(p.paidAt)}</td>
                    <td className="px-4 py-3">
                      <button className="flex items-center gap-1 text-xs font-medium text-navy-400 hover:text-navy-900">
                        <Download className="h-3.5 w-3.5" /> Receipt
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
