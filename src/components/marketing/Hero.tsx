import Link from "next/link";
import { Search, Briefcase, ArrowRight } from "lucide-react";
import { AnimatedHeroTitle } from "./AnimatedHeroTitle";
import { HeroBackground } from "./HeroBackground";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-900">
      <HeroBackground />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 pb-28 pt-20 md:grid-cols-2 md:items-center md:pt-28">
        <div>
          <p
            className="animate-fade-in-up text-sm font-medium tracking-wide text-navy-300"
            style={{ animationDelay: "3800ms" }}
          >
            Translation · Proofreading · Subtitling · Video · Copy
          </p>

          <div className="mt-5">
            <AnimatedHeroTitle />
          </div>

          <p
            className="animate-fade-in-up mt-6 max-w-lg text-base leading-relaxed text-navy-300 md:text-lg"
            style={{ animationDelay: "3950ms" }}
          >
            Post a job, get matched with a vetted specialist, and pay in two steps — deposit to start,
            final payment to unlock your finished work. No surprises.
          </p>
        </div>

        <div
          className="animate-fade-in-up relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm"
          style={{ animationDelay: "4400ms" }}
        >
          <p className="text-xs font-medium uppercase tracking-widest text-navy-400">Get started</p>
          <div className="mt-5 flex flex-col gap-3">
            <Link
              href="/register"
              className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-white/20 hover:bg-white/[0.07]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                <Search className="h-5 w-5 text-accent-400" />
              </span>
              <span className="flex-1">
                <span className="block font-display italic font-semibold text-white">Looking for professionals</span>
                <span className="block text-sm text-navy-300">Post a job & get matched with a specialist</span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-navy-400 transition-transform group-hover:translate-x-0.5 group-hover:text-white" />
            </Link>

            <Link
              href="/become-a-worker"
              className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-white/20 hover:bg-white/[0.07]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                <Briefcase className="h-5 w-5 text-accent-400" />
              </span>
              <span className="flex-1">
                <span className="block font-display italic font-semibold text-white">Looking for work</span>
                <span className="block text-sm text-navy-300">Browse open jobs and start earning</span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-navy-400 transition-transform group-hover:translate-x-0.5 group-hover:text-white" />
            </Link>
          </div>
        </div>
      </div>

      <svg
        className="relative block h-16 w-full text-white md:h-24"
        viewBox="0 0 1440 100"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          fill="currentColor"
          d="M0,32L60,37.3C120,43,240,53,360,58.7C480,64,600,64,720,56C840,48,960,32,1080,29.3C1200,27,1320,37,1380,42.7L1440,48L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"
        />
      </svg>
    </section>
  );
}
