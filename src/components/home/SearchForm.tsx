"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState, useTransition } from "react";
import { ChevronRight, Hash, Loader2 } from "lucide-react";

/** Attesa prima della richiesta: meno chiamate mentre si digita. */
const DEBOUNCE_MS = 300;

type SuggestItem = {
  code: string;
  mittente?: string | null;
  heroTitleSuffix?: string | null;
  tipologia?: string | null;
};

export default function SearchForm() {
  const router = useRouter();
  const listId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestAbortRef = useRef<AbortController | null>(null);

  const [q, setQ] = useState("");
  const [results, setResults] = useState<SuggestItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [pending, startTransition] = useTransition();

  const trimmed = q.trim();

  /** Un solo carattere non numerico: niente fetch; chiediamo almeno 2 caratteri per il testo. */
  const singleNonDigitChar = trimmed.length === 1 && !/^\d$/.test(trimmed);

  const showMinTextHint = focused && !loading && singleNonDigitChar;

  /** Codice solo cifre, nessun risultato (anche 1–2 cifre). */
  const showDigitNoMatch =
    focused &&
    !loading &&
    results.length === 0 &&
    /^\d+$/.test(trimmed) &&
    trimmed.length >= 1 &&
    !singleNonDigitChar;

  /** Testo (o misto) con almeno 2 caratteri, nessun risultato. */
  const showTextNoMatch =
    focused &&
    !loading &&
    results.length === 0 &&
    trimmed.length >= 2 &&
    !/^\d+$/.test(trimmed);

  const showPanel =
    focused &&
    trimmed.length > 0 &&
    (loading ||
      results.length > 0 ||
      showMinTextHint ||
      showDigitNoMatch ||
      showTextNoMatch);

  useEffect(() => {
    if (!trimmed) {
      setResults([]);
      setLoading(false);
      setActiveIdx(-1);
      return;
    }

    if (singleNonDigitChar) {
      setResults([]);
      setLoading(false);
      setActiveIdx(-1);
      return;
    }

    setActiveIdx(-1);

    const t = window.setTimeout(() => {
      suggestAbortRef.current?.abort();
      const ac = new AbortController();
      suggestAbortRef.current = ac;
      setLoading(true);

      void (async () => {
        try {
          const res = await fetch(
            `/api/search-suggest?q=${encodeURIComponent(trimmed)}`,
            { signal: ac.signal, cache: "no-store" }
          );
          if (ac.signal.aborted) return;
          const data = (await res.json()) as {
            ok?: boolean;
            results?: SuggestItem[];
          };
          if (ac.signal.aborted) return;
          if (data?.ok && Array.isArray(data.results)) {
            setResults(data.results);
          } else {
            setResults([]);
          }
        } catch (e) {
          if (e instanceof Error && e.name === "AbortError") return;
          setResults([]);
        } finally {
          if (!ac.signal.aborted) setLoading(false);
        }
      })();
    }, DEBOUNCE_MS);

    return () => {
      window.clearTimeout(t);
      suggestAbortRef.current?.abort();
      suggestAbortRef.current = null;
      setLoading(false);
    };
  }, [trimmed, singleNonDigitChar]);

  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setFocused(false);
        setActiveIdx(-1);
      }
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  const goToCode = useCallback(
    (code: string) => {
      setFocused(false);
      setActiveIdx(-1);
      router.push(`/raccomandata/${encodeURIComponent(code)}`);
    },
    [router]
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = trimmed;
    if (!v) return;

    if (activeIdx >= 0 && activeIdx < results.length) {
      goToCode(results[activeIdx]!.code);
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(v)}`, {
          cache: "no-store",
        });
        const data = await res.json();

        if (!data?.ok) {
          if (/^\d{3,6}$/.test(v)) return router.push(`/raccomandata/${v}`);
          return router.push(`/ricerca?q=${encodeURIComponent(v)}`);
        }

        if (data.action === "redirect" && data.href) {
          return router.push(data.href);
        }

        if (data.action === "multiple") {
          return router.push(`/ricerca?q=${encodeURIComponent(v)}`);
        }

        return router.push(`/ricerca?q=${encodeURIComponent(v)}`);
      } catch {
        if (/^\d{3,6}$/.test(v)) return router.push(`/raccomandata/${v}`);
        return router.push(`/ricerca?q=${encodeURIComponent(v)}`);
      }
    });
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!showPanel) return;

    if (e.key === "Escape") {
      e.preventDefault();
      setFocused(false);
      setActiveIdx(-1);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (results.length === 0) return;
      setActiveIdx((i) => (i + 1) % results.length);
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (results.length === 0) return;
      setActiveIdx((i) => (i <= 0 ? results.length - 1 : i - 1));
      return;
    }

    if (e.key === "Enter" && activeIdx >= 0 && activeIdx < results.length) {
      e.preventDefault();
      goToCode(results[activeIdx]!.code);
    }
  }

  return (
    <div ref={containerRef} className="relative mt-3">
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          id="home-search-codice"
          aria-label="Codice o testo da cercare"
          aria-autocomplete="list"
          aria-expanded={showPanel}
          aria-controls={showPanel && results.length > 0 ? listId : undefined}
          aria-activedescendant={
            activeIdx >= 0 && results.length > 0
              ? `${listId}-opt-${activeIdx}`
              : undefined
          }
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          placeholder="Inserisci il codice o testo…"
          className="
          w-full h-12 md:h-14
          rounded-2xl border border-slate-200 bg-white
          px-4 pr-28
          text-slate-700 placeholder-slate-400
          outline-none shadow-sm
          transition-all duration-500 ease-in-out
          focus:scale-[1.025] focus:shadow-[0_0_0_5px_rgba(63,123,250,0.12)]
          focus:border-brand-300 focus:ring-0
        "
        />
        <button
          type="submit"
          disabled={pending}
          className="
          absolute right-2 top-1/2 -translate-y-1/2
          h-10 md:h-12 px-5 md:px-6
          rounded-xl
          bg-linear-to-r from-[#2F66D5] to-[#2552AD]
          text-white font-semibold
          shadow-card
          transition-all duration-300 ease-in-out
          hover:scale-[1.05] active:scale-[0.95]
          focus:outline-none focus:ring-4 focus:ring-blue-200
          disabled:opacity-60 disabled:cursor-not-allowed
        "
        >
          {pending ? "Cercando…" : "Cerca"}
        </button>
      </form>

      {showPanel ? (
        <div
          id={listId}
          role={results.length > 0 ? "listbox" : "region"}
          aria-label="Suggerimenti per codice o testo"
          className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-40 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_12px_40px_-12px_rgba(15,23,42,0.25)] ring-1 ring-slate-900/5"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-6 text-sm text-slate-500">
              <Loader2 className="h-4 w-4 shrink-0 animate-spin text-[#2552AD]" />
              Ricerca in corso…
            </div>
          ) : results.length > 0 ? (
            <ul className="max-h-[min(20rem,50vh)] divide-y divide-slate-100 overflow-y-auto py-1">
              {results.map((item, idx) => {
                const active = idx === activeIdx;
                const subtitle =
                  item.mittente?.trim() ||
                  item.tipologia?.trim() ||
                  item.heroTitleSuffix?.trim();
                return (
                  <li key={item.code} role="presentation">
                    <button
                      type="button"
                      id={`${listId}-opt-${idx}`}
                      role="option"
                      aria-selected={active}
                      className={[
                        "flex w-full items-start gap-3 px-4 py-3 text-left transition-colors",
                        active
                          ? "bg-[#2552AD]/8"
                          : "hover:bg-slate-50 active:bg-slate-100",
                      ].join(" ")}
                      onMouseEnter={() => setActiveIdx(idx)}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => goToCode(item.code)}
                    >
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                        <Hash className="h-4 w-4" strokeWidth={2} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold text-slate-900">
                          Codice {item.code}
                        </span>
                        {subtitle ? (
                          <span className="mt-0.5 line-clamp-2 text-sm text-slate-600">
                            {subtitle}
                          </span>
                        ) : null}
                      </span>
                      <ChevronRight
                        className={[
                          "mt-1 h-4 w-4 shrink-0",
                          active ? "text-[#2552AD]" : "text-slate-300",
                        ].join(" ")}
                        aria-hidden
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : showMinTextHint ? (
            <div className="px-4 py-4 text-sm text-slate-600">
              <p className="font-medium text-slate-800">Continua a digitare</p>
              <p className="mt-1">
                Per cercare per{" "}
                <strong className="font-semibold text-slate-700">mittente o testo</strong>{" "}
                servono almeno{" "}
                <strong className="font-semibold text-slate-700">2 caratteri</strong>. Per
                il{" "}
                <strong className="font-semibold text-slate-700">codice numerico</strong>{" "}
                puoi usare anche una sola cifra.
              </p>
            </div>
          ) : showDigitNoMatch || showTextNoMatch ? (
            <div className="px-4 py-4 text-sm text-slate-600">
              <p className="font-medium text-slate-800">
                Nessun risultato per &ldquo;{trimmed}&rdquo;
              </p>
              <p className="mt-1 text-slate-600">
                Apri la pagina di ricerca per vedere tutte le corrispondenze o affinare la
                query.
              </p>
              <Link
                href={`/ricerca?q=${encodeURIComponent(trimmed)}`}
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#2552AD] hover:underline"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setFocused(false)}
              >
                Vai alla ricerca
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
