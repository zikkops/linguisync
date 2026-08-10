"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ButtonLink } from "@/components/shared/Button";
import { LogoMark } from "@/components/shared/LogoMark";

const LINKS = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/become-a-worker", label: "Become a Worker" },
  { href: "/pricing", label: "Pricing" },
];

export function PublicNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-navy-100 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/home" className="font-display text-xl font-semibold text-navy-950">
          <LogoMark syncClassName="text-accent-600" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-navy-600 hover:text-navy-950">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/login" className="text-sm font-medium text-navy-600 hover:text-navy-950">
            Log in
          </Link>
          <ButtonLink href="/register" size="sm">
            Get Started
          </ButtonLink>
        </div>

        <button className="lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6 text-navy-900" /> : <Menu className="h-6 w-6 text-navy-900" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-navy-100 px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-4">
            {LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-navy-600" onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            <hr className="border-navy-100" />
            <Link href="/login" className="text-sm font-medium text-navy-600" onClick={() => setOpen(false)}>
              Log in
            </Link>
            <ButtonLink href="/register" size="sm" className="w-fit">
              Get Started
            </ButtonLink>
          </nav>
        </div>
      )}
    </header>
  );
}
