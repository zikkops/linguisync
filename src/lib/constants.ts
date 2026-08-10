import type { JobStatus, ServiceSlug } from "@/types";
import {
  Languages,
  PenLine,
  Captions,
  Film,
  PenTool,
  type LucideIcon,
} from "lucide-react";

export const SERVICE_ICONS: Record<ServiceSlug, LucideIcon> = {
  translation: Languages,
  proofreading: PenLine,
  subtitling: Captions,
  "video-editing": Film,
  copywriting: PenTool,
};

export interface StatusConfig {
  label: string;
  description: string;
  tone: "neutral" | "info" | "progress" | "waiting" | "success" | "danger";
}

export const JOB_STATUS_CONFIG: Record<JobStatus, StatusConfig> = {
  requested: { label: "Requested", description: "Waiting on a quote from a worker.", tone: "neutral" },
  quoted: { label: "Quoted", description: "Price proposed — awaiting your confirmation.", tone: "info" },
  agreement_confirmed: { label: "Agreement confirmed", description: "Scope and price locked in — deposit due to start work.", tone: "info" },
  deposit_paid: { label: "Deposit paid", description: "Deposit received — work is about to begin.", tone: "progress" },
  in_progress: { label: "In progress", description: "Worker is actively delivering — due-date timer running.", tone: "progress" },
  delivered: { label: "Delivered — preview only", description: "Locked preview ready. Pay the final amount to unlock full files.", tone: "waiting" },
  final_payment_paid: { label: "Final payment received", description: "Payment cleared — full files unlocking shortly.", tone: "waiting" },
  released: { label: "Released", description: "Full deliverable unlocked and ready to download.", tone: "success" },
  completed: { label: "Completed", description: "Job closed out. Files available for a limited window.", tone: "success" },
  disputed: { label: "Disputed", description: "Under admin review.", tone: "danger" },
  cancelled: { label: "Cancelled", description: "This job was cancelled.", tone: "neutral" },
  refunded: { label: "Refunded", description: "Deposit was refunded to the consumer.", tone: "neutral" },
};

export const STATUS_TONE_CLASSES: Record<StatusConfig["tone"], string> = {
  neutral: "bg-status-neutral-bg text-status-neutral",
  info: "bg-status-info-bg text-status-info",
  progress: "bg-status-progress-bg text-status-progress",
  waiting: "bg-status-waiting-bg text-status-waiting",
  success: "bg-status-success-bg text-status-success",
  danger: "bg-status-danger-bg text-status-danger",
};

export const CONSUMER_NAV = [
  { href: "/app", label: "Dashboard" },
  { href: "/app/jobs", label: "My Jobs" },
  { href: "/app/favorites", label: "Favorites" },
  { href: "/app/payments", label: "Payments" },
  { href: "/app/profile", label: "Profile" },
  { href: "/app/support", label: "Support" },
] as const;

export const WORKER_NAV = [
  { href: "/app/worker", label: "Dashboard" },
  { href: "/app/worker/jobs", label: "Job Requests" },
  { href: "/app/worker/earnings", label: "Earnings" },
  { href: "/app/worker/profile", label: "Profile" },
  { href: "/app/worker/support", label: "Support" },
] as const;

export const ADMIN_NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/jobs", label: "Jobs" },
  { href: "/admin/payments", label: "Payments & Escrow" },
  { href: "/admin/disputes", label: "Disputes" },
  { href: "/admin/support", label: "Support" },
  { href: "/admin/content", label: "Content" },
  { href: "/admin/settings", label: "Settings" },
] as const;
