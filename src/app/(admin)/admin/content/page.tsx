"use client";

import { Star, HelpCircle, Layers } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { Pill } from "@/components/shared/Pill";
import { services, reviews, getUserById } from "@/lib/mock-data";

export default function AdminContentPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="font-display text-3xl font-semibold text-navy-950">Content</h1>
      <p className="mt-1 text-navy-400">Manage what shows up on the public marketing pages — no deploy needed.</p>

      <Card className="mt-8">
        <CardHeader className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-navy-500" />
          <p className="font-display font-semibold text-navy-950">Services</p>
        </CardHeader>
        <CardBody className="flex flex-col gap-2.5">
          {services.map((s) => (
            <div key={s.slug} className="flex items-center justify-between rounded-xl bg-navy-50/50 px-4 py-2.5">
              <div>
                <p className="text-sm font-medium text-navy-900">{s.name}</p>
                <p className="text-xs text-navy-400">{s.startingPrice} · {s.typicalTurnaround}</p>
              </div>
              <Button size="sm" variant="outline">Edit</Button>
            </div>
          ))}
        </CardBody>
      </Card>

      <Card className="mt-6">
        <CardHeader className="flex items-center gap-2">
          <Star className="h-4 w-4 text-navy-500" />
          <p className="font-display font-semibold text-navy-950">Testimonials</p>
        </CardHeader>
        <CardBody className="flex flex-col gap-2.5">
          {reviews.map((r) => {
            const consumer = getUserById(r.consumerId);
            return (
              <div key={r.id} className="flex items-center justify-between rounded-xl bg-navy-50/50 px-4 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-sm text-navy-700">&ldquo;{r.comment}&rdquo;</p>
                  <p className="text-xs text-navy-400">{consumer?.firstName} · {r.rating}★</p>
                </div>
                <Pill tone={r.isFeaturedOnHome ? "success" : "neutral"} className="shrink-0">
                  {r.isFeaturedOnHome ? "Featured" : "Hidden"}
                </Pill>
              </div>
            );
          })}
        </CardBody>
      </Card>

      <Card className="mt-6">
        <CardHeader className="flex items-center gap-2">
          <HelpCircle className="h-4 w-4 text-navy-500" />
          <p className="font-display font-semibold text-navy-950">FAQ</p>
        </CardHeader>
        <CardBody>
          <p className="text-sm text-navy-500">7 published entries.</p>
          <Button size="sm" variant="outline" className="mt-3">Manage FAQ entries</Button>
        </CardBody>
      </Card>
    </div>
  );
}
