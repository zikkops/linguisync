import Link from "next/link";
import { LogoMark } from "@/components/shared/LogoMark";
import { services } from "@/lib/mock-data";

export function PublicFooter() {
  return (
    <footer className="bg-navy-950 text-navy-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <p className="font-display text-xl font-bold text-white">
            <LogoMark syncClassName="text-accent-500" />
          </p>
          <p className="mt-3 max-w-xs text-sm text-navy-300">
            Professional translation, proofreading, subtitling, video editing & copywriting — delivered securely.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">Services</p>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-accent-400">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">Company</p>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            <li><Link href="/about" className="hover:text-accent-400">About</Link></li>
            <li><Link href="/faq" className="hover:text-accent-400">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-accent-400">Contact</Link></li>
            <li><Link href="/become-a-worker" className="hover:text-accent-400">Become a Worker</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">Legal</p>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            <li><Link href="/terms" className="hover:text-accent-400">Terms</Link></li>
            <li><Link href="/privacy" className="hover:text-accent-400">Privacy</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-800 px-6 py-5 text-center text-xs text-navy-400">
        &copy; 2026 LinguiSync. All rights reserved.
      </div>
    </footer>
  );
}
