import type { MetadataRoute } from "next";
import { getSiteOrigin, shouldNoIndexProductionPreview } from "@/lib/siteUrl";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteOrigin();
  if (shouldNoIndexProductionPreview(base)) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
