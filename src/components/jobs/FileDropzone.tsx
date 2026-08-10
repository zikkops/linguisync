"use client";

import { useState } from "react";
import { UploadCloud, FileCheck } from "lucide-react";

export function FileDropzone({ label = "Reference files", hint = "PDF, DOCX, MP4, JPG, PNG up to 500MB" }: { label?: string; hint?: string }) {
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <div>
      <p className="text-sm font-medium text-navy-700">{label}</p>
      <label className="mt-1.5 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-navy-200 bg-navy-50/40 px-6 py-8 text-center transition-colors hover:border-navy-400 hover:bg-navy-50">
        <input
          type="file"
          className="hidden"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
        />
        {fileName ? (
          <>
            <FileCheck className="h-6 w-6 text-status-success" />
            <span className="text-sm font-medium text-navy-700">{fileName}</span>
            <span className="text-xs text-navy-400">Click to replace</span>
          </>
        ) : (
          <>
            <UploadCloud className="h-6 w-6 text-navy-400" />
            <span className="text-sm font-medium text-navy-700">Click to upload or drag & drop</span>
            <span className="text-xs text-navy-400">{hint}</span>
          </>
        )}
      </label>
    </div>
  );
}
