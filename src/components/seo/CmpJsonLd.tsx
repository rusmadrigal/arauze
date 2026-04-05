import {
  buildCmpPageJsonLd,
  type CmpPageJsonLdInput,
} from "@/lib/seo/buildCmpPageJsonLd";
import { getSiteOrigin } from "@/lib/siteUrl";

export type { CmpPageJsonLdInput };

type Props = {
  input: Omit<CmpPageJsonLdInput, "siteUrl">;
  scriptId?: string;
};

export default function CmpJsonLd({ input, scriptId = "cmp-page-jsonld" }: Props) {
  const siteUrl = getSiteOrigin();
  const data = buildCmpPageJsonLd({ ...input, siteUrl });
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
