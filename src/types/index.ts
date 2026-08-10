export type UserRole = "consumer" | "worker" | "admin";

export interface User {
  id: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatarInitial: string;
  createdAt: string;
  isSuspended?: boolean;
  deletionRequestedAt?: string | null;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  serviceSlug: ServiceSlug;
}

export interface WorkerProfile {
  userId: string;
  bio: string;
  services: ServiceSlug[];
  languages: string[]; // e.g. "EN → FR"
  portfolio: PortfolioItem[];
  ratingAvg: number;
  jobsCompletedCount: number;
  baseRate: number;
  rateUnit: "per word" | "per minute" | "per hour" | "flat";
  isAvailable: boolean;
  isListed: boolean;
}

export interface ConsumerProfile {
  userId: string;
  companyName?: string;
}

export type ServiceSlug =
  | "translation"
  | "proofreading"
  | "subtitling"
  | "video-editing"
  | "copywriting";

export interface IntakeField {
  name: string;
  label: string;
  type: "text" | "select" | "number" | "textarea";
  options?: string[];
}

export interface Service {
  id: string;
  slug: ServiceSlug;
  name: string;
  shortDescription: string;
  description: string;
  whatsIncluded: string[];
  icon: string;
  startingPrice: string;
  typicalTurnaround: string;
  intakeFormSchema: IntakeField[];
}

export type JobStatus =
  | "requested"
  | "quoted"
  | "agreement_confirmed"
  | "deposit_paid"
  | "in_progress"
  | "delivered"
  | "final_payment_paid"
  | "released"
  | "completed"
  | "disputed"
  | "cancelled"
  | "refunded";

export interface Job {
  id: string;
  consumerId: string;
  workerId: string | null;
  requestedWorkerId?: string | null;
  serviceSlug: ServiceSlug;
  title: string;
  brief: string;
  status: JobStatus;
  agreedPrice: number | null;
  depositAmount: number | null;
  depositPaidAt: string | null;
  turnaroundHours: number | null;
  dueAt: string | null;
  deliveredAt: string | null;
  finalPaidAt: string | null;
  releasedAt: string | null;
  completedAt: string | null;
  purgeAt: string | null;
  createdAt: string;
}

export interface JobAgreement {
  id: string;
  jobId: string;
  price: number;
  turnaroundHours: number;
  scopeSummary: string;
  proposedBy: string;
  confirmedByConsumerAt: string | null;
  createdAt: string;
}

export type JobFileKind = "reference" | "deliverable_preview" | "deliverable_final";
export type JobFileVisibility = "locked" | "preview" | "unlocked";

export interface JobFile {
  id: string;
  jobId: string;
  uploadedBy: string;
  kind: JobFileKind;
  fileName: string;
  mimeType: string;
  sizeLabel: string;
  visibility: JobFileVisibility;
  scannedStatus: "pending" | "clean" | "flagged";
  createdAt: string;
}

export interface Message {
  id: string;
  jobId: string;
  senderId: string;
  body: string;
  contactInfoFlagged?: boolean;
  createdAt: string;
}

export type PaymentType = "deposit" | "final";
export type PaymentStatus = "pending" | "paid" | "refunded" | "failed";

export interface Payment {
  id: string;
  jobId: string;
  type: PaymentType;
  amount: number;
  status: PaymentStatus;
  provider: string;
  paidAt: string | null;
}

export interface Payout {
  id: string;
  workerId: string;
  jobId: string;
  amount: number;
  status: "pending" | "paid";
  paidAt: string | null;
}

export interface Favorite {
  consumerId: string;
  workerId: string;
  createdAt: string;
}

export type NotificationType =
  | "favorite_job_request"
  | "deposit_paid"
  | "delivered"
  | "payment_released"
  | "message"
  | "support_reply"
  | "file_purge_reminder";

export interface AppNotification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  readAt: string | null;
  createdAt: string;
  jobId?: string;
}

export interface Review {
  id: string;
  jobId: string;
  consumerId: string;
  workerId: string;
  rating: number;
  comment: string;
  isFeaturedOnHome: boolean;
  createdAt: string;
}

export type SupportSource = "consumer" | "worker" | "pre_sales";
export type TicketStatus = "open" | "pending" | "resolved";

export interface SupportTicket {
  id: string;
  userId: string | null;
  source: SupportSource;
  subject: string;
  status: TicketStatus;
  priority: "low" | "normal" | "high";
  jobId?: string;
  createdAt: string;
}

export interface SupportMessage {
  id: string;
  ticketId: string;
  senderId: string | null;
  senderLabel: string;
  body: string;
  createdAt: string;
}

export type DisputeStatus = "open" | "under_review" | "resolved";
export type DisputeResolution = "refund_consumer" | "release_to_worker" | "partial" | "other";

export interface Dispute {
  id: string;
  jobId: string;
  raisedBy: string;
  reason: string;
  status: DisputeStatus;
  resolution?: DisputeResolution;
  resolvedByAdminId?: string;
  createdAt: string;
  resolvedAt?: string;
}
