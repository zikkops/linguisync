import type { IntakeField } from "@/types";

export function IntakeFormPreview({ fields }: { fields: IntakeField[] }) {
  return (
    <div className="rounded-2xl bg-navy-50/60 p-6">
      <p className="text-sm font-medium text-navy-500">What we&apos;ll ask you</p>
      <div className="mt-4 flex flex-col gap-3">
        {fields.map((field) => (
          <div key={field.name} className="rounded-xl border border-navy-100 bg-white px-4 py-3">
            <p className="text-sm font-medium text-navy-700">{field.label}</p>
            <p className="mt-1 text-xs text-navy-400">
              {field.type === "select" ? field.options?.join(" · ") : `Type: ${field.type}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
