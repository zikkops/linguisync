"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, Search } from "lucide-react";
import Link from "next/link";
import { StatusBadge } from "@/components/jobs/StatusBadge";
import { getAllJobsSorted, getUserById, getServiceBySlug, getOverdueJobs } from "@/lib/mock-data";
import { formatCurrency, formatDate, cn } from "@/lib/utils";

export default function AdminJobsPage() {
  const [query, setQuery] = useState("");
  const [overdueOnly, setOverdueOnly] = useState(false);
  const allJobs = getAllJobsSorted();
  const overdueIds = useMemo(() => new Set(getOverdueJobs().map((j) => j.id)), []);

  const filtered = useMemo(() => {
    return allJobs.filter((j) => {
      if (overdueOnly && !overdueIds.has(j.id)) return false;
      if (query && !j.title.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [allJobs, overdueOnly, overdueIds, query]);

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="font-display text-3xl font-semibold text-navy-950">Jobs Oversight</h1>
      <p className="mt-1 text-navy-400">Full visibility across every job on the platform.</p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-navy-200 px-3.5 py-2.5">
          <Search className="h-4 w-4 text-navy-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search jobs..." className="text-sm outline-none" />
        </div>
        <button
          onClick={() => setOverdueOnly((v) => !v)}
          className={cn("flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors", overdueOnly ? "bg-status-danger-bg text-status-danger" : "bg-navy-50 text-navy-500 hover:bg-navy-100")}
        >
          <AlertTriangle className="h-3.5 w-3.5" /> Overdue only ({overdueIds.size})
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-navy-100 shadow-sm shadow-navy-900/5">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead className="bg-navy-50/60">
            <tr>
              <th className="px-4 py-3 text-xs font-medium text-navy-500">Job</th>
              <th className="px-4 py-3 text-xs font-medium text-navy-500">Consumer</th>
              <th className="px-4 py-3 text-xs font-medium text-navy-500">Worker</th>
              <th className="px-4 py-3 text-xs font-medium text-navy-500">Service</th>
              <th className="px-4 py-3 text-xs font-medium text-navy-500">Price</th>
              <th className="px-4 py-3 text-xs font-medium text-navy-500">Status</th>
              <th className="px-4 py-3 text-xs font-medium text-navy-500">Due</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((j) => {
              const consumer = getUserById(j.consumerId);
              const worker = j.workerId ? getUserById(j.workerId) : null;
              const service = getServiceBySlug(j.serviceSlug);
              const overdue = overdueIds.has(j.id);
              return (
                <tr key={j.id} className={cn("border-t border-navy-100", overdue && "bg-status-danger-bg/30")}>
                  <td className="px-4 py-3">
                    <Link href="/admin/jobs" className="font-medium text-navy-900 hover:text-navy-700">{j.title}</Link>
                  </td>
                  <td className="px-4 py-3 text-navy-600">{consumer?.firstName} {consumer?.lastName}</td>
                  <td className="px-4 py-3 text-navy-600">{worker ? `${worker.firstName} ${worker.lastName}` : "—"}</td>
                  <td className="px-4 py-3 text-navy-600">{service?.name}</td>
                  <td className="px-4 py-3 font-semibold text-navy-900">{formatCurrency(j.agreedPrice)}</td>
                  <td className="px-4 py-3"><StatusBadge status={j.status} /></td>
                  <td className="px-4 py-3">
                    {overdue ? (
                      <span className="flex items-center gap-1 text-xs font-medium text-status-danger"><AlertTriangle className="h-3.5 w-3.5" /> {formatDate(j.dueAt)}</span>
                    ) : (
                      <span className="text-navy-500">{formatDate(j.dueAt)}</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
