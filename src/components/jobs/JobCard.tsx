import Link from "next/link";
import type { Job } from "@/types";
import { StatusBadge } from "./StatusBadge";
import { CountdownTimer } from "./CountdownTimer";
import { SERVICE_ICONS } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { getUserById, getServiceBySlug } from "@/lib/mock-data";

export function JobCard({
  job,
  viewerRole,
  href,
}: {
  job: Job;
  viewerRole: "consumer" | "worker" | "admin";
  href: string;
}) {
  const service = getServiceBySlug(job.serviceSlug);
  const Icon = service ? SERVICE_ICONS[service.slug] : null;

  const counterpartyId = viewerRole === "worker" ? job.consumerId : job.workerId;
  const counterparty = counterpartyId ? getUserById(counterpartyId) : null;
  const counterpartyLabel =
    viewerRole === "worker"
      ? counterparty?.firstName ?? "Unknown"
      : counterparty?.firstName ?? (job.status === "requested" ? "Awaiting worker" : "Unassigned");

  const showDueCountdown = job.status === "in_progress" || job.status === "deposit_paid";
  const showPurgeCountdown = job.status === "completed";

  return (
    <Link
      href={href}
      className="flex flex-col gap-3 rounded-2xl border border-navy-100 bg-white p-5 shadow-sm shadow-navy-900/5 transition-all duration-200 hover:-translate-y-0.5 hover:border-navy-200 hover:shadow-md hover:shadow-navy-900/10 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-start gap-3">
        {Icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-900">
            <Icon className="h-5 w-5 text-white" />
          </div>
        )}
        <div>
          <p className="font-display font-semibold text-navy-950">{job.title}</p>
          <p className="mt-0.5 text-xs font-medium text-navy-400">
            {viewerRole === "worker" ? "Client" : "Worker"}: {counterpartyLabel} · {service?.name}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 sm:justify-end">
        {showDueCountdown && job.dueAt && <CountdownTimer targetIso={job.dueAt} variant="due" />}
        {showPurgeCountdown && job.purgeAt && <CountdownTimer targetIso={job.purgeAt} variant="purge" />}
        {job.agreedPrice != null && (
          <span className="text-sm font-semibold text-navy-700">{formatCurrency(job.agreedPrice)}</span>
        )}
        <StatusBadge status={job.status} />
      </div>
    </Link>
  );
}
