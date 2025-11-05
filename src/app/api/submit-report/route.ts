import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import crypto from "crypto";

// ⚠️ Requiere SANITY_WRITE_TOKEN en .env.local (rol Editor)
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const token = process.env.SANITY_WRITE_TOKEN!;

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion: "2024-05-01",
  useCdn: false,
  token, // <- habilita escritura
});

type Body = {
  code?: string;
  mittenteSegnalato?: string;
  provincia?: string;
  dataRicezione?: string | null;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    const code = (body.code || "").trim();
    const mittente = (body.mittenteSegnalato || "").trim();
    const provincia = (body.provincia || "").trim();
    const dataRicezione = body.dataRicezione || null;

    // Validación básica
    if (!/^\d{3,6}$/.test(code) || !mittente) {
      return NextResponse.json(
        { ok: false, error: "Dati non validi (code 3–6 cifre e mittente richiesti)." },
        { status: 400 }
      );
    }

    // Fingerprint para dedupe (por día)
    const day = new Date().toISOString().slice(0, 10); // yyyy-mm-dd
    const fingerprint = crypto
      .createHash("sha256")
      .update(`${code}|${mittente}|${provincia}|${day}`)
      .digest("hex");

    // ¿Ya existe hoy?
    const exists = await writeClient.fetch<string[]>(
      `*[_type == "raccomandataReport" && fingerprint == $fp][]._id`,
      { fp: fingerprint }
    );
    if (exists && exists.length > 0) {
      return NextResponse.json({ ok: true, id: exists[0], deduped: true });
    }

    // Crear documento
    const doc = {
      _type: "raccomandataReport",
      code,
      mittenteSegnalato: mittente,
      provincia: provincia || undefined,
      dataRicezione: dataRicezione || undefined,
      status: "pending",
      fingerprint,
      createdAt: new Date().toISOString(),
    };

    const created = await writeClient.create(doc, { autoGenerateArrayKeys: true });

    return NextResponse.json({ ok: true, id: created._id }, { status: 201 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Errore sconosciuto";
    console.error("❌ /api/submit-report:", msg);
    const status = msg.includes("token") ? 401 : 500;
    return NextResponse.json({ ok: false, error: "Errore nel server." }, { status });
  }
}
