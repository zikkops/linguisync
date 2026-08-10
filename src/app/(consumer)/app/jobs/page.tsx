"use client";

import { useMemo, useState } from "react";
import { Briefcase } from "lucide-react";
import { JobCard } from "@/components/jobs/JobCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { useSession } from "@/lib/session";
import { getJobsByConsumer } from "@/lib/mock-data";
import { JOB_STATUS_CONFIG } from "@/lib/constants";
import type { JobStatus } from "@/types";

export default function ConsumerJobListPage() {
  const { session } = useSession();
  const jobs = getJobsByConsumer(session.userId);
  const [statusFilter, setStatusFilter] = useState<JobStatus | "all">("all");

  const filtered = useMemo(
    () => (statusFilter === "all" ? jobs : jobs.filter((j) => j.status === statusFilter)),
    [jobs, statusFilter]
  );

  const statuses = useMemo(() => Array.from(new Set(jobs.map((j) => j.status))), [jobs]);

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="font-display text-3xl font-semibold text-navy-950">My Jobs</h1>
      <p className="mt-1 text-navy-400">Every request you&apos;ve made, across every status.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          onClick={() => setStatusFilter("all")}
          className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${statusFilter === "all" ? "bg-navy-900 text-white" : "bg-navy-50 text-navy-500 hover:bg-navy-100"}`}
        >
          All ({jobs.length})
        </button>
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${statusFilter === s ? "bg-navy-900 text-white" : "bg-navy-50 text-navy-500 hover:bg-navy-100"}`}
          >
            {JOB_STATUS_CONFIG[s].label} ({jobs.filter((j) => j.status === s).length})
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {filtered.length === 0 ? (
          <EmptyState icon={Briefcase} title="No jobs here" description="Try a different filter, or start a new request." />
        ) : (
          filtered.map((job) => <JobCard key={job.id} job={job} viewerRole="consumer" href={`/app/jobs/${job.id}`} />)
        )}
      </div>
    </div>
  );
}
