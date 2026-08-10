"use client";

import { useState } from "react";
import { AlertTriangle, Star } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/shared/Card";
import { Input, Textarea, Select, Checkbox } from "@/components/shared/Field";
import { Button } from "@/components/shared/Button";
import { PortfolioGrid } from "@/components/workers/PortfolioGrid";
import { cn } from "@/lib/utils";
import { useSession } from "@/lib/session";
import { getUserById, getWorkerProfile, services } from "@/lib/mock-data";

export default function WorkerProfilePage() {
  const { session } = useSession();
  const user = getUserById(session.userId);
  const profile = getWorkerProfile(session.userId);
  const [selectedServices, setSelectedServices] = useState<string[]>(profile?.services ?? []);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  if (!user || !profile) return null;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-semibold text-navy-950">Profile & Portfolio</h1>
        <div className="flex items-center gap-1.5 text-sm font-semibold text-navy-700">
          <Star className="h-4 w-4 fill-accent-500 text-accent-500" /> {profile.ratingAvg.toFixed(1)} · {profile.jobsCompletedCount} jobs
        </div>
      </div>
      <p className="mt-1 text-navy-400">This is the main quality signal clients see — since sign-up has no approval gate, keep it complete.</p>

      <Card className="mt-8">
        <CardHeader><p className="font-display font-semibold text-navy-950">Public profile</p></CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Textarea id="bio" label="Bio" defaultValue={profile.bio} rows={3} />

          <div>
            <p className="text-sm font-medium text-navy-700">Services offered</p>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {services.map((s) => (
                <label
                  key={s.slug}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-colors",
                    selectedServices.includes(s.slug) ? "border-navy-900 bg-navy-50 text-navy-900" : "border-navy-100 text-navy-500"
                  )}
                >
                  <input
                    type="checkbox"
                    className="accent-navy-900"
                    checked={selectedServices.includes(s.slug)}
                    onChange={(e) =>
                      setSelectedServices((prev) => (e.target.checked ? [...prev, s.slug] : prev.filter((x) => x !== s.slug)))
                    }
                  />
                  {s.name}
                </label>
              ))}
            </div>
          </div>

          <Input id="languages" label="Language pairs" defaultValue={profile.languages.join(", ")} />

          <div className="grid grid-cols-2 gap-4">
            <Input id="rate" label="Base rate" type="number" defaultValue={profile.baseRate} />
            <Select id="rate-unit" label="Rate unit" defaultValue={profile.rateUnit}>
              <option>per word</option>
              <option>per minute</option>
              <option>per hour</option>
              <option>flat</option>
            </Select>
          </div>

          <Checkbox id="available" label="Available for new jobs" defaultChecked={profile.isAvailable} />

          <Button className="w-fit">Save profile</Button>
        </CardBody>
      </Card>

      <Card className="mt-6">
        <CardHeader><p className="font-display font-semibold text-navy-950">Portfolio</p></CardHeader>
        <CardBody>
          <PortfolioGrid items={profile.portfolio} />
          <Button variant="outline" size="sm" className="mt-4">Add portfolio item</Button>
        </CardBody>
      </Card>

      <Card className="mt-6">
        <CardHeader><p className="font-display font-semibold text-navy-950">Account settings</p></CardHeader>
        <CardBody className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input id="first-name" label="First name" defaultValue={user.firstName} />
            <Input id="last-name" label="Last name" defaultValue={user.lastName} hint="Never shown to clients" />
          </div>
          <Input id="email" label="Email" type="email" defaultValue={user.email} />
          <Input id="payout-method" label="Payout method" placeholder="Set once payment processor is finalized" disabled />
          <Input id="password" label="New password" type="password" placeholder="Leave blank to keep current password" />
          <Button className="w-fit">Save account</Button>
        </CardBody>
      </Card>

      <Card className="mt-6 bg-status-danger-bg/30">
        <CardHeader><p className="font-display font-semibold text-status-danger">Danger zone</p></CardHeader>
        <CardBody>
          {confirmingDelete ? (
            <div className="flex items-start gap-3 rounded-2xl bg-status-danger-bg p-4">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-status-danger" />
              <div>
                <p className="text-sm font-semibold text-status-danger">Are you sure?</p>
                <p className="mt-1 text-xs text-status-danger">Scheduled for deletion once active jobs, payouts, and disputes are resolved.</p>
                <div className="mt-3 flex gap-2">
                  <Button variant="danger" size="sm">Confirm deletion request</Button>
                  <Button variant="ghost" size="sm" onClick={() => setConfirmingDelete(false)}>Cancel</Button>
                </div>
              </div>
            </div>
          ) : (
            <Button variant="danger" size="sm" onClick={() => setConfirmingDelete(true)}>Delete my account</Button>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
