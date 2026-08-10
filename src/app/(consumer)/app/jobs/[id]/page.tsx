import { notFound } from "next/navigation";
import Link from "next/link";
import { Heart, Star, AlertTriangle, Clock3 } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { StatusBadge } from "@/components/jobs/StatusBadge";
import { JobStatusTimeline } from "@/components/jobs/JobStatusTimeline";
import { AgreementSummaryCard } from "@/components/jobs/AgreementSummaryCard";
import { CountdownTimer } from "@/components/jobs/CountdownTimer";
import { DeliverableCard } from "@/components/jobs/DeliverableCard";
import { ChatThread } from "@/components/jobs/ChatThread";
import { Avatar } from "@/components/shared/Avatar";
import { Button } from "@/components/shared/Button";
import { Card, CardBody } from "@/components/shared/Card";
import { Textarea } from "@/components/shared/Field";
import { SERVICE_ICONS } from "@/lib/constants";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  getJobById,
  getAgreementByJobId,
  getFilesByJobId,
  getMessagesByJobId,
  getUserById,
  getServiceBySlug,
  getDisputeByJobId,
  getReviewByJobId,
  isFavorited,
  jobs,
} from "@/lib/mock-data";

export function generateStaticParams() {
  return jobs.map((j) => ({ id: j.id }));
}

export default async function ConsumerJobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = getJobById(id);
  if (!job) notFound();

  const agreement = getAgreementByJobId(id);
  const files = getFilesByJobId(id);
  const messages = getMessagesByJobId(id);
  const worker = job.workerId ? getUserById(job.workerId) : null;
  const service = getServiceBySlug(job.serviceSlug);
  const dispute = getDisputeByJobId(id);
  const review = getReviewByJobId(id);
  const alreadyFavorited = worker ? isFavorited(job.consumerId, worker.id) : false;
  const Icon = service ? SERVICE_ICONS[service.slug] : null;

  return (
    <div className="mx-auto max-w-4xl">
      <Breadcrumbs items={[{ label: "My Jobs", href: "/app/jobs" }, { label: job.title }]} />

      <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900">
              <Icon className="h-5 w-5 text-white" />
            </div>
          )}
          <div>
            <h1 className="font-display text-2xl font-semibold text-navy-950">{job.title}</h1>
            <p className="text-sm text-navy-400">{service?.name} · Requested {formatDate(job.createdAt)}</p>
          </div>
        </div>
        <StatusBadge status={job.status} />
      </div>

      <div className="mt-8 overflow-x-auto">
        <div className="min-w-[560px] py-2">
          <JobStatusTimeline status={job.status} />
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* requested */}
          {job.status === "requested" && (
            <Card><CardBody>
              <p className="text-sm text-navy-600">Your request has been posted. You&apos;ll get a quote from a matching worker soon.</p>
            </CardBody></Card>
          )}

          {/* quoted */}
          {job.status === "quoted" && (
            <Card><CardBody className="flex flex-col gap-4">
              <p className="text-sm font-medium text-navy-500">Quote received</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-navy-400">Proposed price</p>
                  <p className="font-display text-xl font-semibold text-navy-950">{formatCurrency(job.agreedPrice)}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-navy-400">Turnaround</p>
                  <p className="font-display text-xl font-semibold text-navy-950">{job.turnaroundHours}h</p>
                </div>
              </div>
              <Button className="w-fit">Confirm agreement</Button>
            </CardBody></Card>
          )}

          {/* agreement_confirmed */}
          {job.status === "agreement_confirmed" && agreement && (
            <>
              <AgreementSummaryCard agreement={agreement} />
              <Card><CardBody className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-display font-semibold text-navy-950">Ready to start</p>
                  <p className="text-sm text-navy-500">Pay the 50% deposit to kick off the work.</p>
                </div>
                <Button>Pay deposit — {formatCurrency(job.depositAmount)}</Button>
              </CardBody></Card>
            </>
          )}

          {/* deposit_paid / in_progress */}
          {(job.status === "deposit_paid" || job.status === "in_progress") && (
            <>
              {job.dueAt && (
                <CountdownTimer targetIso={job.dueAt} variant="due" className="w-fit" />
              )}
              {agreement && <AgreementSummaryCard agreement={agreement} />}
              <div>
                <h2 className="font-display font-semibold text-navy-950">Job chat</h2>
                <p className="mt-1 text-xs text-navy-400">Contact info is automatically filtered from messages.</p>
                <div className="mt-3">
                  <ChatThread initialMessages={messages} currentUserId={job.consumerId} />
                </div>
              </div>
            </>
          )}

          {/* delivered */}
          {job.status === "delivered" && (
            <>
              <div className="flex items-center gap-2 rounded-2xl bg-status-waiting-bg px-4 py-3 text-status-waiting">
                <Clock3 className="h-4 w-4" />
                <p className="text-sm font-medium">Preview ready — pay the final amount to unlock full files.</p>
              </div>
              <div className="flex flex-col gap-3">
                {files.map((f) => <DeliverableCard key={f.id} file={f} />)}
              </div>
              <Card><CardBody className="flex items-center justify-between gap-4">
                <p className="text-sm text-navy-500">Final payment unlocks the full deliverable instantly.</p>
                <Button>Pay final — {formatCurrency(job.depositAmount)}</Button>
              </CardBody></Card>
              <div>
                <h2 className="font-display font-semibold text-navy-950">Job chat</h2>
                <div className="mt-3">
                  <ChatThread initialMessages={messages} currentUserId={job.consumerId} />
                </div>
              </div>
            </>
          )}

          {/* final_payment_paid */}
          {job.status === "final_payment_paid" && (
            <>
              <div className="flex items-center gap-2 rounded-2xl bg-status-waiting-bg px-4 py-3 text-status-waiting">
                <Clock3 className="h-4 w-4" />
                <p className="text-sm font-medium">Payment received — full files are unlocking now.</p>
              </div>
              <div className="flex flex-col gap-3">
                {files.map((f) => <DeliverableCard key={f.id} file={f} />)}
              </div>
            </>
          )}

          {/* released / completed */}
          {(job.status === "released" || job.status === "completed") && (
            <>
              {job.status === "completed" && job.purgeAt && (
                <CountdownTimer targetIso={job.purgeAt} variant="purge" className="w-fit" />
              )}
              <div className="flex flex-col gap-3">
                {files.map((f) => <DeliverableCard key={f.id} file={f} />)}
              </div>

              {review ? (
                <Card><CardBody>
                  <p className="text-sm font-medium text-navy-400">Your review</p>
                  <div className="mt-2 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-accent-500 text-accent-500" : "text-navy-200"}`} />
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-navy-600">&ldquo;{review.comment}&rdquo;</p>
                </CardBody></Card>
              ) : (
                <Card><CardBody>
                  <p className="font-display font-semibold text-navy-950">Leave a review</p>
                  <div className="mt-3 flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-6 w-6 cursor-pointer text-navy-200 hover:fill-accent-500 hover:text-accent-500" />
                    ))}
                  </div>
                  <div className="mt-3">
                    <Textarea id="review" placeholder="How did it go?" />
                  </div>
                  <Button size="sm" className="mt-3 w-fit">Submit review</Button>
                </CardBody></Card>
              )}
            </>
          )}

          {/* disputed */}
          {job.status === "disputed" && dispute && (
            <Card className="!border-none !bg-status-danger-bg"><CardBody>
              <div className="flex items-center gap-2 text-status-danger">
                <AlertTriangle className="h-4 w-4" />
                <p className="text-sm font-medium">Dispute — {dispute.status.replace("_", " ")}</p>
              </div>
              <p className="mt-3 text-sm text-navy-700">{dispute.reason}</p>
              <p className="mt-3 text-xs text-navy-400">Raised {formatDate(dispute.createdAt)} · Under admin review</p>
            </CardBody></Card>
          )}

          {/* cancelled / refunded */}
          {(job.status === "cancelled" || job.status === "refunded") && (
            <Card><CardBody>
              <p className="text-sm text-navy-600">
                This job was {job.status}. {job.status === "refunded" ? "The deposit was returned to your account." : ""}
              </p>
            </CardBody></Card>
          )}
        </div>

        <aside className="flex flex-col gap-5">
          <Card><CardBody className="flex flex-col gap-4">
            <p className="text-sm font-medium text-navy-400">Worker</p>
            {worker ? (
              <div className="flex items-center gap-3">
                <Avatar initial={worker.avatarInitial} />
                <div>
                  <p className="font-display font-semibold text-navy-950">{worker.firstName}</p>
                  <p className="text-xs text-navy-400">First name shown only</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-navy-400">Not yet assigned</p>
            )}
            {worker && (
              <Button variant={alreadyFavorited ? "secondary" : "outline"} size="sm">
                <Heart className={`h-4 w-4 ${alreadyFavorited ? "fill-navy-900" : ""}`} />
                {alreadyFavorited ? "Favorited" : "Add to Favorites"}
              </Button>
            )}
          </CardBody></Card>

          <Card><CardBody className="flex flex-col gap-3">
            <p className="text-sm font-medium text-navy-400">Job details</p>
            <Row label="Price" value={formatCurrency(job.agreedPrice)} />
            <Row label="Deposit" value={formatCurrency(job.depositAmount)} />
            <Row label="Due date" value={formatDate(job.dueAt)} />
            <Row label="Created" value={formatDate(job.createdAt)} />
          </CardBody></Card>

          <Link href="/app/payments" className="text-center text-sm font-medium text-navy-400 hover:text-navy-900">
            View payment history
          </Link>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-t border-navy-100 pt-2.5 text-sm">
      <span className="text-navy-400">{label}</span>
      <span className="font-semibold text-navy-900">{value}</span>
    </div>
  );
}
