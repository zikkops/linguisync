import type { Metadata } from "next";
import { BriefcaseBusiness } from "lucide-react";
import { IntroBand } from "@/components/marketing/IntroBand";
import { VacancyCard } from "@/components/marketing/VacancyCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { Reveal } from "@/components/shared/Reveal";
import { vacancies } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Careers — LinguiSync" };

export default function CareersPage() {
  return (
    <>
      <IntroBand>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-navy-300">Careers</p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-white">Join our team</h1>
          <p className="mt-4 text-navy-300">Current openings at LinguiSync.</p>
        </div>
      </IntroBand>

      <section className="bg-white py-16">
        <div className="mx-auto flex max-w-3xl flex-col gap-5 px-6">
          {vacancies.length === 0 ? (
            <Reveal>
              <EmptyState
                icon={BriefcaseBusiness}
                title="No vacancies available!"
                description="New opportunities are posted regularly, check again later for the chance to be part of our team!"
              />
            </Reveal>
          ) : (
            vacancies.map((v, i) => (
              <Reveal key={v.id} delayMs={i * 80}>
                <VacancyCard vacancy={v} />
              </Reveal>
            ))
          )}
        </div>
      </section>
    </>
  );
}
