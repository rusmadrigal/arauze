import { getSiteOrigin } from "@/lib/siteUrl";
import {
  buildCodiceTributoJsonLd,
  type CodiceTributoJsonLdInput,
} from "@/lib/seo/buildCodiceTributoJsonLd";

type Props = {
  input: Omit<CodiceTributoJsonLdInput, "siteUrl">;
  scriptId?: string;
};

export default function CodiceTributoJsonLd({ input, scriptId = "codice-tributo-jsonld" }: Props) {
  const siteUrl = getSiteOrigin();
  const data = buildCodiceTributoJsonLd({ ...input, siteUrl });

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

