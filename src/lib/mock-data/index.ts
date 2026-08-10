export * from "./services";
export * from "./users";
export * from "./jobs";
export * from "./job-agreements";
export * from "./job-files";
export * from "./messages";
export * from "./payments";
export * from "./favorites";
export * from "./notifications";
export * from "./reviews";
export * from "./support";
export * from "./disputes";

import { workerProfiles } from "./users";
import { jobs } from "./jobs";

/** Workers publicly listed in the directory. */
export function getListedWorkers() {
  return workerProfiles.filter((w) => w.isListed);
}

export function getWorkersByService(serviceSlug: string) {
  return getListedWorkers().filter((w) => w.services.includes(serviceSlug as never));
}

/** All jobs, newest first — used by admin oversight. */
export function getAllJobsSorted() {
  return [...jobs].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getOverdueJobs() {
  const now = new Date("2026-08-06T12:00:00Z").getTime();
  return jobs.filter((j) => j.dueAt && new Date(j.dueAt).getTime() < now && !["completed", "released", "cancelled", "refunded"].includes(j.status));
}
