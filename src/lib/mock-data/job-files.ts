import type { JobFile } from "@/types";

export const jobFiles: JobFile[] = [
  // job_005 — in_progress
  { id: "jf_005_1", jobId: "job_005", uploadedBy: "u_con_1", kind: "reference", fileName: "investor-deck-source.pdf", mimeType: "application/pdf", sizeLabel: "4.2 MB", visibility: "unlocked", scannedStatus: "clean", createdAt: "2026-07-29T10:05:00Z" },

  // job_006 — delivered (preview only, final locked)
  { id: "jf_006_1", jobId: "job_006", uploadedBy: "u_con_3", kind: "reference", fileName: "raw-interview-footage-link.txt", mimeType: "text/plain", sizeLabel: "1 KB", visibility: "unlocked", scannedStatus: "clean", createdAt: "2026-07-27T11:05:00Z" },
  { id: "jf_006_2", jobId: "job_006", uploadedBy: "u_wk_4", kind: "deliverable_preview", fileName: "founder-cutdowns-preview.mp4", mimeType: "video/mp4", sizeLabel: "22 MB", visibility: "preview", scannedStatus: "clean", createdAt: "2026-08-05T16:40:00Z" },
  { id: "jf_006_3", jobId: "job_006", uploadedBy: "u_wk_4", kind: "deliverable_final", fileName: "founder-cutdowns-final.zip", mimeType: "application/zip", sizeLabel: "310 MB", visibility: "locked", scannedStatus: "clean", createdAt: "2026-08-05T16:40:00Z" },

  // job_007 — final_payment_paid (final now unlocked)
  { id: "jf_007_1", jobId: "job_007", uploadedBy: "u_con_2", kind: "reference", fileName: "vendor-contract-source.pdf", mimeType: "application/pdf", sizeLabel: "1.1 MB", visibility: "unlocked", scannedStatus: "clean", createdAt: "2026-07-25T09:05:00Z" },
  { id: "jf_007_2", jobId: "job_007", uploadedBy: "u_wk_1", kind: "deliverable_preview", fileName: "contract-translation-preview.pdf", mimeType: "application/pdf", sizeLabel: "180 KB", visibility: "preview", scannedStatus: "clean", createdAt: "2026-07-30T07:20:00Z" },
  { id: "jf_007_3", jobId: "job_007", uploadedBy: "u_wk_1", kind: "deliverable_final", fileName: "contract-translation-final.docx", mimeType: "application/vnd.openxmlformats", sizeLabel: "220 KB", visibility: "unlocked", scannedStatus: "clean", createdAt: "2026-07-30T07:20:00Z" },

  // job_008 — released
  { id: "jf_008_1", jobId: "job_008", uploadedBy: "u_wk_3", kind: "deliverable_final", fileName: "blog-series-proofread-final.docx", mimeType: "application/vnd.openxmlformats", sizeLabel: "95 KB", visibility: "unlocked", scannedStatus: "clean", createdAt: "2026-07-24T06:00:00Z" },

  // job_009 — completed
  { id: "jf_009_1", jobId: "job_009", uploadedBy: "u_wk_2", kind: "deliverable_final", fileName: "training-series-subtitles.zip", mimeType: "application/zip", sizeLabel: "1.4 MB", visibility: "unlocked", scannedStatus: "clean", createdAt: "2026-07-11T14:00:00Z" },

  // job_010 — disputed
  { id: "jf_010_1", jobId: "job_010", uploadedBy: "u_wk_4", kind: "deliverable_preview", fileName: "launch-ad-cutdown-preview.mp4", mimeType: "video/mp4", sizeLabel: "8 MB", visibility: "preview", scannedStatus: "clean", createdAt: "2026-08-02T22:00:00Z" },
];

export function getFilesByJobId(jobId: string) {
  return jobFiles.filter((f) => f.jobId === jobId);
}
