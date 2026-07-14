import type { MetadataRoute } from "next";
import {
  getSiteOrigin,
  normalizeArauzeOrigin,
  shouldNoIndexProductionPreview,
} from "@/lib/siteUrl";

/** `/robots.txt`: preview chiuso; produzione indicizza tutto tranne `/api/`. `/llm.txt` e `/llms.txt` sono consentiti (non serve Allow esplicito). */
export default function robots(): MetadataRoute.Robots {
  const base = getSiteOrigin();

  if (shouldNoIndexProductionPreview(base)) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: { userAgent: "*", disallow: ["/api/"] },
    sitemap: `${normalizeArauzeOrigin(base)}/sitemap.xml`,
  };
}
