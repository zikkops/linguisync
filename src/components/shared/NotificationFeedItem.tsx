import { Bell, MessageSquare, HandCoins, PackageCheck, FileClock, LifeBuoy, Star } from "lucide-react";
import type { AppNotification } from "@/types";
import { formatDateTime, cn } from "@/lib/utils";

const ICONS: Record<AppNotification["type"], typeof Bell> = {
  favorite_job_request: Star,
  deposit_paid: HandCoins,
  delivered: PackageCheck,
  payment_released: HandCoins,
  message: MessageSquare,
  support_reply: LifeBuoy,
  file_purge_reminder: FileClock,
};

export function NotificationFeedItem({ notification }: { notification: AppNotification }) {
  const Icon = ICONS[notification.type] ?? Bell;
  const unread = !notification.readAt;

  return (
    <div className={cn("flex items-start gap-3 rounded-2xl border px-4 py-3.5", unread ? "border-navy-100 bg-white shadow-sm shadow-navy-900/5" : "border-transparent bg-navy-50/50")}>
      <div className={cn("mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", unread ? "bg-navy-900" : "bg-navy-100")}>
        <Icon className={cn("h-4 w-4", unread ? "text-white" : "text-navy-400")} />
      </div>
      <div className="min-w-0">
        <p className={cn("text-sm", unread ? "font-semibold text-navy-950" : "font-medium text-navy-500")}>{notification.title}</p>
        <p className="mt-0.5 text-xs text-navy-400">{notification.body}</p>
        <p className="mt-1 text-[11px] font-medium text-navy-300">{formatDateTime(notification.createdAt)}</p>
      </div>
    </div>
  );
}
