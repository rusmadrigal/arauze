"use client";

import { useEffect, useState } from "react";
import UltimeRaccomandateAnalizzate from "./UltimeAnalizzate";

type Urgency = "ALTA" | "BASSA" | "RITIRATA";

type Item = {
    code: string;
    sender: string;
    urgency: Urgency;
    state: string;     // "Dettaglio →"
    href: string;      // /raccomandata/[code]
};

export default function UltimeAnalizzateDynamic() {
    const [items, setItems] = useState<Item[] | null>(null);
    const [err, setErr] = useState<string | null>(null);

    useEffect(() => {
        let alive = true;
        fetch("/api/ultime-analizzate", { cache: "no-store" })
            .then((r) => (r.ok ? r.json() : Promise.reject(r.statusText)))
            .then((data: Item[]) => {
                if (!alive) return;
                setItems(data);
            })
            .catch((e) => {
                if (!alive) return;
                setErr(typeof e === "string" ? e : "Errore nel caricamento");
            });
        return () => {
            alive = false;
        };
    }, []);

    // Puedes renderizar skeletons si quieres:
    if (!items && !err) {
        return (
            <UltimeRaccomandateAnalizzate
                items={[
                    { code: "—", sender: "—", urgency: "BASSA", state: "Caricamento…", href: "#" },
                    { code: "—", sender: "—", urgency: "BASSA", state: "Caricamento…", href: "#" },
                    { code: "—", sender: "—", urgency: "BASSA", state: "Caricamento…", href: "#" },
                ]}
            />
        );
    }

    if (err) {
        return (
            <UltimeRaccomandateAnalizzate
                items={[
                    { code: "—", sender: "Errore", urgency: "BASSA", state: "Riprova", href: "#" },
                ]}
            />
        );
    }

    return <UltimeRaccomandateAnalizzate items={items ?? []} />;
}
