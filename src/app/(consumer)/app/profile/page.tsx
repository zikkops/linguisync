"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/shared/Card";
import { Input, Checkbox } from "@/components/shared/Field";
import { Button } from "@/components/shared/Button";
import { useSession } from "@/lib/session";
import { getUserById, getConsumerProfile } from "@/lib/mock-data";

const NOTIF_PREFS = [
  { key: "favorite_requests", label: "Favorited-worker job requests" },
  { key: "messages", label: "New messages" },
  { key: "delivery", label: "Delivery & payment alerts" },
  { key: "file_reminders", label: "File expiration reminders" },
];

export default function ConsumerProfilePage() {
  const { session } = useSession();
  const user = getUserById(session.userId);
  const profile = getConsumerProfile(session.userId);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  if (!user) return null;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-3xl font-semibold text-navy-950">Profile & Settings</h1>

      <Card className="mt-8">
        <CardHeader><p className="font-display font-semibold text-navy-950">Account</p></CardHeader>
        <CardBody className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input id="first-name" label="First name" defaultValue={user.firstName} />
            <Input id="last-name" label="Last name" defaultValue={user.lastName} hint="Never shown to workers" />
          </div>
          <Input id="email" label="Email" type="email" defaultValue={user.email} />
          <Input id="company" label="Company (optional)" defaultValue={profile?.companyName ?? ""} />
          <Input id="password" label="New password" type="password" placeholder="Leave blank to keep current password" />
          <Button className="w-fit">Save changes</Button>
        </CardBody>
      </Card>

      <Card className="mt-6">
        <CardHeader><p className="font-display font-semibold text-navy-950">Notification preferences</p></CardHeader>
        <CardBody className="flex flex-col gap-3">
          {NOTIF_PREFS.map((p) => (
            <Checkbox key={p.key} id={p.key} label={p.label} defaultChecked />
          ))}
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
                <p className="mt-1 text-xs text-status-danger">
                  Your account will be scheduled for deletion once any active jobs, payouts, or disputes are resolved.
                </p>
                <div className="mt-3 flex gap-2">
                  <Button variant="danger" size="sm">Confirm deletion request</Button>
                  <Button variant="ghost" size="sm" onClick={() => setConfirmingDelete(false)}>Cancel</Button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <p className="text-sm text-navy-500">Deleting your account anonymizes your personal data. Transaction records are kept for accounting purposes.</p>
              <Button variant="danger" size="sm" className="mt-3" onClick={() => setConfirmingDelete(true)}>
                Delete my account
              </Button>
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
