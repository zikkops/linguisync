import type { Review } from "@/types";

export const reviews: Review[] = [
  {
    id: "rev_009",
    jobId: "job_009",
    consumerId: "u_con_3",
    workerId: "u_wk_2",
    rating: 5,
    comment: "Fantastic work, timing is spot on throughout. Will definitely book Kenji again.",
    isFeaturedOnHome: true,
    createdAt: "2026-07-13T09:35:00Z",
  },
  {
    id: "rev_013",
    jobId: "job_013",
    consumerId: "u_con_2",
    workerId: "u_wk_1",
    rating: 5,
    comment: "Daniela handled a dense legal document with real precision — exactly the accuracy we needed for compliance.",
    isFeaturedOnHome: true,
    createdAt: "2026-06-29T09:30:00Z",
  },
  {
    id: "rev_014",
    jobId: "job_014",
    consumerId: "u_con_1",
    workerId: "u_wk_4",
    rating: 5,
    comment: "Lucas turned a rough 45-minute interview into a genuinely festival-ready cut. Pacing was perfect.",
    isFeaturedOnHome: true,
    createdAt: "2026-07-19T09:30:00Z",
  },
];

export function getReviewsByWorker(workerId: string) {
  return reviews.filter((r) => r.workerId === workerId);
}

export function getFeaturedTestimonials() {
  return reviews.filter((r) => r.isFeaturedOnHome);
}

export function getReviewByJobId(jobId: string) {
  return reviews.find((r) => r.jobId === jobId) ?? null;
}
