"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { UserRole } from "@/types";
import { getUserById } from "./mock-data";

export interface Session {
  userId: string;
  role: UserRole;
}

interface SessionContextValue {
  session: Session;
  login: (userId: string) => void;
}

/** No backend yet — default to a signed-in demo consumer so app pages are viewable immediately. */
const DEFAULT_SESSION: Session = { userId: "u_con_1", role: "consumer" };

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session>(DEFAULT_SESSION);

  function login(userId: string) {
    const user = getUserById(userId);
    if (!user) return;
    setSession({ userId: user.id, role: user.role });
  }

  return <SessionContext.Provider value={{ session, login }}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within SessionProvider");
  return ctx;
}
