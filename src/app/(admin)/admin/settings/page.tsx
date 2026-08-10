"use client";

import { Card, CardBody, CardHeader } from "@/components/shared/Card";
import { Input, Select, Textarea } from "@/components/shared/Field";
import { Button } from "@/components/shared/Button";
import { Avatar } from "@/components/shared/Avatar";
import { services, users } from "@/lib/mock-data";

export default function AdminSettingsPage() {
  const admins = users.filter((u) => u.role === "admin");

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-3xl font-semibold text-navy-950">Settings</h1>
      <p className="mt-1 text-navy-400">Platform-wide configuration.</p>

      <Card className="mt-8">
        <CardHeader><p className="font-display font-semibold text-navy-950">Commission</p></CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input id="commission" label="Commission rate (%)" type="number" placeholder="e.g. 15" hint="Not yet finalized — see Open Questions" />
          <Button className="w-fit">Save</Button>
        </CardBody>
      </Card>

      <Card className="mt-6">
        <CardHeader><p className="font-display font-semibold text-navy-950">Default turnaround times</p></CardHeader>
        <CardBody className="flex flex-col gap-4">
          {services.map((s) => (
            <div key={s.slug} className="grid grid-cols-2 items-center gap-4">
              <span className="text-sm font-medium text-navy-700">{s.name}</span>
              <Select id={`turnaround-${s.slug}`} defaultValue={s.typicalTurnaround}>
                <option>24–48 hours</option>
                <option>48–72 hours</option>
                <option>72–96 hours</option>
              </Select>
            </div>
          ))}
        </CardBody>
      </Card>

      <Card className="mt-6">
        <CardHeader><p className="font-display font-semibold text-navy-950">Notification templates</p></CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Select id="template" label="Template">
            <option>Deposit confirmation</option>
            <option>Delivery alert</option>
            <option>Favorite-worker job request</option>
            <option>File purge reminder</option>
          </Select>
          <Textarea id="template-body" label="Email body" defaultValue="Hi {{first_name}}, your deposit for {{job_title}} has been confirmed..." />
          <Button className="w-fit">Save template</Button>
        </CardBody>
      </Card>

      <Card className="mt-6">
        <CardHeader><p className="font-display font-semibold text-navy-950">Admin accounts</p></CardHeader>
        <CardBody className="flex flex-col gap-2.5">
          {admins.map((a) => (
            <div key={a.id} className="flex items-center gap-2.5 rounded-xl bg-navy-50/50 px-4 py-2.5">
              <Avatar initial={a.avatarInitial} size="sm" tone="accent" />
              <div>
                <p className="text-sm font-medium text-navy-900">{a.firstName} {a.lastName}</p>
                <p className="text-xs text-navy-400">{a.email}</p>
              </div>
            </div>
          ))}
          <Button size="sm" variant="outline" className="mt-2 w-fit">Invite admin</Button>
        </CardBody>
      </Card>
    </div>
  );
}
