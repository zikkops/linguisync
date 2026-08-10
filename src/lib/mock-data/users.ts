import type { User, ConsumerProfile, WorkerProfile } from "@/types";

export const users: User[] = [
  // Consumers
  {
    id: "u_con_1",
    role: "consumer",
    firstName: "Sarah",
    lastName: "Chen",
    email: "sarah.chen@example.com",
    phone: "+1 415 555 0142",
    avatarInitial: "S",
    createdAt: "2026-03-11T09:00:00Z",
  },
  {
    id: "u_con_2",
    role: "consumer",
    firstName: "Marcus",
    lastName: "Webb",
    email: "marcus.webb@example.com",
    phone: "+1 212 555 0198",
    avatarInitial: "M",
    createdAt: "2026-04-02T14:20:00Z",
  },
  {
    id: "u_con_3",
    role: "consumer",
    firstName: "Elena",
    lastName: "Popescu",
    email: "elena.popescu@example.com",
    phone: "+40 722 555 019",
    avatarInitial: "E",
    createdAt: "2026-05-19T11:10:00Z",
  },
  // Workers
  {
    id: "u_wk_1",
    role: "worker",
    firstName: "Daniela",
    lastName: "Rossi",
    email: "daniela.rossi@example.com",
    phone: "+39 345 555 0110",
    avatarInitial: "D",
    createdAt: "2026-02-01T10:00:00Z",
  },
  {
    id: "u_wk_2",
    role: "worker",
    firstName: "Kenji",
    lastName: "Tanaka",
    email: "kenji.tanaka@example.com",
    phone: "+81 90 5555 0123",
    avatarInitial: "K",
    createdAt: "2026-02-14T10:00:00Z",
  },
  {
    id: "u_wk_3",
    role: "worker",
    firstName: "Amara",
    lastName: "Okafor",
    email: "amara.okafor@example.com",
    phone: "+44 7700 900123",
    avatarInitial: "A",
    createdAt: "2026-03-03T10:00:00Z",
  },
  {
    id: "u_wk_4",
    role: "worker",
    firstName: "Lucas",
    lastName: "Meyer",
    email: "lucas.meyer@example.com",
    phone: "+49 151 55501234",
    avatarInitial: "L",
    createdAt: "2026-03-20T10:00:00Z",
  },
  {
    id: "u_wk_5",
    role: "worker",
    firstName: "Priya",
    lastName: "Nair",
    email: "priya.nair@example.com",
    phone: "+91 98765 43210",
    avatarInitial: "P",
    createdAt: "2026-04-10T10:00:00Z",
  },
  // Admin
  {
    id: "u_admin_1",
    role: "admin",
    firstName: "Jordan",
    lastName: "Blake",
    email: "jordan.blake@linguisync.com",
    avatarInitial: "J",
    createdAt: "2026-01-05T10:00:00Z",
  },
];

export const consumerProfiles: ConsumerProfile[] = [
  { userId: "u_con_1", companyName: "Northbridge Studio" },
  { userId: "u_con_2", companyName: "Webb & Co." },
  { userId: "u_con_3" },
];

export const workerProfiles: WorkerProfile[] = [
  {
    userId: "u_wk_1",
    bio: "Italian↔English translator with 8 years of experience in legal and business documents. Formerly in-house at a Milan law firm.",
    services: ["translation", "proofreading"],
    languages: ["IT → EN", "EN → IT", "ES → EN"],
    portfolio: [
      { id: "p1", title: "SaaS Terms of Service (IT→EN)", description: "42,000-word legal translation for a European fintech.", serviceSlug: "translation" },
      { id: "p2", title: "Investor Deck Localization", description: "Pitch deck adapted for an Italian-speaking investor audience.", serviceSlug: "translation" },
    ],
    ratingAvg: 4.9,
    jobsCompletedCount: 214,
    baseRate: 0.09,
    rateUnit: "per word",
    isAvailable: true,
    isListed: true,
  },
  {
    userId: "u_wk_2",
    bio: "Subtitler and video editor based in Tokyo. Specializes in Japanese↔English content for streaming and corporate training.",
    services: ["subtitling", "video-editing"],
    languages: ["JA → EN", "EN → JA"],
    portfolio: [
      { id: "p3", title: "Corporate Training Series", description: "12-episode training series subtitled JA→EN for a manufacturing client.", serviceSlug: "subtitling" },
      { id: "p4", title: "Indie Documentary Captions", description: "Full-length documentary captioned and burned-in for festival submission.", serviceSlug: "subtitling" },
    ],
    ratingAvg: 4.8,
    jobsCompletedCount: 156,
    baseRate: 1.4,
    rateUnit: "per minute",
    isAvailable: true,
    isListed: true,
  },
  {
    userId: "u_wk_3",
    bio: "Copywriter and editor for B2B SaaS brands. Ex-agency, now freelance full-time. I write like your product actually matters.",
    services: ["copywriting", "proofreading"],
    languages: ["EN (native)"],
    portfolio: [
      { id: "p5", title: "Landing Page Rewrite", description: "Full homepage rewrite that lifted a client's signup conversion.", serviceSlug: "copywriting" },
      { id: "p6", title: "Email Onboarding Sequence", description: "7-email onboarding sequence for a productivity app.", serviceSlug: "copywriting" },
    ],
    ratingAvg: 5.0,
    jobsCompletedCount: 98,
    baseRate: 0.22,
    rateUnit: "per word",
    isAvailable: true,
    isListed: true,
  },
  {
    userId: "u_wk_4",
    bio: "Video editor focused on short-form social and brand content. Fast turnaround, clean cuts, no bloated timelines.",
    services: ["video-editing"],
    languages: ["EN (native)"],
    portfolio: [
      { id: "p7", title: "Product Launch Reel", description: "60-second vertical launch video edited from raw studio footage.", serviceSlug: "video-editing" },
      { id: "p8", title: "Founder Interview Series", description: "6-part interview series cut down to social-ready clips.", serviceSlug: "video-editing" },
    ],
    ratingAvg: 4.7,
    jobsCompletedCount: 132,
    baseRate: 40,
    rateUnit: "flat",
    isAvailable: false,
    isListed: true,
  },
  {
    userId: "u_wk_5",
    bio: "Hindi/French↔English translator and copywriter. I work across marketing and technical content — happy to jump between registers.",
    services: ["translation", "copywriting"],
    languages: ["HI → EN", "EN → HI", "FR → EN"],
    portfolio: [
      { id: "p9", title: "App Store Localization", description: "Full app store listing localized EN→HI for a consumer fintech app.", serviceSlug: "translation" },
      { id: "p10", title: "Brand Voice Guide", description: "Bilingual brand voice and tone guide for a D2C skincare brand.", serviceSlug: "copywriting" },
    ],
    ratingAvg: 4.9,
    jobsCompletedCount: 87,
    baseRate: 0.1,
    rateUnit: "per word",
    isAvailable: true,
    isListed: true,
  },
];

export function getUserById(id: string | null | undefined) {
  return users.find((u) => u.id === id) ?? null;
}

export function getWorkerProfile(userId: string) {
  return workerProfiles.find((w) => w.userId === userId) ?? null;
}

export function getConsumerProfile(userId: string) {
  return consumerProfiles.find((c) => c.userId === userId) ?? null;
}
