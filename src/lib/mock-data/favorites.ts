import type { Favorite } from "@/types";

export const favorites: Favorite[] = [
  { consumerId: "u_con_1", workerId: "u_wk_1", createdAt: "2026-07-30T09:00:00Z" },
  { consumerId: "u_con_1", workerId: "u_wk_3", createdAt: "2026-07-26T09:00:00Z" },
  { consumerId: "u_con_2", workerId: "u_wk_1", createdAt: "2026-06-29T09:00:00Z" },
  { consumerId: "u_con_3", workerId: "u_wk_2", createdAt: "2026-07-14T09:00:00Z" },
  { consumerId: "u_con_3", workerId: "u_wk_4", createdAt: "2026-08-01T09:00:00Z" },
];

export function getFavoritesByConsumer(consumerId: string) {
  return favorites.filter((f) => f.consumerId === consumerId);
}

export function isFavorited(consumerId: string, workerId: string) {
  return favorites.some((f) => f.consumerId === consumerId && f.workerId === workerId);
}
