import { NextResponse } from "next/server";
import { isIndexNowSubmissionEnabled, submitUrlsToIndexNow } from "@/lib/indexNow";

const MAX_URLS = 100;

type Body = {
  urls?: unknown;
};

/**
 * POST { "urls": ["https://www.arauze.com/..."] }
 * Header: Authorization: Bearer INDEXNOW_PUBLISH_SECRET
 *
 * Usalo da webhook Sanity, cron Vercel o script interno. In preview è disabilitato
 * salvo INDEXNOW_ALLOW_PREVIEW=true.
 */
export async function POST(req: Request) {
  const secret = process.env.INDEXNOW_PUBLISH_SECRET?.trim();
  if (!secret) {
    return NextResponse.json(
      {
        error:
          "INDEXNOW_PUBLISH_SECRET non impostato. Aggiungila in Vercel per abilitare questo endpoint.",
      },
      { status: 503 }
    );
  }

  const auth = req.headers.get("authorization")?.trim();
  const token = auth?.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  if (token !== secret) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  if (!isIndexNowSubmissionEnabled()) {
    return NextResponse.json(
      {
        error:
          "Invio IndexNow non attivo (solo produzione, o imposta INDEXNOW_ALLOW_PREVIEW=true in preview).",
      },
      { status: 503 }
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "JSON non valido" }, { status: 400 });
  }

  const raw = body.urls;
  if (!Array.isArray(raw)) {
    return NextResponse.json(
      { error: 'Corpo richiesto: { "urls": string[] }' },
      { status: 400 }
    );
  }

  const urls = raw.filter((u): u is string => typeof u === "string").slice(0, MAX_URLS);

  const result = await submitUrlsToIndexNow(urls);

  if (!result.ok) {
    return NextResponse.json(
      { error: result.error, status: result.status },
      { status: result.status >= 400 && result.status < 600 ? result.status : 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    submitted: urls.length,
    indexNowStatus: result.status,
  });
}
