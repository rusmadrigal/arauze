import {
  buildRaccomandataJsonLd,
  type RaccomandataJsonLdInput,
} from "@/lib/seo/buildRaccomandataJsonLd";
import { getSiteOrigin } from "@/lib/siteUrl";

export type { RaccomandataJsonLdInput };

type Props = {
  input: Omit<RaccomandataJsonLdInput, "siteUrl">;
  scriptId?: string;
};

/**
 * JSON-LD nell’HTML iniziale (Server Component, tag script statico).
 * Evita next/script in client, così crawler e validatori vedono lo schema subito.
 */
export default function SEOJsonLd({ input, scriptId = "raccomandata-jsonld" }: Props) {
  const siteUrl = getSiteOrigin();
  const data = buildRaccomandataJsonLd({ ...input, siteUrl });
  return (
    <script
      id={scriptId}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html:
          process.env.NODE_ENV === "development"
            ? JSON.stringify(data, null, 2)
            : JSON.stringify(data),
      }}
    />
  );
}
