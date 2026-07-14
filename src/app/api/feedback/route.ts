// /src/app/api/feedback/route.ts
import { NextResponse, type NextRequest } from "next/server";
import { sanityWriteClient } from "sanity/lib/client"; // 👈 usa el write client

// Anti-spam: rate limit in-memory (simple, V1)
const RATE_LIMIT_WINDOW_MS = 30 * 1000; // 30s
const lastRequests = new Map<string, number>();

export async function POST(req: NextRequest) {
  try {
    const now = Date.now();

    // IP del usuario para rate limiting
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    const last = lastRequests.get(ip);
    if (last && now - last < RATE_LIMIT_WINDOW_MS) {
      return NextResponse.json(
        {
          message: "Stai inviando troppi feedback. Riprova tra qualche secondo.",
        },
        { status: 429 }
      );
    }

    // Actualizar timestamp de la última petición de este IP
    lastRequests.set(ip, now);

    const body = await req.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json({ message: "Richiesta non valida." }, { status: 400 });
    }

    const { nome, citta, codice, categoria, commento, submittedAt, honeypot } = body as {
      nome?: string;
      citta?: string;
      codice?: string;
      categoria?: string;
      commento?: string;
      submittedAt?: number;
      honeypot?: string;
    };

    // Honeypot: si este campo llega con contenido, asumimos bot
    if (honeypot) {
      return NextResponse.json({ message: "Richiesta non valida." }, { status: 400 });
    }

    // Tiempo mínimo / máximo entre carga del form y envío (2s – 10min)
    if (submittedAt && typeof submittedAt === "number") {
      const diff = now - submittedAt;

      // solo consideramos sospetta una richiesta demasiado vecchia
      if (diff > 10 * 60 * 1000) {
        return NextResponse.json({ message: "Richiesta sospetta." }, { status: 400 });
      }
    }

    // Validaciones básicas (manteniendo tu lógica original)
    if (
      !nome ||
      !citta ||
      !codice ||
      !categoria ||
      !commento ||
      typeof nome !== "string" ||
      typeof citta !== "string" ||
      typeof codice !== "string" ||
      typeof categoria !== "string" ||
      typeof commento !== "string"
    ) {
      return NextResponse.json(
        { message: "Dati mancanti o non validi." },
        { status: 400 }
      );
    }

    const trimmedComment = commento.trim();

    if (trimmedComment.length < 10) {
      return NextResponse.json(
        { message: "Il commento deve contenere almeno 10 caratteri." },
        { status: 400 }
      );
    }

    // Protección extra: límite máximo razonable
    if (trimmedComment.length > 1500) {
      return NextResponse.json(
        { message: "Il commento è troppo lungo." },
        { status: 400 }
      );
    }

    const nowIso = new Date().toISOString();

    const doc = {
      _type: "raccomandataFeedback",
      nome: nome.trim(),
      citta: citta.trim(),
      codice: codice.trim(),
      categoria: categoria.trim(),
      commento: trimmedComment,
      approved: false,
      createdAt: nowIso,
      // opcional: podrías guardar ip si quisieras análisis interno (GDPR ojo)
    };

    const created = await sanityWriteClient.create(doc);

    return NextResponse.json(
      {
        message: "Feedback creato con successo.",
        feedback: created,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creando feedback:", error);
    return NextResponse.json({ message: "Errore interno del server." }, { status: 500 });
  }
}
