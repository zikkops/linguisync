import { Lock, Eye, Download, FileIcon } from "lucide-react";
import type { JobFile } from "@/types";
import { Button } from "@/components/shared/Button";
import { cn } from "@/lib/utils";

export function DeliverableCard({ file }: { file: JobFile }) {
  const locked = file.visibility === "locked";
  const previewOnly = file.visibility === "preview";

  return (
    <div className={cn("flex items-center gap-4 rounded-2xl p-4", locked ? "bg-navy-50" : "border border-navy-100 bg-white shadow-sm shadow-navy-900/5")}>
      <div
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
          locked ? "bg-navy-100" : "bg-navy-900"
        )}
      >
        {locked ? <Lock className="h-5 w-5 text-navy-400" /> : <FileIcon className="h-5 w-5 text-white" />}
      </div>

      <div className="min-w-0 flex-1">
        <p className={cn("truncate text-sm font-semibold", locked ? "text-navy-400" : "text-navy-950")}>
          {locked ? "Full deliverable (locked)" : file.fileName}
        </p>
        <p className="text-xs text-navy-400">
          {locked ? "Unlocks after final payment" : `${file.mimeType.split("/")[1]?.toUpperCase()} · ${file.sizeLabel}`}
        </p>
      </div>

      {locked ? (
        <span className="flex items-center gap-1.5 text-xs font-medium text-navy-400">
          <Lock className="h-3.5 w-3.5" /> Locked
        </span>
      ) : previewOnly ? (
        <Button size="sm" variant="outline">
          <Eye className="h-4 w-4" /> Preview
        </Button>
      ) : (
        <Button size="sm">
          <Download className="h-4 w-4" /> Download
        </Button>
      )}
    </div>
  );
}
