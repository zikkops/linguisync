"use client";

import { Heart, X } from "lucide-react";
import { Avatar } from "@/components/shared/Avatar";
import { RatingStars } from "@/components/workers/RatingStars";
import { ButtonLink, Button } from "@/components/shared/Button";
import { EmptyState } from "@/components/shared/EmptyState";
import { useSession } from "@/lib/session";
import { getFavoritesByConsumer, getUserById, getWorkerProfile, getJobsByConsumer } from "@/lib/mock-data";

export default function FavoritesPage() {
  const { session } = useSession();
  const favorites = getFavoritesByConsumer(session.userId);
  const myJobs = getJobsByConsumer(session.userId);

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="font-display text-3xl font-semibold text-navy-950">Favorites</h1>
      <p className="mt-1 text-navy-400">Workers you&apos;ve saved for repeat business.</p>

      {favorites.length === 0 ? (
        <div className="mt-8">
          <EmptyState icon={Heart} title="No favorites yet" description="Favorite a worker from a job to request them directly next time." />
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-3">
          {favorites.map((fav) => {
            const worker = getUserById(fav.workerId);
            const profile = getWorkerProfile(fav.workerId);
            if (!worker || !profile) return null;
            const jobsTogether = myJobs.filter((j) => j.workerId === fav.workerId).length;

            return (
              <div key={fav.workerId} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-navy-100 bg-white p-5 shadow-sm shadow-navy-900/5">
                <div className="flex items-center gap-3">
                  <Avatar initial={worker.avatarInitial} />
                  <div>
                    <p className="font-display font-semibold text-navy-950">{worker.firstName}</p>
                    <RatingStars rating={profile.ratingAvg} />
                    <p className="mt-0.5 text-xs text-navy-400">{jobsTogether} job{jobsTogether === 1 ? "" : "s"} together</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ButtonLink href={`/app/jobs/new?worker=${worker.id}`} size="sm">
                    Request a job
                  </ButtonLink>
                  <Button variant="ghost" size="sm" aria-label="Remove favorite">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
