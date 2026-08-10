"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { CONSUMER_NAV, WORKER_NAV } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useSession } from "@/lib/session";
import { getUserById } from "@/lib/mock-data";
import { Avatar } from "@/components/shared/Avatar";
import { ButtonLink } from "@/components/shared/Button";
import { LogoMark } from "@/components/shared/LogoMark";
import { DemoUserSwitcher } from "./DemoUserSwitcher";

export function DashboardShell({
  role,
  children,
}: {
  role: "consumer" | "worker";
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { session } = useSession();
  const user = getUserById(session.userId);
  const nav = role === "consumer" ? CONSUMER_NAV : WORKER_NAV;
  const newRequestHref = role === "consumer" ? "/app/jobs/new" : null;

  return (
    <div className="flex min-h-screen bg-navy-50/40">
      <aside className="hidden w-64 shrink-0 flex-col bg-navy-950 md:flex">
        <Link href="/home" className="px-6 py-6 font-display text-lg font-semibold text-white">
          <LogoMark syncClassName="text-accent-500" />
        </Link>
        <nav className="flex flex-1 flex-col gap-1 px-3">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                  active ? "bg-white/10 text-white" : "text-navy-300 hover:bg-white/5 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="m-3 rounded-2xl bg-white/5 px-4 py-4">
          <p className="text-xs font-medium text-navy-400">Signed in as</p>
          <div className="mt-2 flex items-center gap-2.5">
            <Avatar initial={user?.avatarInitial ?? "?"} size="sm" tone="accent" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{user?.firstName ?? "Demo user"}</p>
              <p className="text-xs capitalize text-navy-400">{role}</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-navy-100 bg-white/80 px-6 py-4 backdrop-blur-sm">
          <div className="md:hidden font-display text-lg font-semibold text-navy-950">
            <LogoMark syncClassName="text-accent-600" />
          </div>
          <div className="hidden md:block" />
          <div className="flex items-center gap-3">
            {newRequestHref && (
              <ButtonLink href={newRequestHref} size="sm">
                <PlusCircle className="h-4 w-4" /> New Request
              </ButtonLink>
            )}
            <DemoUserSwitcher role={role} />
          </div>
        </header>
        <main className="flex-1 px-6 py-8">{children}</main>

        {/* Mobile nav */}
        <nav className="flex border-t border-navy-100 bg-white md:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex-1 px-2 py-3 text-center text-xs font-medium",
                pathname === item.href ? "text-navy-900 font-semibold" : "text-navy-400"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
