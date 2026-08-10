import type { AppNotification } from "@/types";

export const appNotifications: AppNotification[] = [
  { id: "n_con1_1", userId: "u_con_1", type: "message", title: "New message from Daniela", body: "\"All good, let's keep everything here in the job chat...\"", readAt: null, createdAt: "2026-08-05T09:15:00Z", jobId: "job_005" },
  { id: "n_con1_2", userId: "u_con_1", type: "deposit_paid", title: "Deposit confirmed", body: "Your deposit for \"Investor deck localization\" was received — work has started.", readAt: "2026-08-04T14:00:00Z", createdAt: "2026-08-04T13:05:00Z", jobId: "job_005" },
  { id: "n_con1_3", userId: "u_con_1", type: "payment_released", title: "Deliverable unlocked", body: "Full files for \"Blog series proofread\" are ready to download.", readAt: null, createdAt: "2026-07-25T10:06:00Z", jobId: "job_008" },

  { id: "n_con2_1", userId: "u_con_2", type: "delivered", title: "Preview ready", body: "A locked preview for \"Product launch ad\" is ready — review and pay to unlock.", readAt: null, createdAt: "2026-08-02T22:05:00Z", jobId: "job_010" },
  { id: "n_con2_2", userId: "u_con_2", type: "message", title: "New reply on job_007", body: "Final payment confirmed, files are now unlocked.", readAt: "2026-08-06T08:20:00Z", createdAt: "2026-08-06T08:10:00Z", jobId: "job_007" },

  { id: "n_con3_1", userId: "u_con_3", type: "file_purge_reminder", title: "Files expiring soon", body: "Deliverables for \"Founder interview series\" will be auto-deleted in 6 days.", readAt: null, createdAt: "2026-08-05T09:00:00Z", jobId: "job_014" },

  { id: "n_wk1_1", userId: "u_wk_1", type: "favorite_job_request", title: "Direct request from a favoriting client", body: "Marcus Webb (who has favorited you) sent a new job request.", readAt: null, createdAt: "2026-08-01T09:00:00Z", jobId: "job_007" },
  { id: "n_wk1_2", userId: "u_wk_1", type: "deposit_paid", title: "Deposit received", body: "Deposit for \"Investor deck localization\" has been paid — timer started.", readAt: "2026-08-04T13:10:00Z", createdAt: "2026-08-04T13:00:00Z", jobId: "job_005" },

  { id: "n_wk2_1", userId: "u_wk_2", type: "message", title: "New quote request", body: "Sarah Chen requested a quote for \"Product demo video — EN subtitles.\"", readAt: null, createdAt: "2026-08-03T08:05:00Z", jobId: "job_002" },

  { id: "n_wk3_1", userId: "u_wk_3", type: "payment_released", title: "Payout sent", body: "$194.40 for \"Blog series proofread\" has been paid out.", readAt: "2026-07-25T13:00:00Z", createdAt: "2026-07-25T12:00:00Z", jobId: "job_008" },

  { id: "n_wk4_1", userId: "u_wk_4", type: "support_reply", title: "Dispute opened", body: "Marcus Webb opened a dispute on \"Product launch ad.\" Admin is reviewing.", readAt: null, createdAt: "2026-08-03T08:05:00Z", jobId: "job_010" },
];

export function getNotificationsByUser(userId: string) {
  return appNotifications.filter((n) => n.userId === userId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getUnreadCount(userId: string) {
  return getNotificationsByUser(userId).filter((n) => !n.readAt).length;
}
