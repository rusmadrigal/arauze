import { getSiteOrigin } from "@/lib/siteUrl";

const INDEXNOW_API = "https://api.indexnow.org/IndexNow";

/** Caratteri ammessi per la chiave IndexNow: a-z, A-Z, 0-9, trattino. Lunghezza 8–128. */
const KEY_PATTERN = /^[a-zA-Z0-9-]{8,128}$/;

export function getIndexNowKey(): string | null {
  const k = process.env.INDEXNOW_KEY?.trim();
  if (!k || !KEY_PATTERN.test(k)) return null;
  return k;
}

export function getIndexNowKeyLocation(): string | null {
  const key = getIndexNowKey();
  if (!key) return null;
  return `${getSiteOrigin()}/${encodeURIComponent(key)}.txt`;
}

/**
 * IndexNow è attivo solo in produzione (dominio pubblico), salvo INDEXNOW_ALLOW_PREVIEW=true.
 */
export function isIndexNowSubmissionEnabled(): boolean {
  if (!getIndexNowKey()) return false;
  if (process.env.NODE_ENV === "development") return false;
  if (process.env.VERCEL_ENV === "preview") {
    return process.env.INDEXNOW_ALLOW_PREVIEW === "true";
  }
  return true;
}

export type IndexNowResult =
  | { ok: true; status: number }
  | { ok: false; status: number; error: string };

/**
 * Notifica Bing, Yandex e altri partecipanti tramite endpoint unificato IndexNow.
 * @see https://www.indexnow.org/documentation
 */
export async function submitUrlsToIndexNow(
  absoluteUrls: string[]
): Promise<IndexNowResult> {
  const key = getIndexNowKey();
  const keyLocation = getIndexNowKeyLocation();
  if (!key || !keyLocation) {
    return {
      ok: false,
      status: 503,
      error:
        "INDEXNOW_KEY non configurata o non valida (8–128 caratteri: a-z, A-Z, 0-9, -).",
    };
  }

  const list = absoluteUrls
    .map((u) => u.trim())
    .filter(Boolean)
    .slice(0, 10_000);

  if (list.length === 0) {
    return { ok: false, status: 400, error: "Nessun URL da inviare." };
  }

  let host: string;
  try {
    host = new URL(list[0]!).hostname.toLowerCase();
  } catch {
    return { ok: false, status: 400, error: "URL non valido." };
  }

  const originHost = new URL(getSiteOrigin()).hostname.toLowerCase();
  if (host !== originHost) {
    return {
      ok: false,
      status: 400,
      error: `Gli URL devono essere sullo stesso host configurato (${originHost}).`,
    };
  }

  const res = await fetch(INDEXNOW_API, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key,
      keyLocation,
      urlList: list,
    }),
  });

  if (res.ok || res.status === 200 || res.status === 202) {
    return { ok: true, status: res.status };
  }

  const text = await res.text().catch(() => "");
  return {
    ok: false,
    status: res.status,
    error: text || res.statusText || "IndexNow request failed",
  };
}
