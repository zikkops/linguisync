import type { Payment, Payout } from "@/types";

export const payments: Payment[] = [
  { id: "pay_004_d", jobId: "job_004", type: "deposit", amount: 225, status: "paid", provider: "Stripe", paidAt: "2026-08-06T09:00:00Z" },

  { id: "pay_005_d", jobId: "job_005", type: "deposit", amount: 270, status: "paid", provider: "Stripe", paidAt: "2026-08-04T13:00:00Z" },

  { id: "pay_006_d", jobId: "job_006", type: "deposit", amount: 300, status: "paid", provider: "Stripe", paidAt: "2026-08-01T09:00:00Z" },
  { id: "pay_006_f", jobId: "job_006", type: "final", amount: 300, status: "pending", provider: "Stripe", paidAt: null },

  { id: "pay_007_d", jobId: "job_007", type: "deposit", amount: 190, status: "paid", provider: "Stripe", paidAt: "2026-07-28T09:00:00Z" },
  { id: "pay_007_f", jobId: "job_007", type: "final", amount: 190, status: "paid", provider: "Stripe", paidAt: "2026-08-06T08:10:00Z" },

  { id: "pay_008_d", jobId: "job_008", type: "deposit", amount: 108, status: "paid", provider: "Stripe", paidAt: "2026-07-22T09:00:00Z" },
  { id: "pay_008_f", jobId: "job_008", type: "final", amount: 108, status: "paid", provider: "Stripe", paidAt: "2026-07-25T10:00:00Z" },

  { id: "pay_009_d", jobId: "job_009", type: "deposit", amount: 490, status: "paid", provider: "Stripe", paidAt: "2026-07-08T09:00:00Z" },
  { id: "pay_009_f", jobId: "job_009", type: "final", amount: 490, status: "paid", provider: "Stripe", paidAt: "2026-07-13T09:00:00Z" },

  { id: "pay_010_d", jobId: "job_010", type: "deposit", amount: 130, status: "paid", provider: "Stripe", paidAt: "2026-07-30T09:00:00Z" },

  { id: "pay_012_d", jobId: "job_012", type: "deposit", amount: 70, status: "refunded", provider: "Stripe", paidAt: "2026-07-10T09:00:00Z" },

  { id: "pay_013_d", jobId: "job_013", type: "deposit", amount: 725, status: "paid", provider: "Stripe", paidAt: "2026-06-24T09:00:00Z" },
  { id: "pay_013_f", jobId: "job_013", type: "final", amount: 725, status: "paid", provider: "Stripe", paidAt: "2026-06-28T09:00:00Z" },

  { id: "pay_014_d", jobId: "job_014", type: "deposit", amount: 360, status: "paid", provider: "Stripe", paidAt: "2026-07-14T09:00:00Z" },
  { id: "pay_014_f", jobId: "job_014", type: "final", amount: 360, status: "paid", provider: "Stripe", paidAt: "2026-07-18T09:00:00Z" },
];

export const payouts: Payout[] = [
  { id: "po_008", workerId: "u_wk_3", jobId: "job_008", amount: 194.4, status: "paid", paidAt: "2026-07-25T12:00:00Z" },
  { id: "po_009", workerId: "u_wk_2", jobId: "job_009", amount: 882, status: "paid", paidAt: "2026-07-13T12:00:00Z" },
  { id: "po_013", workerId: "u_wk_1", jobId: "job_013", amount: 1305, status: "paid", paidAt: "2026-06-28T12:00:00Z" },
  { id: "po_014", workerId: "u_wk_4", jobId: "job_014", amount: 648, status: "paid", paidAt: "2026-07-18T12:00:00Z" },
  { id: "po_007", workerId: "u_wk_1", jobId: "job_007", amount: 342, status: "pending", paidAt: null },
];

export function getPaymentsByJobId(jobId: string) {
  return payments.filter((p) => p.jobId === jobId);
}

export function getPaymentsByConsumer(consumerJobIds: string[]) {
  return payments.filter((p) => consumerJobIds.includes(p.jobId));
}

export function getPayoutsByWorker(workerId: string) {
  return payouts.filter((p) => p.workerId === workerId);
}
