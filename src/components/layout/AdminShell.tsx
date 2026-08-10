"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ShieldCheck, LogOut } from "lucide-react";
import { ADMIN_NAV } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/shared/Avatar";
import { LogoMark } from "@/components/shared/LogoMark";
import { createClient } from "@/lib/supabase/client";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  // Admin login is a bare auth surface, not wrapped in the sidebar chrome.
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-navy-50/40">
      <aside className="hidden w-64 shrink-0 flex-col bg-navy-950 md:flex">
        <div className="flex items-center gap-2 px-6 py-6">
          <ShieldCheck className="h-5 w-5 text-accent-500" />
          <span className="font-display text-lg font-semibold text-white">Admin</span>
        </div>
        <nav className="flex flex-1 flex-col gap-1 px-3">
          {ADMIN_NAV.map((item) => {
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
          <div className="flex items-center gap-2.5">
            <Avatar initial={(email?.[0] ?? "A").toUpperCase()} size="sm" tone="accent" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{email ?? "Loading…"}</p>
              <p className="text-xs text-navy-400">Platform Admin</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="mt-3 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-navy-300 transition-colors hover:bg-white/5 hover:text-white"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-navy-100 bg-white/80 px-6 py-4 backdrop-blur-sm md:hidden">
          <div className="font-display text-lg font-semibold text-navy-950">
            <LogoMark syncClassName="text-accent-600" /> Admin
          </div>
          <button onClick={handleSignOut} className="text-sm font-medium text-navy-500">
            Sign out
          </button>
        </header>
        <main className="flex-1 px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
