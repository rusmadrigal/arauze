import { createClient } from "next-sanity";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-05-01",
  useCdn: true, // true para lecturas públicas
  token: process.env.SANITY_WRITE_TOKEN, // solo en rutas server para escribir
});
