// /src/app/api/feedback/route.ts
import { NextResponse } from "next/server";
import { sanityWriteClient } from "sanity/lib/client"; // 👈 usa el write client

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { nome, citta, codice, categoria, commento } = body || {};

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

        if (commento.trim().length < 10) {
            return NextResponse.json(
                { message: "Il commento deve contenere almeno 10 caratteri." },
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
            commento: commento.trim(),
            approved: false,
            createdAt: nowIso,
        };

        const created = await sanityWriteClient.create(doc); // 👈 aquí

        return NextResponse.json(
            {
                message: "Feedback creato con successo.",
                feedback: created,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creando feedback:", error);
        return NextResponse.json(
            { message: "Errore interno del server." },
            { status: 500 }
        );
    }
}
