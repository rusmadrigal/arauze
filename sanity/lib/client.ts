// sanity/lib/client.ts
import { createClient } from "@sanity/client";

/** Mismos valores que `sanity/sanity.config.ts`; el entorno puede sobreescribirlos. */
const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "zcxgg9ay";
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = "2025-01-01"; // o la que estés usando

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

// 👇 Client con token de escritura, sin CDN
export const sanityWriteClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN, // define esto en .env.local
});
