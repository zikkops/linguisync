import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Fixed "now" for demo consistency — everything in mock data is dated relative to this. */
export const DEMO_NOW = new Date("2026-08-06T12:00:00Z");

export function formatDate(iso: string | null | undefined) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function formatDateTime(iso: string | null | undefined) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

export function formatCurrency(amount: number | null | undefined) {
  if (amount == null) return "—";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export interface CountdownParts {
  totalMs: number;
  isPast: boolean;
  label: string;
}

/** Renders a human countdown/elapsed label relative to DEMO_NOW — no live timers, static per render. */
export function countdownFrom(targetIso: string | null | undefined): CountdownParts {
  if (!targetIso) return { totalMs: 0, isPast: false, label: "—" };
  const totalMs = new Date(targetIso).getTime() - DEMO_NOW.getTime();
  const isPast = totalMs < 0;
  const abs = Math.abs(totalMs);
  const hours = Math.floor(abs / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  const remHours = hours % 24;

  let label: string;
  if (days > 0) {
    label = `${days}d ${remHours}h`;
  } else {
    label = `${hours}h`;
  }
  return { totalMs, isPast, label };
}

export function initials(firstName: string, lastName?: string) {
  return `${firstName[0] ?? ""}${lastName ? lastName[0] : ""}`.toUpperCase();
}
