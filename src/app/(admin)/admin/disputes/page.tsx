"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Card, CardBody } from "@/components/shared/Card";
import { AgreementSummaryCard } from "@/components/jobs/AgreementSummaryCard";
import { Button } from "@/components/shared/Button";
import { StatusBadge } from "@/components/jobs/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { disputes, getJobById, getAgreementByJobId, getUserById, getMessagesByJobId } from "@/lib/mock-data";
import { formatDate, cn } from "@/lib/utils";

export default function AdminDisputesPage() {
  const [selectedId, setSelectedId] = useState(disputes[0]?.id ?? null);
  const selected = disputes.find((d) => d.id === selectedId);
  const selectedJob = selected ? getJobById(selected.jobId) : null;
  const agreement = selected ? getAgreementByJobId(selected.jobId) : null;
  const raisedBy = selected ? getUserById(selected.raisedBy) : null;
  const messages = selected ? getMessagesByJobId(selected.jobId) : [];

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="font-display text-3xl font-semibold text-navy-950">Disputes</h1>
      <p className="mt-1 text-navy-400">Resolution queue — check the confirmed agreement first, it can&apos;t have drifted after the fact.</p>

      {disputes.length === 0 ? (
        <div className="mt-8">
          <EmptyState icon={AlertTriangle} title="No disputes" description="Nothing to resolve right now." />
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="flex flex-col gap-2.5">
            {disputes.map((d) => {
              const job = getJobById(d.jobId);
              return (
                <button
                  key={d.id}
                  onClick={() => setSelectedId(d.id)}
                  className={cn("rounded-2xl border p-3.5 text-left transition-colors", selectedId === d.id ? "border-navy-900 bg-navy-50" : "border-navy-100 bg-white hover:border-navy-200")}
                >
                  <p className="text-sm font-semibold text-navy-950">{job?.title}</p>
                  <p className="mt-1 text-xs text-navy-400 capitalize">{d.status.replace("_", " ")}</p>
                </button>
              );
            })}
          </div>

          {selected && selectedJob && (
            <div className="md:col-span-2 flex flex-col gap-5">
              <Card><CardBody>
                <div className="flex items-center justify-between">
                  <p className="font-display font-semibold text-navy-950">{selectedJob.title}</p>
                  <StatusBadge status={selectedJob.status} />
                </div>
                <p className="mt-1 text-xs text-navy-400">Raised by {raisedBy?.firstName} {raisedBy?.lastName} on {formatDate(selected.createdAt)}</p>
                <p className="mt-3 text-sm text-navy-700">{selected.reason}</p>
              </CardBody></Card>

              {agreement && (
                <div>
                  <p className="mb-2 text-sm font-medium text-navy-500">Governing agreement</p>
                  <AgreementSummaryCard agreement={agreement} />
                </div>
              )}

              <div>
                <p className="mb-2 text-sm font-medium text-navy-500">Chat evidence</p>
                <div className="flex flex-col gap-2.5 rounded-2xl border border-navy-100 p-4">
                  {messages.map((m) => {
                    const sender = getUserById(m.senderId);
                    return (
                      <div key={m.id} className="rounded-xl bg-navy-50/50 p-3">
                        <p className="text-xs font-semibold text-navy-700">{sender?.firstName}</p>
                        <p className="mt-1 text-sm text-navy-600">{m.body}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {selected.status !== "resolved" ? (
                <Card><CardBody>
                  <p className="text-sm font-medium text-navy-500">Resolution</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button size="sm">Refund consumer</Button>
                    <Button size="sm" variant="secondary">Release to worker</Button>
                    <Button size="sm" variant="outline">Partial split</Button>
                  </div>
                </CardBody></Card>
              ) : (
                <div className="rounded-2xl bg-status-success-bg px-4 py-3 text-sm font-medium text-status-success">
                  Resolved: {selected.resolution?.replace("_", " ")}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
