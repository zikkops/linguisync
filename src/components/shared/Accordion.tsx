"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Accordion({ items }: { items: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={item.question}
            className={cn(
              "rounded-2xl border px-5 transition-colors",
              isOpen ? "border-navy-200 bg-navy-50/60" : "border-navy-100 bg-white"
            )}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="font-display font-semibold text-navy-950">{item.question}</span>
              {isOpen ? <Minus className="h-5 w-5 shrink-0 text-navy-600" /> : <Plus className="h-5 w-5 shrink-0 text-navy-300" />}
            </button>
            {isOpen && <p className="pb-5 text-sm leading-relaxed text-navy-500">{item.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}
