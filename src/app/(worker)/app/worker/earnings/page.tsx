"use client";

import { Wallet } from "lucide-react";
import { MetricTile } from "@/components/admin/MetricTile";
import { EmptyState } from "@/components/shared/EmptyState";
import { Pill } from "@/components/shared/Pill";
import { useSession } from "@/lib/session";
import { getPayoutsByWorker, getJobById } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { CheckCircle2, Clock3 } from "lucide-react";

export default function WorkerEarningsPage() {
  const { session } = useSession();
  const payouts = getPayoutsByWorker(session.userId);
  const pending = payouts.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amount, 0);
  const paid = payouts.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="font-display text-3xl font-semibold text-navy-950">Earnings & Payouts</h1>
      <p className="mt-1 text-navy-400">Per-job breakdown of what you&apos;ve earned and what&apos;s pending.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <MetricTile icon={Wallet} label="Total paid out" value={formatCurrency(paid)} tone="accent" />
        <MetricTile icon={Clock3} label="Pending" value={formatCurrency(pending)} />
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-sm shadow-navy-900/5">
          <p className="text-sm font-medium text-navy-400">Payout schedule</p>
          <p className="mt-2 text-sm font-semibold text-navy-950">Per-job, on release</p>
          <p className="mt-1 text-xs text-navy-400">Final schedule pending payment processor selection.</p>
        </div>
      </div>

      <h2 className="mt-10 font-display text-lg font-semibold text-navy-950">Payout history</h2>
      {payouts.length === 0 ? (
        <div className="mt-4">
          <EmptyState icon={Wallet} title="No payouts yet" description="Complete a job to see your first payout here." />
        </div>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-2xl border border-navy-100 shadow-sm shadow-navy-900/5">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-navy-50/60">
              <tr>
                <th className="px-4 py-3 text-xs font-medium text-navy-500">Job</th>
                <th className="px-4 py-3 text-xs font-medium text-navy-500">Amount</th>
                <th className="px-4 py-3 text-xs font-medium text-navy-500">Status</th>
                <th className="px-4 py-3 text-xs font-medium text-navy-500">Date</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((p) => {
                const job = getJobById(p.jobId);
                return (
                  <tr key={p.id} className="border-t border-navy-100">
                    <td className="px-4 py-3 font-medium text-navy-900">{job?.title}</td>
                    <td className="px-4 py-3 font-semibold text-navy-900">{formatCurrency(p.amount)}</td>
                    <td className="px-4 py-3">
                      <Pill tone={p.status === "paid" ? "success" : "progress"} className="gap-1">
                        {p.status === "paid" ? <CheckCircle2 className="h-3 w-3" /> : <Clock3 className="h-3 w-3" />} {p.status}
                      </Pill>
                    </td>
                    <td className="px-4 py-3 text-navy-500">{formatDate(p.paidAt)}</td>
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
