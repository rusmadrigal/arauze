"use client";

import { useState } from "react";

interface ReadMoreProps {
  text: string;
  maxChars?: number;
}

export default function ReadMore({ text, maxChars = 200 }: ReadMoreProps) {
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  if (text.length <= maxChars) {
    return <p>{text}</p>;
  }

  const visibleText = expanded ? text : text.slice(0, maxChars).trimEnd();

  return (
    <p className="text-slate-700 leading-relaxed">
      {visibleText}
      {!expanded && "… "}
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="ml-1 text-sm font-medium text-[#2F66D5] hover:text-[#2552AD] underline-offset-2 hover:underline"
      >
        {expanded ? "Leggi meno" : "Leggi tutto"}
      </button>
    </p>
  );
}
