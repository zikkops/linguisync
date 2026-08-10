"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, UserCheck } from "lucide-react";
import { SERVICE_ICONS } from "@/lib/constants";
import { services, getUserById, getWorkerProfile } from "@/lib/mock-data";
import { JobIntakeForm } from "@/components/jobs/JobIntakeForm";
import { Button } from "@/components/shared/Button";
import { Avatar } from "@/components/shared/Avatar";
import { cn } from "@/lib/utils";
import type { ServiceSlug } from "@/types";

export default function NewJobRequestPage() {
  return (
    <Suspense fallback={null}>
      <NewJobRequestForm />
    </Suspense>
  );
}

function NewJobRequestForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedWorkerId = searchParams.get("worker");
  const requestedWorker = requestedWorkerId ? getUserById(requestedWorkerId) : null;
  const requestedWorkerProfile = requestedWorkerId ? getWorkerProfile(requestedWorkerId) : null;

  const [selectedSlug, setSelectedSlug] = useState<ServiceSlug | null>(requestedWorkerProfile?.services[0] ?? null);
  const selectedService = services.find((s) => s.slug === selectedSlug);

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-3xl font-semibold text-navy-950">New Request</h1>
      <p className="mt-1 text-navy-400">Tell us what you need — we&apos;ll match you with a specialist.</p>

      {requestedWorker && (
        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-navy-50 px-4 py-3.5">
          <Avatar initial={requestedWorker.avatarInitial} size="sm" tone="accent" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-navy-950">Requesting {requestedWorker.firstName} directly</p>
            <p className="text-xs text-navy-500">They&apos;ll be notified as soon as you submit.</p>
          </div>
          <UserCheck className="h-5 w-5 text-navy-500" />
        </div>
      )}

      <div className="mt-6">
        <p className="text-sm font-medium text-navy-700">Service</p>
        <div className="mt-2 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {services.map((s) => {
            const Icon = SERVICE_ICONS[s.slug];
            const active = selectedSlug === s.slug;
            return (
              <button
                key={s.slug}
                onClick={() => setSelectedSlug(s.slug)}
                className={cn(
                  "flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition-colors",
                  active ? "border-navy-900 bg-navy-50" : "border-navy-100 hover:border-navy-300"
                )}
              >
                <Icon className={cn("h-5 w-5", active ? "text-navy-900" : "text-navy-400")} />
                <span className="text-sm font-semibold text-navy-950">{s.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {selectedService && (
        <form
          className="mt-8 flex flex-col gap-6 border-t border-navy-100 pt-8"
          onSubmit={(e) => {
            e.preventDefault();
            router.push("/app/jobs/job_001");
          }}
        >
          <JobIntakeForm service={selectedService} />
          <div className="flex items-center justify-between">
            <button type="button" onClick={() => router.back()} className="flex items-center gap-1.5 text-sm font-medium text-navy-400 hover:text-navy-900">
              <ArrowLeft className="h-3.5 w-3.5" /> Cancel
            </button>
            <Button type="submit">
              Submit request <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
