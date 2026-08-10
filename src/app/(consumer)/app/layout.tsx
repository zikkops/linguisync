import { DashboardShell } from "@/components/layout/DashboardShell";

export default function ConsumerAppLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell role="consumer">{children}</DashboardShell>;
}
