"use client";

import Link from "next/link";
import { Briefcase, Wallet, Star, ArrowRight, Sparkles } from "lucide-react";
import { JobCard } from "@/components/jobs/JobCard";
import { NotificationFeedItem } from "@/components/shared/NotificationFeedItem";
import { EmptyState } from "@/components/shared/EmptyState";
import { MetricTile } from "@/components/admin/MetricTile";
import { useSession } from "@/lib/session";
import {
  getJobsByWorker,
  getOpenJobsForServices,
  getWorkerProfile,
  getNotificationsByUser,
  isFavorited,
  getPayoutsByWorker,
} from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function WorkerDashboardPage() {
  const { session } = useSession();
  const profile = getWorkerProfile(session.userId);
  const myJobs = getJobsByWorker(session.userId);
  const activeJobs = myJobs.filter((j) => ["deposit_paid", "in_progress", "delivered", "final_payment_paid"].includes(j.status));
  const openJobs = profile ? getOpenJobsForServices(profile.services) : [];
  const favoritedLeads = openJobs.filter((j) => isFavorited(j.consumerId, session.userId));
  const regularOpen = openJobs.filter((j) => !favoritedLeads.includes(j));
  const notifications = getNotificationsByUser(session.userId).slice(0, 4);
  const payouts = getPayoutsByWorker(session.userId);
  const pendingEarnings = payouts.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amount, 0);
  const paidEarnings = payouts.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0);

  const isNewWorker = !profile || (profile.jobsCompletedCount === 0 && profile.portfolio.length === 0);

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="font-display text-3xl font-semibold text-navy-950">Welcome back</h1>
      <p className="mt-1 text-navy-400">Here&apos;s what needs your attention.</p>

      {isNewWorker && (
        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-accent-50 px-4 py-3.5">
          <Sparkles className="h-5 w-5 shrink-0 text-accent-600" />
          <p className="text-sm text-navy-700">
            Your profile is thin — a complete profile is your main quality signal since there&apos;s no approval gate.{" "}
            <Link href="/app/worker/profile" className="font-semibold text-accent-700 underline">Complete it now</Link>
          </p>
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <MetricTile icon={Briefcase} label="Active jobs" value={String(activeJobs.length)} tone="accent" />
        <MetricTile icon={Wallet} label="Pending earnings" value={formatCurrency(pendingEarnings)} />
        <MetricTile icon={Star} label="Rating" value={profile ? profile.ratingAvg.toFixed(1) : "—"} />
      </div>

      {favoritedLeads.length > 0 && (
        <div className="mt-10">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent-600" />
            <h2 className="font-display text-lg font-semibold text-navy-950">Warm leads — from a client who favorited you</h2>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            {favoritedLeads.map((job) => (
              <JobCard key={job.id} job={job} viewerRole="worker" href={`/app/worker/jobs/${job.id}`} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-navy-950">Active jobs</h2>
            <Link href="/app/worker/jobs" className="flex items-center gap-1 text-sm font-medium text-navy-500 hover:text-navy-900">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            {activeJobs.length === 0 ? (
              <EmptyState icon={Briefcase} title="No active jobs" description="Accept an open request to get started." />
            ) : (
              activeJobs.map((job) => <JobCard key={job.id} job={job} viewerRole="worker" href={`/app/worker/jobs/${job.id}`} />)
            )}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-navy-950">Open requests</h2>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            {regularOpen.length === 0 ? (
              <EmptyState icon={Briefcase} title="No open requests" description="Matching job requests will show up here." />
            ) : (
              regularOpen.map((job) => <JobCard key={job.id} job={job} viewerRole="worker" href={`/app/worker/jobs/${job.id}`} />)
            )}
          </div>
        </div>

        <div>
          <h2 className="font-display text-lg font-semibold text-navy-950">Notifications</h2>
          <div className="mt-4 flex flex-col gap-2.5">
            {notifications.length === 0 ? (
              <EmptyState icon={Star} title="All caught up" description="No new notifications." />
            ) : (
              notifications.map((n) => <NotificationFeedItem key={n.id} notification={n} />)
            )}
          </div>

          <div className="mt-8 rounded-2xl border border-navy-100 p-5 shadow-sm shadow-navy-900/5">
            <p className="text-sm font-medium text-navy-400">Lifetime earnings</p>
            <p className="mt-1 font-display text-2xl font-semibold text-navy-950">{formatCurrency(paidEarnings)}</p>
            <Link href="/app/worker/earnings" className="mt-3 flex items-center gap-1 text-sm font-medium text-navy-500 hover:text-navy-900">
              View earnings <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
