"use client";

import { useState } from "react";
import { ChevronDown, UserCog } from "lucide-react";
import { useSession } from "@/lib/session";
import { users } from "@/lib/mock-data";

/**
 * v1 has no real auth — this lets you preview the app as any of the seeded demo
 * users so every job status/role view can be checked without a backend.
 */
export function DemoUserSwitcher({ role }: { role: "consumer" | "worker" | "admin" }) {
  const { session, login } = useSession();
  const [open, setOpen] = useState(false);
  const options = users.filter((u) => u.role === role);
  const current = users.find((u) => u.id === session.userId);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border border-navy-200 px-3.5 py-2 text-sm font-medium text-navy-700 hover:bg-navy-50"
      >
        <UserCog className="h-4 w-4" />
        {current ? `${current.firstName}` : "Switch user"}
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-lg shadow-navy-900/10">
          <p className="px-3.5 py-2.5 text-xs font-medium text-navy-400">
            Preview as ({role})
          </p>
          {options.map((u) => (
            <button
              key={u.id}
              onClick={() => {
                login(u.id);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between px-3.5 py-2.5 text-left text-sm text-navy-700 hover:bg-navy-50"
            >
              {u.firstName} {u.lastName}
              {u.id === session.userId && <span className="text-accent-600">●</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
