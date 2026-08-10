"use client";

import { useState } from "react";
import { Briefcase, Sparkles } from "lucide-react";
import { JobCard } from "@/components/jobs/JobCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { useSession } from "@/lib/session";
import { getJobsByWorker, getOpenJobsForServices, getWorkerProfile, isFavorited } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function WorkerJobRequestsPage() {
  const { session } = useSession();
  const profile = getWorkerProfile(session.userId);
  const [tab, setTab] = useState<"open" | "mine">("open");

  const openJobs = profile ? getOpenJobsForServices(profile.services) : [];
  const myJobs = getJobsByWorker(session.userId);

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="font-display text-3xl font-semibold text-navy-950">Job Requests</h1>
      <p className="mt-1 text-navy-400">Open work matching your services, plus everything you&apos;re already on.</p>

      <div className="mt-6 flex gap-1.5 rounded-full bg-navy-50 p-1.5 w-fit">
        <button
          onClick={() => setTab("open")}
          className={cn("rounded-full px-4 py-2 text-sm font-medium transition-colors", tab === "open" ? "bg-navy-900 text-white shadow-sm" : "text-navy-500 hover:text-navy-900")}
        >
          Open ({openJobs.length})
        </button>
        <button
          onClick={() => setTab("mine")}
          className={cn("rounded-full px-4 py-2 text-sm font-medium transition-colors", tab === "mine" ? "bg-navy-900 text-white shadow-sm" : "text-navy-500 hover:text-navy-900")}
        >
          My Jobs ({myJobs.length})
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {tab === "open" ? (
          openJobs.length === 0 ? (
            <EmptyState icon={Briefcase} title="No open requests" description="Check back soon, or update your services in your profile." />
          ) : (
            openJobs.map((job) => {
              const isFavoriteLead = isFavorited(job.consumerId, session.userId);
              return (
                <div key={job.id} className="relative">
                  {isFavoriteLead && (
                    <span className="absolute -top-2 left-4 z-10 flex items-center gap-1 rounded-full bg-accent-500 px-2.5 py-0.5 text-[11px] font-medium text-white shadow-sm">
                      <Sparkles className="h-3 w-3" /> Favorited you
                    </span>
                  )}
                  <JobCard job={job} viewerRole="worker" href={`/app/worker/jobs/${job.id}`} />
                </div>
              );
            })
          )
        ) : myJobs.length === 0 ? (
          <EmptyState icon={Briefcase} title="No jobs yet" description="Accept an open request to see it here." />
        ) : (
          myJobs.map((job) => <JobCard key={job.id} job={job} viewerRole="worker" href={`/app/worker/jobs/${job.id}`} />)
        )}
      </div>
    </div>
  );
}
