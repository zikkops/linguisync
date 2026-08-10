import type { Metadata } from "next";
import { AnimatedHeroTitle } from "@/components/marketing/AnimatedHeroTitle";
import { HeroBackground } from "@/components/marketing/HeroBackground";

export const metadata: Metadata = { title: "LinguiSync — Coming Soon" };

export default function ComingSoonPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-900 px-6 text-center">
      <HeroBackground />

      <div className="relative">
        <p className="animate-fade-in-up text-sm font-medium tracking-wide text-navy-300" style={{ animationDelay: "3800ms" }}>
          Translation · Proofreading · Subtitling · Video · Copy
        </p>

        <div className="mt-5">
          <AnimatedHeroTitle align="center" />
        </div>

        <div className="animate-fade-in-up mt-10 flex flex-col items-center gap-3" style={{ animationDelay: "4400ms" }}>
          <p className="font-display text-3xl italic text-white md:text-4xl">Coming soon</p>
          <p className="max-w-md text-navy-300">
            We&apos;re putting the finishing touches on something special — check back soon.
          </p>
        </div>
      </div>
    </main>
  );
}
