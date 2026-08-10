"use client";

import { useMemo, useState } from "react";
import { Ban, ShieldCheck, Search } from "lucide-react";
import { Avatar } from "@/components/shared/Avatar";
import { Pill } from "@/components/shared/Pill";
import { users, getWorkerProfile, jobs } from "@/lib/mock-data";
import { formatDate, cn } from "@/lib/utils";
import type { UserRole } from "@/types";

export default function AdminUsersPage() {
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return users.filter((u) => {
      if (roleFilter !== "all" && u.role !== roleFilter) return false;
      if (query && !`${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [roleFilter, query]);

  const pendingDeletions = users.filter((u) => u.deletionRequestedAt);

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="font-display text-3xl font-semibold text-navy-950">Users</h1>
      <p className="mt-1 text-navy-400">Post-hoc moderation — sign-up is open, so there&apos;s no approval queue here.</p>

      {pendingDeletions.length > 0 && (
        <div className="mt-6 rounded-2xl bg-status-danger-bg px-4 py-3 text-sm font-medium text-status-danger">
          {pendingDeletions.length} account deletion request(s) pending review
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-navy-200 px-3.5 py-2.5">
          <Search className="h-4 w-4 text-navy-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search users..." className="text-sm outline-none" />
        </div>
        {(["all", "consumer", "worker", "admin"] as const).map((r) => (
          <button
            key={r}
            onClick={() => setRoleFilter(r)}
            className={cn("rounded-full px-3.5 py-1.5 text-sm font-medium capitalize transition-colors", roleFilter === r ? "bg-navy-900 text-white" : "bg-navy-50 text-navy-500 hover:bg-navy-100")}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-navy-100 shadow-sm shadow-navy-900/5">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-navy-50/60">
            <tr>
              <th className="px-4 py-3 text-xs font-medium text-navy-500">User</th>
              <th className="px-4 py-3 text-xs font-medium text-navy-500">Role</th>
              <th className="px-4 py-3 text-xs font-medium text-navy-500">Signed up</th>
              <th className="px-4 py-3 text-xs font-medium text-navy-500">Jobs</th>
              <th className="px-4 py-3 text-xs font-medium text-navy-500">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => {
              const workerProfile = u.role === "worker" ? getWorkerProfile(u.id) : null;
              const jobCount = jobs.filter((j) => j.consumerId === u.id || j.workerId === u.id).length;
              return (
                <tr key={u.id} className="border-t border-navy-100">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar initial={u.avatarInitial} size="sm" />
                      <div>
                        <p className="font-medium text-navy-900">{u.firstName} {u.lastName}</p>
                        <p className="text-xs text-navy-400">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 capitalize text-navy-600">{u.role}</td>
                  <td className="px-4 py-3 text-navy-500">{formatDate(u.createdAt)}</td>
                  <td className="px-4 py-3 text-navy-600">{jobCount}{workerProfile ? ` · ★ ${workerProfile.ratingAvg}` : ""}</td>
                  <td className="px-4 py-3">
                    {u.deletionRequestedAt ? (
                      <Pill tone="danger">Deletion pending</Pill>
                    ) : u.isSuspended ? (
                      <Pill tone="danger">Suspended</Pill>
                    ) : (
                      <Pill tone="success">Active</Pill>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1.5">
                      <button className="flex items-center gap-1 rounded-full bg-navy-50 px-2.5 py-1 text-xs font-medium text-navy-500 hover:bg-navy-100" title="Verify">
                        <ShieldCheck className="h-3 w-3" /> Verify
                      </button>
                      <button className="flex items-center gap-1 rounded-full bg-status-danger-bg px-2.5 py-1 text-xs font-medium text-status-danger" title="Suspend">
                        <Ban className="h-3 w-3" /> Suspend
                      </button>
                    </div>
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
