import { notFound } from "next/navigation";
import { CheckCircle2, Clock, DollarSign } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ButtonLink } from "@/components/shared/Button";
import { IntakeFormPreview } from "@/components/marketing/IntakeFormPreview";
import { TestimonialCard } from "@/components/marketing/TestimonialCard";
import { IntroBand } from "@/components/marketing/IntroBand";
import { Reveal } from "@/components/shared/Reveal";
import { SERVICE_ICONS } from "@/lib/constants";
import { services, getServiceBySlug, reviews, jobs } from "@/lib/mock-data";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const Icon = SERVICE_ICONS[service.slug];
  const relatedReviews = reviews.filter((r) => {
    const job = jobs.find((j) => j.id === r.jobId);
    return job?.serviceSlug === service.slug;
  });

  return (
    <>
      <IntroBand className="py-14">
        <Breadcrumbs dark items={[{ label: "Services", href: "/services" }, { label: service.name }]} />
        <div className="mt-5 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
            <Icon className="h-7 w-7 text-accent-400" />
          </div>
          <h1 className="font-display text-4xl font-semibold text-white">{service.name}</h1>
        </div>
        <p className="mt-4 max-w-2xl text-navy-300">{service.description}</p>
      </IntroBand>

      <section className="bg-white py-14">
        <div className="mx-auto grid max-w-5xl items-start gap-10 px-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Reveal>
              <h2 className="font-display text-xl font-semibold text-navy-950">What&apos;s included</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {service.whatsIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-navy-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-navy-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delayMs={100}>
              <h2 className="mt-10 font-display text-xl font-semibold text-navy-950">What we&apos;ll ask for</h2>
              <div className="mt-4">
                <IntakeFormPreview fields={service.intakeFormSchema} />
              </div>
            </Reveal>

            {relatedReviews.length > 0 && (
              <Reveal delayMs={150}>
                <h2 className="mt-10 font-display text-xl font-semibold text-navy-950">Client feedback</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {relatedReviews.map((r) => (
                    <TestimonialCard key={r.id} review={r} />
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          <aside className="h-fit rounded-2xl border border-navy-100 p-6 shadow-sm shadow-navy-900/5 md:sticky md:top-24">
            <div className="flex items-center gap-2.5 text-sm text-navy-700">
              <DollarSign className="h-4 w-4 text-navy-500" />
              <span className="font-semibold">{service.startingPrice}</span>
            </div>
            <div className="mt-3 flex items-center gap-2.5 text-sm text-navy-700">
              <Clock className="h-4 w-4 text-navy-500" />
              <span className="font-semibold">{service.typicalTurnaround}</span>
            </div>
            <ButtonLink href="/register" className="mt-6 w-full">
              Get started
            </ButtonLink>
          </aside>
        </div>
      </section>
    </>
  );
}
