import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { createClient } from "@sanity/client";
import {
  CODICE_TRIBUTO_SEEDS,
  RACCOMANDATA_SEEDS,
  type CodiceTributoSeed,
  type RaccomandataSeed,
} from "@/lib/seo/keywordSeeds";

type SanityClient = ReturnType<typeof createClient>;

type ExistingDoc = { _id: string; code?: string; slug?: string };

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "zcxgg9ay";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = "2025-01-01";
const token = process.env.SANITY_WRITE_TOKEN?.trim();
const outputPath = resolve(process.cwd(), "data/sanity-seed.ndjson");

function textBlock(text: string, key: string) {
  return [
    {
      _type: "block",
      _key: `${key}-block`,
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: `${key}-span`, text, marks: [] }],
    },
  ];
}

function buildRaccomandataDoc(seed: RaccomandataSeed, existingId?: string) {
  const codeKey = seed.code.trim().toLowerCase();
  return {
    _id: existingId ?? `seed-raccomandata-${codeKey}`,
    _type: "raccomandataPage",
    code: seed.code,
    metaTitle: seed.metaTitle,
    metaDescription: seed.metaDescription,
    heroTitleSuffix: seed.heroTitleSuffix,
    heroSubtitle: seed.heroSubtitle,
    mittente: seed.mittente,
    tipologia: seed.tipologia,
    stato: seed.stato,
    priority: seed.priority,
    steps: seed.steps.map((step, index) => ({
      _key: `${codeKey}-step-${index}`,
      title: step.title,
      description: textBlock(step.description, `${codeKey}-step-${index}`),
    })),
    details: seed.details.map((detail, index) => ({
      _key: `${codeKey}-detail-${index}`,
      title: detail.title,
      body: textBlock(detail.body, `${codeKey}-detail-${index}`),
    })),
    alertBox: {
      enabled: true,
      title: "Attenzione ai Termini di Ritiro",
      body: textBlock(
        "Controlla subito l'avviso, i giorni disponibili e l'ufficio di ritiro. Per comunicazioni fiscali, bancarie o amministrative conviene non aspettare.",
        `${codeKey}-alert`
      ),
      icon: "AlertTriangle",
    },
    assistenza: {
      title: "Assistenza e Contatti Utili",
      cards: [
        {
          _key: `${codeKey}-assist-1`,
          icon: "MapPin",
          title: "Verifica l'ufficio postale",
          description: textBlock(
            "Controlla indirizzo, giorni e tempi di giacenza riportati sull'avviso.",
            `${codeKey}-assist-1`
          ),
        },
        {
          _key: `${codeKey}-assist-2`,
          icon: "FileText",
          title: "Confronta il mittente",
          description: textBlock(
            "Se il mittente è un ente, una banca o un fornitore, usa anche i canali ufficiali per confermare il contesto.",
            `${codeKey}-assist-2`
          ),
        },
        {
          _key: `${codeKey}-assist-3`,
          icon: "Clock",
          title: "Agisci prima della scadenza",
          description: textBlock(
            "Le notifiche certificate hanno spesso termini precisi: conviene muoversi subito.",
            `${codeKey}-assist-3`
          ),
        },
      ],
    },
    faq: {
      title: `Domande frequenti sul codice ${seed.code}`,
      items: seed.faq.items.map((item, index) => ({
        _key: `${codeKey}-faq-${index}`,
        q: item.q,
        a: textBlock(item.a, `${codeKey}-faq-${index}`),
      })),
    },
    authorBox: {
      name: seed.authorBox.name,
      avatarUrl: seed.authorBox.avatarUrl,
      updatedAt: seed.authorBox.updatedAt,
    },
    _createdAt: seed._createdAt,
    _updatedAt: seed._updatedAt,
  };
}

function buildCodiceTributoDoc(seed: CodiceTributoSeed, existingId?: string) {
  const slugKey = seed.slug.trim().toLowerCase();
  return {
    _id: existingId ?? `seed-codice-tributo-${slugKey}`,
    _type: "codiceTributoPage",
    slug: seed.slug,
    kind: seed.kind,
    code: seed.code,
    title: seed.title,
    metaTitle: seed.metaTitle,
    metaDescription: seed.metaDescription,
    heroSubtitle: seed.heroSubtitle,
    sections: seed.sections.map((section, index) => ({
      _key: `${slugKey}-section-${index}`,
      title: section.title,
      body: section.paragraphs,
    })),
    highlights: seed.highlights,
    faq: seed.faq.map((item, index) => ({
      _key: `${slugKey}-faq-${index}`,
      q: item.q,
      a: item.a,
    })),
    updatedAt: seed.updatedAt,
  };
}

function toNdjsonLine(doc: Record<string, unknown>) {
  return JSON.stringify(doc);
}

function writeNdjson(docs: Record<string, unknown>[]) {
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${docs.map(toNdjsonLine).join("\n")}\n`, "utf8");
}

function getSanityClient(): SanityClient {
  if (!token) {
    throw new Error("Missing SANITY_WRITE_TOKEN");
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
  });
}

async function getExistingMap(client: SanityClient) {
  const [raccomandataDocs, codiceTributoDocs] = await Promise.all([
    client.fetch<ExistingDoc[]>(
      `*[_type == "raccomandataPage" && defined(code) && !(_id in path("drafts.**"))]{_id, code}`,
      {}
    ),
    client.fetch<ExistingDoc[]>(
      `*[_type == "codiceTributoPage" && defined(slug) && !(_id in path("drafts.**"))]{_id, slug}`,
      {}
    ),
  ]);

  return {
    raccomandata: new Map(
      (raccomandataDocs ?? [])
        .filter((doc) => doc.code)
        .map((doc) => [String(doc.code).trim().toLowerCase(), doc._id])
    ),
    codiceTributo: new Map(
      (codiceTributoDocs ?? [])
        .filter((doc) => doc.slug)
        .map((doc) => [String(doc.slug).trim().toLowerCase(), doc._id])
    ),
  };
}

async function main() {
  const docs: Record<string, unknown>[] = [];

  for (const seed of RACCOMANDATA_SEEDS) {
    docs.push(buildRaccomandataDoc(seed));
  }

  for (const seed of CODICE_TRIBUTO_SEEDS) {
    docs.push(buildCodiceTributoDoc(seed));
  }

  writeNdjson(docs);
  console.log(`Wrote ${docs.length} seed docs to ${outputPath}`);

  if (!token) {
    console.log("SANITY_WRITE_TOKEN is missing, skipping Sanity import.");
    return;
  }

  const client = getSanityClient();
  const existing = await getExistingMap(client);

  const importDocs = [
    ...RACCOMANDATA_SEEDS.map((seed) => buildRaccomandataDoc(seed, existing.raccomandata.get(seed.code.trim().toLowerCase()))),
    ...CODICE_TRIBUTO_SEEDS.map((seed) =>
      buildCodiceTributoDoc(seed, existing.codiceTributo.get(seed.slug.trim().toLowerCase()))
    ),
  ];

  for (const doc of importDocs) {
    await client.createOrReplace(doc as Parameters<SanityClient["createOrReplace"]>[0]);
  }

  console.log(`Imported ${importDocs.length} docs into Sanity dataset "${dataset}".`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

