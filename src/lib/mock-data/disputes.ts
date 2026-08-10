import type { Dispute } from "@/types";

export const disputes: Dispute[] = [
  {
    id: "disp_010",
    jobId: "job_010",
    raisedBy: "u_con_2",
    reason: "Delivered video did not match the agreed brief — wrong aspect ratio (16:9 instead of 9:16) and the specified background music cues are missing entirely.",
    status: "under_review",
    createdAt: "2026-08-03T08:00:00Z",
  },
  {
    id: "disp_012",
    jobId: "job_012",
    raisedBy: "u_con_3",
    reason: "Worker missed the agreed turnaround by several days with no delivery or updates — requested a refund.",
    status: "resolved",
    resolution: "refund_consumer",
    resolvedByAdminId: "u_admin_1",
    createdAt: "2026-07-13T09:00:00Z",
    resolvedAt: "2026-07-14T09:00:00Z",
  },
];

export function getDisputeByJobId(jobId: string) {
  return disputes.find((d) => d.jobId === jobId) ?? null;
}
