"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import type { Vacancy } from "@/types";
import { Input } from "@/components/shared/Field";
import { Button } from "@/components/shared/Button";
import { FileDropzone } from "@/components/jobs/FileDropzone";

export function VacancyCard({ vacancy }: { vacancy: Vacancy }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="rounded-2xl border border-navy-100 p-6 shadow-sm shadow-navy-900/5">
      <h2 className="font-display text-xl font-semibold text-navy-950">{vacancy.title}</h2>
      <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-navy-500">{vacancy.description}</p>

      <div className="mt-6 border-t border-navy-100 pt-6">
        {submitted ? (
          <div className="flex items-center gap-2.5 text-sm font-medium text-navy-700">
            <CheckCircle2 className="h-5 w-5 text-status-success" /> Application sent — we&apos;ll be in touch.
          </div>
        ) : (
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Input id={`${vacancy.id}-name`} label="Name" placeholder="Jane Doe" required />
              <Input id={`${vacancy.id}-email`} label="Email" type="email" placeholder="jane@example.com" required />
            </div>
            <FileDropzone label="Your CV" hint="PDF or DOCX" />
            <Button type="submit" className="w-fit">Apply</Button>
          </form>
        )}
      </div>
    </div>
  );
}
