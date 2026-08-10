"use client";

import { useState } from "react";
import { Card, CardBody } from "@/components/shared/Card";
import { Pill } from "@/components/shared/Pill";
import { supportTickets, getMessagesByTicket, getUserById } from "@/lib/mock-data";
import { cn, formatDateTime } from "@/lib/utils";
import { Button } from "@/components/shared/Button";

const SOURCE_LABEL: Record<string, string> = { consumer: "Consumer", worker: "Worker", pre_sales: "Pre-sales" };

export default function AdminSupportPage() {
  const [selectedId, setSelectedId] = useState(supportTickets[0]?.id ?? null);
  const selected = supportTickets.find((t) => t.id === selectedId);
  const thread = selected ? getMessagesByTicket(selected.id) : [];
  const requester = selected?.userId ? getUserById(selected.userId) : null;

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="font-display text-3xl font-semibold text-navy-950">Support Queue</h1>
      <p className="mt-1 text-navy-400">Consumer, worker, and pre-sales tickets in one place.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="flex flex-col gap-2.5">
          {supportTickets.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedId(t.id)}
              className={cn("rounded-2xl border p-3.5 text-left transition-colors", selectedId === t.id ? "border-navy-900 bg-navy-50" : "border-navy-100 bg-white hover:border-navy-200")}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-navy-950 line-clamp-1">{t.subject}</p>
                {t.priority === "high" && <Pill tone="danger" className="shrink-0">High</Pill>}
              </div>
              <p className="mt-1 text-xs text-navy-400">{SOURCE_LABEL[t.source]} · {t.status}</p>
            </button>
          ))}
        </div>

        {selected && (
          <div className="md:col-span-2">
            <Card><CardBody className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display font-semibold text-navy-950">{selected.subject}</p>
                  <p className="text-xs text-navy-400">{requester ? `${requester.firstName} ${requester.lastName}` : "Anonymous"} · {SOURCE_LABEL[selected.source]}</p>
                </div>
                <Pill tone="neutral">{selected.status}</Pill>
              </div>

              <div className="flex flex-col gap-3 border-t border-navy-100 pt-4">
                {thread.map((m) => (
                  <div key={m.id} className="rounded-2xl bg-navy-50/50 p-3.5">
                    <p className="text-xs font-semibold text-navy-700">{m.senderLabel}</p>
                    <p className="mt-1 font-mono text-sm text-navy-600">{m.body}</p>
                    <p className="mt-1.5 text-xs font-medium text-navy-300">{formatDateTime(m.createdAt)}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 border-t border-navy-100 pt-4">
                <input placeholder="Reply..." className="flex-1 rounded-xl border border-navy-200 px-3.5 py-2.5 font-mono text-sm outline-none focus:border-navy-500 focus:ring-2 focus:ring-navy-100" />
                <Button size="sm">Send</Button>
                <Button size="sm" variant="outline">Mark resolved</Button>
              </div>
            </CardBody></Card>
          </div>
        )}
      </div>
    </div>
  );
}
