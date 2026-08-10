import type { SupportTicket, SupportMessage } from "@/types";

export const supportTickets: SupportTicket[] = [
  {
    id: "tk_1",
    userId: "u_con_2",
    source: "consumer",
    subject: "Question about turnaround time",
    status: "open",
    priority: "normal",
    createdAt: "2026-08-05T11:00:00Z",
  },
  {
    id: "tk_2",
    userId: "u_wk_2",
    source: "worker",
    subject: "Payout not received for job_009",
    status: "pending",
    priority: "high",
    jobId: "job_009",
    createdAt: "2026-07-15T09:00:00Z",
  },
  {
    id: "tk_3",
    userId: null,
    source: "pre_sales",
    subject: "Do you support Japanese subtitle formatting?",
    status: "resolved",
    priority: "low",
    createdAt: "2026-07-30T09:00:00Z",
  },
  {
    id: "tk_4",
    userId: "u_con_2",
    source: "consumer",
    subject: "Dispute follow-up on job_010",
    status: "open",
    priority: "high",
    jobId: "job_010",
    createdAt: "2026-08-03T08:10:00Z",
  },
];

export const supportMessages: SupportMessage[] = [
  { id: "sm_1_1", ticketId: "tk_1", senderId: "u_con_2", senderLabel: "Marcus Webb", body: "Is the 24-72h turnaround for translation business days or calendar days?", createdAt: "2026-08-05T11:00:00Z" },

  { id: "sm_2_1", ticketId: "tk_2", senderId: "u_wk_2", senderLabel: "Kenji Tanaka", body: "Job 009 was released a couple days ago but I haven't seen the payout land yet.", createdAt: "2026-07-15T09:00:00Z" },
  { id: "sm_2_2", ticketId: "tk_2", senderId: "u_admin_1", senderLabel: "Support (Jordan)", body: "Thanks for flagging — checking with payouts now, will update you today.", createdAt: "2026-07-15T11:30:00Z" },

  { id: "sm_3_1", ticketId: "tk_3", senderId: null, senderLabel: "Anonymous visitor", body: "Can you do burned-in Japanese subtitles with vertical text?", createdAt: "2026-07-30T09:00:00Z" },
  { id: "sm_3_2", ticketId: "tk_3", senderId: "u_admin_1", senderLabel: "Support (Jordan)", body: "Yes — flag it in your request notes and we'll match you with a subtitler who supports vertical layouts.", createdAt: "2026-07-30T13:00:00Z" },

  { id: "sm_4_1", ticketId: "tk_4", senderId: "u_con_2", senderLabel: "Marcus Webb", body: "Following up on the dispute I raised on the job page — wanted to make sure it's actually being looked at.", createdAt: "2026-08-03T08:10:00Z" },
  { id: "sm_4_2", ticketId: "tk_4", senderId: "u_admin_1", senderLabel: "Support (Jordan)", body: "It's in our disputes queue, assigned to me — I'll have a resolution proposal within 2 business days.", createdAt: "2026-08-03T10:00:00Z" },
];

export function getTicketsByUser(userId: string) {
  return supportTickets.filter((t) => t.userId === userId);
}

export function getMessagesByTicket(ticketId: string) {
  return supportMessages.filter((m) => m.ticketId === ticketId);
}
