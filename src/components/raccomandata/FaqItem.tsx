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
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-left px-5 py-4"
      >
        <span className="font-medium text-gray-800">{q}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}
