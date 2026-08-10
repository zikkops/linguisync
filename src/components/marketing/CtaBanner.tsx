import { ButtonLink } from "@/components/shared/Button";
import { Reveal } from "@/components/shared/Reveal";

export function CtaBanner({
  title = "Ready to get started?",
  subtitle = "Post a job in minutes, or apply to start earning as a worker.",
  primaryLabel = "Post a job",
  primaryHref = "/register",
  secondaryLabel = "Become a worker",
  secondaryHref = "/become-a-worker",
}: {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 py-20">
      <div className="glow-blob h-80 w-80 bg-accent-500/15" style={{ top: "-4rem", left: "-4rem" }} />
      <div className="glow-blob h-72 w-72 bg-navy-500/25" style={{ bottom: "-5rem", right: "-4rem" }} />

      <Reveal className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center">
        <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">{title}</h2>
        <p className="max-w-lg text-navy-300">{subtitle}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink href={primaryHref} size="lg" className="!bg-white !text-navy-900 hover:!bg-navy-50">
            {primaryLabel}
          </ButtonLink>
          <ButtonLink href={secondaryHref} size="lg" variant="ghost" className="!text-white hover:!bg-white/10">
            {secondaryLabel}
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
