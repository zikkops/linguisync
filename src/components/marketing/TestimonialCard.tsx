import type { Review } from "@/types";
import { Avatar } from "@/components/shared/Avatar";
import { RatingStars } from "@/components/workers/RatingStars";
import { getUserById, getServiceBySlug, getJobById } from "@/lib/mock-data";
import { Quote } from "lucide-react";

export function TestimonialCard({ review }: { review: Review }) {
  const consumer = getUserById(review.consumerId);
  const job = getJobById(review.jobId);
  const service = job ? getServiceBySlug(job.serviceSlug) : null;

  return (
    <div className="group flex flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-sm shadow-navy-900/5 transition-all duration-300 hover:-translate-y-1 hover:border-navy-200 hover:shadow-md hover:shadow-navy-900/10">
      <Quote className="h-6 w-6 text-navy-200 transition-colors duration-300 group-hover:text-accent-400" fill="currentColor" strokeWidth={0} />
      <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-700">&ldquo;{review.comment}&rdquo;</p>
      <div className="mt-5 flex items-center justify-between border-t border-navy-100 pt-4">
        <div className="flex items-center gap-2.5">
          <Avatar initial={consumer?.avatarInitial ?? "?"} size="sm" />
          <div>
            <p className="text-sm font-semibold text-navy-950">{consumer?.firstName}</p>
            <p className="text-xs text-navy-400">{service?.name}</p>
          </div>
        </div>
        <RatingStars rating={review.rating} />
      </div>
    </div>
  );
}
