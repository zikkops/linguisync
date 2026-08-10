import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-navy-900 text-white shadow-sm shadow-navy-900/20 hover:bg-navy-800 hover:shadow-md hover:shadow-navy-900/25",
  secondary: "bg-white text-navy-900 border border-navy-200 shadow-sm hover:border-navy-300 hover:bg-navy-50",
  outline: "bg-transparent text-navy-900 border border-navy-900/40 hover:border-navy-900 hover:bg-navy-50",
  ghost: "bg-transparent text-navy-600 hover:bg-navy-50 hover:text-navy-900",
  danger: "bg-white text-status-danger border border-status-danger/50 hover:bg-status-danger hover:text-white",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "px-3.5 py-1.5 text-sm rounded-lg",
  md: "px-5 py-2.5 text-sm rounded-xl",
  lg: "px-7 py-3.5 text-base rounded-xl",
};

const BASE =
  "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none disabled:active:scale-100";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(BASE, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className)} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: CommonProps & { href: string }) {
  return (
    <Link href={href} className={cn(BASE, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className)}>
      {children}
    </Link>
  );
}
