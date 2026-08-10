"use client";

import { DollarSign, Lock, Wallet, RotateCcw } from "lucide-react";
import { MetricTile } from "@/components/admin/MetricTile";
import { Button } from "@/components/shared/Button";
import { Pill } from "@/components/shared/Pill";
import { payments, payouts, getJobById } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function AdminPaymentsPage() {
  const escrowHeld = payments.filter((p) => {
    const job = getJobById(p.jobId);
    return p.type === "deposit" && p.status === "paid" && job && ["deposit_paid", "in_progress", "delivered"].includes(job.status);
  }).reduce((sum, p) => sum + p.amount, 0);

  const pendingPayouts = payouts.filter((p) => p.status === "pending");
  const totalPaidOut = payouts.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0);
  const refunded = payments.filter((p) => p.status === "refunded").reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="font-display text-3xl font-semibold text-navy-950">Payments & Escrow</h1>
      <p className="mt-1 text-navy-400">Financial control center — deposits held, payouts owed, refunds issued.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        <MetricTile icon={Lock} label="Held in escrow" value={formatCurrency(escrowHeld)} tone="accent" />
        <MetricTile icon={Wallet} label="Pending payouts" value={formatCurrency(pendingPayouts.reduce((s, p) => s + p.amount, 0))} />
        <MetricTile icon={DollarSign} label="Total paid out" value={formatCurrency(totalPaidOut)} />
        <MetricTile icon={RotateCcw} label="Refunded" value={formatCurrency(refunded)} />
      </div>

      <h2 className="mt-10 font-display text-lg font-semibold text-navy-950">Payout queue</h2>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-navy-100 shadow-sm shadow-navy-900/5">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-navy-50/60">
            <tr>
              <th className="px-4 py-3 text-xs font-medium text-navy-500">Job</th>
              <th className="px-4 py-3 text-xs font-medium text-navy-500">Amount</th>
              <th className="px-4 py-3 text-xs font-medium text-navy-500">Status</th>
              <th className="px-4 py-3" />
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
                    <Pill tone={p.status === "paid" ? "success" : "progress"}>{p.status}</Pill>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {p.status === "pending" && <Button size="sm" variant="outline">Release</Button>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 font-display text-lg font-semibold text-navy-950">All payments</h2>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-navy-100 shadow-sm shadow-navy-900/5">
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
            {payments.map((p) => {
              const job = getJobById(p.jobId);
              return (
                <tr key={p.id} className="border-t border-navy-100">
                  <td className="px-4 py-3 font-medium text-navy-900">{job?.title}</td>
                  <td className="px-4 py-3 capitalize text-navy-500">{p.type}</td>
                  <td className="px-4 py-3 font-semibold text-navy-900">{formatCurrency(p.amount)}</td>
                  <td className="px-4 py-3 capitalize text-navy-500">{p.status}</td>
                  <td className="px-4 py-3 text-navy-500">{formatDate(p.paidAt)}</td>
                  <td className="px-4 py-3 text-right">
                    {p.status === "paid" && <Button size="sm" variant="ghost">Refund</Button>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
