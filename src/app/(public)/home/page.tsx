import type { Metadata } from "next";
import { Hero } from "@/components/marketing/Hero";
import { TrustStrip } from "@/components/marketing/TrustStrip";
import { HowItWorksSteps } from "@/components/marketing/HowItWorksSteps";
import { ServiceCard } from "@/components/marketing/ServiceCard";
import { TestimonialCard } from "@/components/marketing/TestimonialCard";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { services, getFeaturedTestimonials } from "@/lib/mock-data";

export const metadata: Metadata = { title: "LinguiSync — Translation, Editing & Content Services" };

export default function HomePage() {
  const testimonials = getFeaturedTestimonials();

  return (
    <>
      <Hero />
      <TrustStrip />

      <section className="bg-white pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="What we offer"
              title="Five services, one trusted platform"
              subtitle="Every job is handled by a real specialist and protected by our two-step payment system."
            />
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delayMs={i * 80}>
                <ServiceCard service={s} detailed />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <HowItWorksSteps />

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading eyebrow="Trusted by clients" title="What people are saying" align="center" className="mx-auto" />
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((review, i) => (
              <Reveal key={review.id} delayMs={i * 100}>
                <TestimonialCard review={review} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
