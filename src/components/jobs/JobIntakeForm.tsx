"use client";

import type { Service } from "@/types";
import { Input, Select, Textarea } from "@/components/shared/Field";
import { FileDropzone } from "./FileDropzone";

export function JobIntakeForm({ service }: { service: Service }) {
  return (
    <div className="flex flex-col gap-4">
      <Input id="job-title" label="Job title" placeholder={`e.g. ${service.name} for our Q3 launch`} required />
      <Textarea id="job-brief" label="Brief" placeholder="Describe what you need..." required />

      <div className="grid gap-4 sm:grid-cols-2">
        {service.intakeFormSchema.map((field) =>
          field.type === "select" ? (
            <Select key={field.name} id={field.name} label={field.label}>
              {field.options?.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </Select>
          ) : field.type === "textarea" ? (
            <div key={field.name} className="sm:col-span-2">
              <Textarea id={field.name} label={field.label} />
            </div>
          ) : (
            <Input key={field.name} id={field.name} label={field.label} type={field.type === "number" ? "number" : "text"} />
          )
        )}
      </div>

      <FileDropzone label="Reference files (optional)" />
    </div>
  );
}
