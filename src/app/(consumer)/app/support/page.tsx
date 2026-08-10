"use client";

import { useState } from "react";
import { LifeBuoy, Plus } from "lucide-react";
import { Card, CardBody } from "@/components/shared/Card";
import { Input, Textarea, Select } from "@/components/shared/Field";
import { Button } from "@/components/shared/Button";
import { EmptyState } from "@/components/shared/EmptyState";
import { Pill } from "@/components/shared/Pill";
import { cn, formatDateTime } from "@/lib/utils";
import { useSession } from "@/lib/session";
import { getTicketsByUser, getMessagesByTicket, getJobsByConsumer } from "@/lib/mock-data";

const TICKET_TONE: Record<string, "progress" | "info" | "success"> = {
  open: "progress",
  pending: "info",
  resolved: "success",
};

export default function ConsumerSupportPage() {
  const { session } = useSession();
  const tickets = getTicketsByUser(session.userId);
  const myJobs = getJobsByConsumer(session.userId);
  const [selectedId, setSelectedId] = useState<string | null>(tickets[0]?.id ?? null);
  const [showNewForm, setShowNewForm] = useState(tickets.length === 0);

  const selectedTicket = tickets.find((t) => t.id === selectedId);
  const thread = selectedTicket ? getMessagesByTicket(selectedTicket.id) : [];

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-semibold text-navy-950">Support</h1>
        <Button size="sm" onClick={() => { setShowNewForm(true); setSelectedId(null); }}>
          <Plus className="h-4 w-4" /> New ticket
        </Button>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="flex flex-col gap-2.5">
          {tickets.length === 0 && !showNewForm ? (
            <EmptyState icon={LifeBuoy} title="No tickets" description="Open a new ticket if you need help." />
          ) : (
            tickets.map((t) => (
              <button
                key={t.id}
                onClick={() => { setSelectedId(t.id); setShowNewForm(false); }}
                className={cn(
                  "rounded-2xl border p-3.5 text-left transition-colors",
                  selectedId === t.id && !showNewForm ? "border-navy-900 bg-navy-50" : "border-navy-100 bg-white hover:border-navy-200"
                )}
              >
                <p className="text-sm font-semibold text-navy-950">{t.subject}</p>
                <Pill tone={TICKET_TONE[t.status]} className="mt-1.5">{t.status}</Pill>
              </button>
            ))
          )}
        </div>

        <div className="md:col-span-2">
          {showNewForm ? (
            <Card><CardBody className="flex flex-col gap-4">
              <p className="font-display font-semibold text-navy-950">New support ticket</p>
              <Input id="subject" label="Subject" required />
              <Select id="related-job" label="Related job (optional)">
                <option value="">None</option>
                {myJobs.map((j) => (
                  <option key={j.id} value={j.id}>{j.title}</option>
                ))}
              </Select>
              <Textarea id="message" label="Message" required />
              <Button className="w-fit">Submit ticket</Button>
            </CardBody></Card>
          ) : selectedTicket ? (
            <Card>
              <CardBody className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <p className="font-display font-semibold text-navy-950">{selectedTicket.subject}</p>
                  <Pill tone={TICKET_TONE[selectedTicket.status]}>{selectedTicket.status}</Pill>
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
                </div>
              </CardBody>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
}
