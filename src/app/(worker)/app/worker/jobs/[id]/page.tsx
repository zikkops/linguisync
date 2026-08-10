import { notFound } from "next/navigation";
import Link from "next/link";
import { AlertTriangle, Clock3, UploadCloud, Wallet } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { StatusBadge } from "@/components/jobs/StatusBadge";
import { JobStatusTimeline } from "@/components/jobs/JobStatusTimeline";
import { AgreementSummaryCard } from "@/components/jobs/AgreementSummaryCard";
import { CountdownTimer } from "@/components/jobs/CountdownTimer";
import { DeliverableCard } from "@/components/jobs/DeliverableCard";
import { FileDropzone } from "@/components/jobs/FileDropzone";
import { ChatThread } from "@/components/jobs/ChatThread";
import { Avatar } from "@/components/shared/Avatar";
import { Button } from "@/components/shared/Button";
import { Card, CardBody } from "@/components/shared/Card";
import { Input } from "@/components/shared/Field";
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
  getPayoutsByWorker,
  jobs,
} from "@/lib/mock-data";

export function generateStaticParams() {
  return jobs.map((j) => ({ id: j.id }));
}

export default async function WorkerJobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = getJobById(id);
  if (!job) notFound();

  const agreement = getAgreementByJobId(id);
  const files = getFilesByJobId(id);
  const messages = getMessagesByJobId(id);
  const consumer = getUserById(job.consumerId);
  const service = getServiceBySlug(job.serviceSlug);
  const dispute = getDisputeByJobId(id);
  const Icon = service ? SERVICE_ICONS[service.slug] : null;
  const workerId = job.workerId ?? "";
  const payout = getPayoutsByWorker(workerId).find((p) => p.jobId === job.id);

  const isOpen = job.status === "requested" && !job.workerId;

  return (
    <div className="mx-auto max-w-4xl">
      <Breadcrumbs items={[{ label: "Job Requests", href: "/app/worker/jobs" }, { label: job.title }]} />

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
          <Card><CardBody>
            <p className="text-sm font-medium text-navy-400">Brief</p>
            <p className="mt-2 text-sm leading-relaxed text-navy-700">{job.brief}</p>
          </CardBody></Card>

          {/* open/unassigned */}
          {isOpen && (
            <Card><CardBody className="flex flex-col gap-4">
              <p className="text-sm font-medium text-navy-500">Propose a quote</p>
              <div className="grid grid-cols-2 gap-4">
                <Input id="price" label="Price ($)" type="number" placeholder="e.g. 250" />
                <Input id="turnaround" label="Turnaround (hours)" type="number" placeholder="e.g. 48" />
              </div>
              <div className="flex gap-2">
                <Button>Accept & send quote</Button>
                <Button variant="outline">Decline</Button>
              </div>
            </CardBody></Card>
          )}

          {/* quoted — awaiting consumer confirmation */}
          {job.status === "quoted" && (
            <Card><CardBody>
              <p className="text-sm font-medium text-navy-500">Quote sent</p>
              <div className="mt-3 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-navy-400">Your price</p>
                  <p className="font-display text-xl font-semibold text-navy-950">{formatCurrency(job.agreedPrice)}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-navy-400">Turnaround</p>
                  <p className="font-display text-xl font-semibold text-navy-950">{job.turnaroundHours}h</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-navy-500">Waiting on the client to confirm this agreement.</p>
            </CardBody></Card>
          )}

          {/* agreement_confirmed — waiting on deposit */}
          {job.status === "agreement_confirmed" && agreement && (
            <>
              <AgreementSummaryCard agreement={agreement} />
              <div className="flex items-center gap-2 rounded-2xl bg-status-info-bg px-4 py-3 text-status-info">
                <Clock3 className="h-4 w-4" /> <p className="text-sm font-medium">Waiting on the client&apos;s deposit before work can start.</p>
              </div>
            </>
          )}

          {/* deposit_paid / in_progress */}
          {(job.status === "deposit_paid" || job.status === "in_progress") && (
            <>
              {job.dueAt && <CountdownTimer targetIso={job.dueAt} variant="due" className="w-fit" />}
              {agreement && <AgreementSummaryCard agreement={agreement} />}
              <Card><CardBody>
                <p className="flex items-center gap-2 text-sm font-medium text-navy-500">
                  <UploadCloud className="h-4 w-4 text-navy-500" /> Upload deliverable
                </p>
                <p className="mt-1 text-xs text-navy-400">Creates a locked preview + final file — final unlocks once the client pays.</p>
                <div className="mt-3"><FileDropzone label="Deliverable file" /></div>
                <Button size="sm" className="mt-3 w-fit">Mark as delivered</Button>
              </CardBody></Card>
              <div>
                <h2 className="font-display font-semibold text-navy-950">Job chat</h2>
                <div className="mt-3">
                  <ChatThread initialMessages={messages} currentUserId={workerId} />
                </div>
              </div>
            </>
          )}

          {/* delivered — awaiting final payment */}
          {job.status === "delivered" && (
            <>
              <div className="flex items-center gap-2 rounded-2xl bg-status-waiting-bg px-4 py-3 text-status-waiting">
                <Clock3 className="h-4 w-4" /> <p className="text-sm font-medium">Delivered — waiting on the client&apos;s final payment.</p>
              </div>
              <div className="flex flex-col gap-3">{files.map((f) => <DeliverableCard key={f.id} file={f} />)}</div>
              <div>
                <h2 className="font-display font-semibold text-navy-950">Job chat</h2>
                <div className="mt-3"><ChatThread initialMessages={messages} currentUserId={workerId} /></div>
              </div>
            </>
          )}

          {/* final_payment_paid */}
          {job.status === "final_payment_paid" && (
            <div className="flex items-center gap-2 rounded-2xl bg-status-waiting-bg px-4 py-3 text-status-waiting">
              <Wallet className="h-4 w-4" /> <p className="text-sm font-medium">Payment received — your payout is being processed.</p>
            </div>
          )}

          {/* released / completed */}
          {(job.status === "released" || job.status === "completed") && (
            <Card><CardBody>
              <p className="text-sm font-medium text-navy-400">Payout</p>
              <p className="mt-1 font-display text-2xl font-semibold text-navy-950">{formatCurrency(payout?.amount)}</p>
              <p className="mt-1 text-sm text-navy-500 capitalize">Status: {payout?.status ?? "pending"}</p>
              <Link href="/app/worker/earnings" className="mt-3 inline-block text-sm font-medium text-navy-500 hover:text-navy-900">
                View all earnings
              </Link>
            </CardBody></Card>
          )}

          {/* disputed */}
          {job.status === "disputed" && dispute && (
            <Card className="!border-none !bg-status-danger-bg"><CardBody>
              <div className="flex items-center gap-2 text-status-danger">
                <AlertTriangle className="h-4 w-4" />
                <p className="text-sm font-medium">Dispute — {dispute.status.replace("_", " ")}</p>
              </div>
              <p className="mt-3 text-sm text-navy-700">{dispute.reason}</p>
            </CardBody></Card>
          )}

          {(job.status === "cancelled" || job.status === "refunded") && (
            <Card><CardBody>
              <p className="text-sm text-navy-600">This job was {job.status}.</p>
            </CardBody></Card>
          )}
        </div>

        <aside className="flex flex-col gap-5">
          <Card><CardBody className="flex flex-col gap-4">
            <p className="text-sm font-medium text-navy-400">Client</p>
            {consumer ? (
              <div className="flex items-center gap-3">
                <Avatar initial={consumer.avatarInitial} />
                <div>
                  <p className="font-display font-semibold text-navy-950">{consumer.firstName}</p>
                  <p className="text-xs text-navy-400">First name shown only</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-navy-400">Not yet assigned</p>
            )}
          </CardBody></Card>

          <Card><CardBody className="flex flex-col gap-3">
            <p className="text-sm font-medium text-navy-400">Job details</p>
            <Row label="Price" value={formatCurrency(job.agreedPrice)} />
            <Row label="Due date" value={formatDate(job.dueAt)} />
            <Row label="Created" value={formatDate(job.createdAt)} />
          </CardBody></Card>
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
