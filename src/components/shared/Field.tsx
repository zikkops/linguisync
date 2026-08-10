import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const FIELD_BASE =
  "w-full rounded-xl border border-navy-200 bg-white px-3.5 py-2.5 font-mono text-sm text-navy-900 placeholder:text-navy-300 transition-colors focus:outline-none focus:border-navy-500 focus:ring-2 focus:ring-navy-100";

function Wrapper({ label, hint, htmlFor, children }: { label?: string; hint?: string; htmlFor?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={htmlFor} className="text-sm font-medium text-navy-700">
          {label}
        </label>
      )}
      {children}
      {hint && <p className="text-xs text-navy-400">{hint}</p>}
    </div>
  );
}

export function Input({
  label,
  hint,
  className,
  id,
  ...rest
}: { label?: string; hint?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Wrapper label={label} hint={hint} htmlFor={id}>
      <input id={id} className={cn(FIELD_BASE, className)} {...rest} />
    </Wrapper>
  );
}

export function Textarea({
  label,
  hint,
  className,
  id,
  rows = 4,
  ...rest
}: { label?: string; hint?: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Wrapper label={label} hint={hint} htmlFor={id}>
      <textarea id={id} rows={rows} className={cn(FIELD_BASE, "resize-none", className)} {...rest} />
    </Wrapper>
  );
}

export function Select({
  label,
  hint,
  className,
  id,
  children,
  ...rest
}: { label?: string; hint?: string } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <Wrapper label={label} hint={hint} htmlFor={id}>
      <select id={id} className={cn(FIELD_BASE, "cursor-pointer", className)} {...rest}>
        {children}
      </select>
    </Wrapper>
  );
}

export function Checkbox({
  label,
  id,
  className,
  ...rest
}: { label: ReactNode; id: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label htmlFor={id} className="flex items-start gap-2.5 text-sm text-navy-700 cursor-pointer">
      <input
        id={id}
        type="checkbox"
        className={cn("mt-0.5 h-4 w-4 rounded-md border border-navy-300 accent-navy-900 shrink-0", className)}
        {...rest}
      />
      <span>{label}</span>
    </label>
  );
}
