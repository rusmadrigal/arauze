"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import HeroHeader from "../components/home/HeroHeader";
import TopNav from "../components/ui/TopNav";
import SearchForm from "../components/home/SearchForm";
import ComeFunziona from "../components/home/ComeFunziona";
import UltimeRaccomandateAnalizzate from "../components/home/UltimeAnalizzate";
import TextBlockHome from "../components/home/TextBlockHome";
import FaqsHome from "../components/home/FaqsHome";
import NewsletterCTA from "../components/ui/NewsletterCTA";

/** Reusable type for urgency badges to avoid repeating unions */
type Urgency = "ALTA" | "BASSA" | "RITIRATA";

export default function HomePage() {
  const r = useRouter(); // kept for future navigations
  const [code, setCode] = useState(""); // kept for future search/UX flows

  // Avoid "unused variable" warnings while preserving the variables.
  // This is a no-op and has zero runtime impact.
  void r;
  void code;
  void setCode;

  return (
    <main className="mx-auto max-w-5xl px-4" role="main">
      {/* Primary card container for the home content */}
      <div className="rounded-2xl shadow-card bg-white p-6 md:p-10">
        {/* Simple header / top navigation */}
        <TopNav />

        {/* Hero and search form */}
        <HeroHeader />
        <SearchForm />

        {/* How it works */}
        <ComeFunziona />

        {/* Latest analyzed raccomandate (static sample data preserved) */}
        <UltimeRaccomandateAnalizzate
          items={[
            {
              code: "573",
              sender: "AGENZIA DEI…",
              urgency: "ALTA" as Urgency,
            },
            {
              code: "573",
              sender: "AGENZIA DEI…",
              urgency: "BASSA" as Urgency,
            },
            {
              code: "573",
              sender: "AGENZIA DEI…",
              urgency: "RITIRATA" as Urgency,
            },
          ]}
        />

        {/* Informational block */}
        <TextBlockHome />

        {/* FAQs (separate component) */}
        <FaqsHome />

        {/* Footer CTA */}
        <div className="mt-10">
          <NewsletterCTA />
        </div>
      </div>
    </main>
  );
}

/* ---------- Internal UI components (kept as requested) ---------- */

function Step({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div
      className="rounded-xl border bg-white p-5 flex items-center gap-4"
      aria-label={subtitle ? `${title}: ${subtitle}` : title}
    >
      <div
        className="h-10 w-10 flex items-center justify-center text-lg rounded-full bg-surface"
        aria-hidden="true"
      >
        {icon}
      </div>
      <div>
        <div className="font-semibold">{title}</div>
        {subtitle ? (
          <div className="text-sm text-gray-500">{subtitle}</div>
        ) : null}
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      className="px-4 py-3 text-xs font-medium uppercase tracking-wide"
      scope="col"
    >
      {children}
    </th>
  );
}

function Badge({
  tone,
  children,
}: {
  tone: Urgency;
  children: React.ReactNode;
}) {
  // Defensive mapping in case of unexpected tone values
  const map: Record<Urgency, string> = {
    ALTA: "bg-rose-100 text-rose-700",
    BASSA: "bg-amber-100 text-amber-700",
    RITIRATA: "bg-emerald-100 text-emerald-700",
  };
  const urgencyClass = map[tone] ?? "bg-gray-100 text-gray-700";

  return (
    <span
      className={`px-2.5 py-1 rounded-md text-xs font-semibold ${urgencyClass}`}
    >
      {children}
    </span>
  );
}

function Row({
  code,
  sender,
  urgency,
  state,
}: {
  code: string;
  sender: string;
  urgency: Urgency;
  state: string;
}) {
  return (
    <tr className="hover:bg-gray-50/70">
      <td className="px-4 py-3">
        <div className="font-semibold text-base leading-tight">{code}</div>
        <div className="text-xs text-gray-500">{sender}</div>
      </td>
      <td className="px-4 py-3">
        <Badge tone={urgency}>{urgency}</Badge>
      </td>
      <td className="px-4 py-3 font-semibold">{state}</td>
      <td className="px-4 py-3 text-right">
        {/* Kept as a visual affordance; added type + aria-label for a11y */}
        <button
          type="button"
          className="text-gray-400 hover:text-gray-600"
          aria-label="View details"
        >
          ›
        </button>
      </td>
    </tr>
  );
}

function FaqItem({ q, children }: { q: string; children: React.ReactNode }) {
  // Local state preserved (controls the <details> open attribute).
  const [open, setOpen] = useState(false);

  return (
    <details
      className="group"
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
    >
      {/* <summary> is natively accessible and keyboard-focusable */}
      <summary className="list-none cursor-pointer select-none px-5 py-4 flex items-center justify-between">
        <span className="font-medium">{q}</span>
        <span
          className="text-gray-400 group-open:rotate-180 transition"
          aria-hidden="true"
        >
          ⌄
        </span>
      </summary>
      <div className="px-5 pb-5 text-gray-600 text-sm">{children}</div>
    </details>
  );
}
