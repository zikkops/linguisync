import Link from "next/link";
import { LogoMark } from "@/components/shared/LogoMark";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-navy-50/40">
      <header className="border-b border-navy-100 bg-white px-6 py-5">
        <Link href="/home" className="font-display text-xl font-semibold text-navy-950">
          <LogoMark syncClassName="text-accent-600" />
        </Link>
      </header>
      <main className="flex flex-1 items-center justify-center px-6 py-12">{children}</main>
    </div>
  );
}
