"use client";

import { useState } from "react";
import { Send, ShieldAlert } from "lucide-react";
import type { Message } from "@/types";
import { Avatar } from "@/components/shared/Avatar";
import { getUserById } from "@/lib/mock-data";
import { formatDateTime, cn } from "@/lib/utils";

export function ChatThread({
  initialMessages,
  currentUserId,
}: {
  initialMessages: Message[];
  currentUserId: string;
}) {
  const [localMessages, setLocalMessages] = useState<{ id: string; senderId: string; body: string; createdAt: string; contactInfoFlagged?: boolean }[]>([]);
  const [draft, setDraft] = useState("");

  function send() {
    if (!draft.trim()) return;
    setLocalMessages((prev) => [
      ...prev,
      { id: `local_${prev.length}`, senderId: currentUserId, body: draft.trim(), createdAt: new Date().toISOString() },
    ]);
    setDraft("");
  }

  const allMessages = [...initialMessages, ...localMessages];

  return (
    <div className="flex flex-col rounded-2xl border border-navy-100 bg-white shadow-sm shadow-navy-900/5">
      <div className="flex max-h-96 flex-col gap-4 overflow-y-auto p-4">
        {allMessages.map((m) => {
          const sender = getUserById(m.senderId);
          const mine = m.senderId === currentUserId;
          return (
            <div key={m.id} className={cn("flex gap-2.5", mine && "flex-row-reverse")}>
              <Avatar initial={sender?.avatarInitial ?? "?"} size="sm" tone={mine ? "accent" : "navy"} />
              <div className={cn("flex max-w-[75%] flex-col gap-1", mine && "items-end")}>
                <div
                  className={cn(
                    "rounded-2xl px-3.5 py-2.5 font-mono text-sm",
                    m.contactInfoFlagged
                      ? "bg-status-danger-bg text-status-danger"
                      : mine
                        ? "bg-navy-900 text-white"
                        : "bg-navy-50 text-navy-800"
                  )}
                >
                  {m.body}
                </div>
                {m.contactInfoFlagged && (
                  <span className="flex items-center gap-1 text-[11px] font-medium text-status-danger">
                    <ShieldAlert className="h-3 w-3" /> Contact info removed automatically
                  </span>
                )}
                <span className="text-[11px] font-medium text-navy-300">
                  {sender?.firstName} · {formatDateTime(m.createdAt)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 border-t border-navy-100 p-3">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type a message — phone numbers & emails are auto-filtered"
          className="flex-1 rounded-xl border border-navy-200 px-3.5 py-2.5 font-mono text-sm outline-none transition-colors focus:border-navy-500 focus:ring-2 focus:ring-navy-100"
        />
        <button
          onClick={send}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-white transition-colors hover:bg-navy-800"
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
