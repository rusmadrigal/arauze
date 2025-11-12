// /app/api/submit-report/route.ts
import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import crypto from "crypto";

// 🧩 Variables de entorno requeridas (.env.local)
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const token = process.env.SANITY_WRITE_TOKEN!;

// ⚙️ Cliente Sanity con permisos de escritura
const writeClient = createClient({
  projectId,
  dataset,
  apiVersion: "2024-05-01",
  useCdn: false,
  token,
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

    // 🧠 Validación básica
    if (!/^\d{3,6}$/.test(code) || !mittente) {
      return NextResponse.json(
        { ok: false, error: "Dati non validi (code 3–6 cifre e mittente richiesti)." },
        { status: 400 }
      );
    }

    // 🧩 Fingerprint por combinación (code + mittente + provincia + día)
    const day = new Date().toISOString().slice(0, 10); // yyyy-mm-dd
    const fingerprint = crypto
      .createHash("sha256")
      .update(`${code}|${mittente}|${provincia}|${day}`)
      .digest("hex");

    // 🔍 Buscar si ya existe un reporte hoy
    const existing = await writeClient.fetch<{ _id: string; count?: number }[]>(
      `*[_type == "raccomandataReport" && fingerprint == $fp]{ _id, count }`,
      { fp: fingerprint }
    );

    // 🔁 Si ya existe: incrementamos el contador
    if (existing && existing.length > 0) {
      const existingId = existing[0]._id;

      const updated = await writeClient
        .patch(existingId)
        .setIfMissing({ count: 1 })
        .inc({ count: 1 })
        .commit({ autoGenerateArrayKeys: true });

      return NextResponse.json(
        {
          ok: true,
          id: updated._id,
          updated: true,
          count: updated.count ?? 1,
        },
        { status: 200 }
      );
    }

    // 🆕 Crear nuevo documento si no existe hoy
    const doc = {
      _type: "raccomandataReport",
      code: String(code), 
    
      mittenteSegnalato: mittente,
      provincia: provincia || undefined,
      dataRicezione: dataRicezione || undefined,
      status: "pending",
      fingerprint,
      count: 1, // inicia en 1
      createdAt: new Date().toISOString(),
    };

    const created = await writeClient.create(doc, { autoGenerateArrayKeys: true });

    return NextResponse.json(
      { ok: true, id: created._id, created: true },
      { status: 201 }
    );
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Errore sconosciuto";
    console.error("❌ /api/submit-report:", msg);
    const status = msg.includes("token") ? 401 : 500;
    return NextResponse.json({ ok: false, error: "Errore nel server." }, { status });
  }
}
