"use client";

import Link from "next/link";
import { Briefcase, Heart, CreditCard, LifeBuoy, ArrowRight } from "lucide-react";
import { JobCard } from "@/components/jobs/JobCard";
import { NotificationFeedItem } from "@/components/shared/NotificationFeedItem";
import { EmptyState } from "@/components/shared/EmptyState";
import { MetricTile } from "@/components/admin/MetricTile";
import { useSession } from "@/lib/session";
import { getJobsByConsumer, getNotificationsByUser, getFavoritesByConsumer } from "@/lib/mock-data";

const QUICK_LINKS = [
  { href: "/app/favorites", label: "Favorites", icon: Heart },
  { href: "/app/payments", label: "Payments", icon: CreditCard },
  { href: "/app/support", label: "Support", icon: LifeBuoy },
];

export default function ConsumerDashboardPage() {
  const { session } = useSession();
  const allJobs = getJobsByConsumer(session.userId);
  const activeJobs = allJobs.filter((j) => !["completed", "cancelled", "refunded"].includes(j.status));
  const notifications = getNotificationsByUser(session.userId).slice(0, 4);
  const favorites = getFavoritesByConsumer(session.userId);

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="font-display text-3xl font-semibold text-navy-950">Welcome back</h1>
      <p className="mt-1 text-navy-400">Here&apos;s what&apos;s happening across your jobs.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <MetricTile icon={Briefcase} label="Active jobs" value={String(activeJobs.length)} tone="accent" />
        <MetricTile icon={Heart} label="Favorited workers" value={String(favorites.length)} />
        <MetricTile icon={LifeBuoy} label="Unread notifications" value={String(notifications.filter((n) => !n.readAt).length)} tone={notifications.some((n) => !n.readAt) ? "danger" : "neutral"} />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-navy-950">Active jobs</h2>
            <Link href="/app/jobs" className="flex items-center gap-1 text-sm font-medium text-navy-500 hover:text-navy-900">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            {activeJobs.length === 0 ? (
              <EmptyState icon={Briefcase} title="No active jobs" description="Start your first request to see it here." />
            ) : (
              activeJobs.map((job) => <JobCard key={job.id} job={job} viewerRole="consumer" href={`/app/jobs/${job.id}`} />)
            )}
          </div>
        </div>

        <div>
          <h2 className="font-display text-lg font-semibold text-navy-950">Notifications</h2>
          <div className="mt-4 flex flex-col gap-2.5">
            {notifications.length === 0 ? (
              <EmptyState icon={LifeBuoy} title="All caught up" description="No new notifications." />
            ) : (
              notifications.map((n) => <NotificationFeedItem key={n.id} notification={n} />)
            )}
          </div>

          <h2 className="mt-8 font-display text-lg font-semibold text-navy-950">Quick links</h2>
          <div className="mt-4 flex flex-col gap-2">
            {QUICK_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="flex items-center gap-2.5 rounded-2xl border border-navy-100 px-4 py-3 text-sm font-medium text-navy-700 shadow-sm shadow-navy-900/5 transition-colors hover:border-navy-200">
                <link.icon className="h-4 w-4 text-navy-500" /> {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
