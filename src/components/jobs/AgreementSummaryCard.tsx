import { FileCheck2 } from "lucide-react";
import type { JobAgreement } from "@/types";
import { formatCurrency, formatDateTime } from "@/lib/utils";

export function AgreementSummaryCard({ agreement }: { agreement: JobAgreement }) {
  return (
    <div className="rounded-2xl bg-navy-50/60 p-5">
      <div className="flex items-center gap-2">
        <FileCheck2 className="h-4 w-4 text-navy-500" />
        <p className="text-sm font-medium text-navy-500">Confirmed agreement</p>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-navy-700">{agreement.scopeSummary}</p>
      <div className="mt-4 grid grid-cols-2 gap-4 border-t border-navy-200/70 pt-4 sm:grid-cols-3">
        <div>
          <p className="text-xs font-medium text-navy-400">Price</p>
          <p className="font-display font-semibold text-navy-950">{formatCurrency(agreement.price)}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-navy-400">Turnaround</p>
          <p className="font-display font-semibold text-navy-950">{agreement.turnaroundHours}h</p>
        </div>
        {agreement.confirmedByConsumerAt && (
          <div>
            <p className="text-xs font-medium text-navy-400">Confirmed</p>
            <p className="text-sm font-medium text-navy-700">{formatDateTime(agreement.confirmedByConsumerAt)}</p>
          </div>
        )}
      </div>
    </div>
  );
}
