"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItemProps {
  q: string;
  children: React.ReactNode;
}

export default function FaqItem({ q, children }: FaqItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <span className="rac-card-heading block min-w-0 flex-1">{q}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="rac-body px-5 pb-4">{children}</div>
      )}
    </div>
  );
}
