import Link from "next/link";
import { Briefcase, DollarSign, ShieldAlert, LifeBuoy, Users, ArrowRight } from "lucide-react";
import { MetricTile } from "@/components/admin/MetricTile";
import { StatusBadge } from "@/components/jobs/StatusBadge";
import { jobs, disputes, supportTickets, users, payments, getOverdueJobs, getJobById } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function AdminDashboardPage() {
  const activeJobs = jobs.filter((j) => !["completed", "cancelled", "refunded"].includes(j.status));
  const gmv = jobs.reduce((sum, j) => sum + (j.agreedPrice ?? 0), 0);
  const escrowHeld = payments.filter((p) => p.type === "deposit" && p.status === "paid").reduce((sum, p) => {
    const job = getJobById(p.jobId);
    return job && ["deposit_paid", "in_progress", "delivered"].includes(job.status) ? sum + p.amount : sum;
  }, 0);
  const openDisputes = disputes.filter((d) => d.status !== "resolved");
  const openTickets = supportTickets.filter((t) => t.status !== "resolved");
  const overdueJobs = getOverdueJobs();
  const newConsumers = users.filter((u) => u.role === "consumer").length;
  const newWorkers = users.filter((u) => u.role === "worker").length;

  const QUICK_LINKS = [
    { href: "/admin/users", label: "Manage users", icon: Users },
    { href: "/admin/jobs", label: "Jobs oversight", icon: Briefcase },
    { href: "/admin/payments", label: "Payments & escrow", icon: DollarSign },
    { href: "/admin/disputes", label: "Disputes", icon: ShieldAlert },
    { href: "/admin/support", label: "Support queue", icon: LifeBuoy },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="font-display text-3xl font-semibold text-navy-950">Platform Overview</h1>
      <p className="mt-1 text-navy-400">Open self-signup means this dashboard is mostly about disputes, overdue jobs, and support — not approvals.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricTile icon={Briefcase} label="Active jobs" value={String(activeJobs.length)} tone="accent" />
        <MetricTile icon={DollarSign} label="GMV in flight" value={formatCurrency(gmv)} />
        <MetricTile icon={DollarSign} label="Held in escrow" value={formatCurrency(escrowHeld)} />
        <MetricTile icon={ShieldAlert} label="Open disputes" value={String(openDisputes.length)} tone={openDisputes.length ? "danger" : "neutral"} />
        <MetricTile icon={LifeBuoy} label="Open support tickets" value={String(openTickets.length)} tone={openTickets.length ? "danger" : "neutral"} />
        <MetricTile icon={ShieldAlert} label="Overdue jobs" value={String(overdueJobs.length)} tone={overdueJobs.length ? "danger" : "neutral"} />
        <MetricTile icon={Users} label="Consumers" value={String(newConsumers)} />
        <MetricTile icon={Users} label="Workers" value={String(newWorkers)} />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="font-display text-lg font-semibold text-navy-950">Needs attention</h2>
          <div className="mt-4 flex flex-col gap-3">
            {openDisputes.map((d) => {
              const job = getJobById(d.jobId);
              return (
                <Link key={d.id} href="/admin/disputes" className="flex items-center justify-between gap-4 rounded-2xl bg-status-danger-bg px-4 py-3.5">
                  <div>
                    <p className="text-sm font-semibold text-status-danger">{job?.title}</p>
                    <p className="text-xs text-status-danger">Dispute · {d.status.replace("_", " ")}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-status-danger" />
                </Link>
              );
            })}
            {overdueJobs.map((j) => (
              <Link key={j.id} href="/admin/jobs" className="flex items-center justify-between gap-4 rounded-2xl border border-navy-100 bg-white px-4 py-3.5 shadow-sm shadow-navy-900/5">
                <div>
                  <p className="text-sm font-semibold text-navy-950">{j.title}</p>
                  <p className="text-xs text-navy-400">Overdue since {formatDate(j.dueAt)}</p>
                </div>
                <StatusBadge status={j.status} />
              </Link>
            ))}
            {openDisputes.length === 0 && overdueJobs.length === 0 && (
              <p className="text-sm text-navy-400">Nothing urgent right now.</p>
            )}
          </div>
        </div>

        <div>
          <h2 className="font-display text-lg font-semibold text-navy-950">Quick links</h2>
          <div className="mt-4 flex flex-col gap-2">
            {QUICK_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="flex items-center gap-2.5 rounded-2xl border border-navy-100 px-4 py-3 text-sm font-medium text-navy-700 shadow-sm shadow-navy-900/5 hover:border-navy-200">
                <link.icon className="h-4 w-4 text-navy-500" /> {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
