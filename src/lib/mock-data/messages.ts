import type { Message } from "@/types";

export const messages: Message[] = [
  // job_005 — in_progress, includes a redacted contact-info example
  { id: "m_005_1", jobId: "job_005", senderId: "u_con_1", body: "Hi! Just checking in — any questions on the deck before you get started?", createdAt: "2026-08-04T13:30:00Z" },
  { id: "m_005_2", jobId: "job_005", senderId: "u_wk_1", body: "None so far, brief is clear. I'll flag anything ambiguous on slide 9 (the pricing table) once I get there.", createdAt: "2026-08-04T14:05:00Z" },
  { id: "m_005_3", jobId: "job_005", senderId: "u_con_1", body: "Sounds good. For faster back-and-forth you can just reach me at [contact info removed] instead of —", contactInfoFlagged: true, createdAt: "2026-08-05T09:10:00Z" },
  { id: "m_005_4", jobId: "job_005", senderId: "u_wk_1", body: "All good, let's keep everything here in the job chat — easier for both of us to track anyway.", createdAt: "2026-08-05T09:15:00Z" },

  // job_006 — delivered, awaiting final payment
  { id: "m_006_1", jobId: "job_006", senderId: "u_wk_4", body: "Preview cuts are up for review — let me know if the pacing on cut 3 feels right before I lock the final export.", createdAt: "2026-08-05T16:45:00Z" },
  { id: "m_006_2", jobId: "job_006", senderId: "u_con_3", body: "Watched all 5 — these look great. Sending final payment now so we can get the full files.", createdAt: "2026-08-06T10:00:00Z" },

  // job_008 — released
  { id: "m_008_1", jobId: "job_008", senderId: "u_wk_3", body: "All 6 posts proofread and delivered with tracked changes — mostly tightened some run-on sentences in post 4.", createdAt: "2026-07-24T06:05:00Z" },
  { id: "m_008_2", jobId: "job_008", senderId: "u_con_1", body: "Thank you, this is exactly what we needed. Really appreciate the quick turnaround.", createdAt: "2026-07-25T10:10:00Z" },

  // job_009 — completed
  { id: "m_009_1", jobId: "job_009", senderId: "u_wk_2", body: "All 12 episodes subtitled and delivered as SRT, speaker labels included per your notes.", createdAt: "2026-07-11T14:05:00Z" },
  { id: "m_009_2", jobId: "job_009", senderId: "u_con_3", body: "Fantastic work, timing is spot on throughout. Will definitely book you again.", createdAt: "2026-07-13T09:30:00Z" },

  // job_010 — disputed
  { id: "m_010_1", jobId: "job_010", senderId: "u_wk_4", body: "Delivered the 30s cutdown — let me know if you'd like any timing tweaks.", createdAt: "2026-08-02T22:05:00Z" },
  { id: "m_010_2", jobId: "job_010", senderId: "u_con_2", body: "This is the wrong aspect ratio and the background music cues from the brief are missing entirely. This isn't what we agreed.", createdAt: "2026-08-03T08:00:00Z" },
  { id: "m_010_3", jobId: "job_010", senderId: "u_wk_4", body: "I can fix the aspect ratio, but the brief didn't mention specific music cue timestamps — happy to revise once we're aligned.", createdAt: "2026-08-03T09:15:00Z" },
];

export function getMessagesByJobId(jobId: string) {
  return messages.filter((m) => m.jobId === jobId).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}
