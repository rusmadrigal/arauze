import { NextResponse } from "next/server";
import { getIndexNowKey } from "@/lib/indexNow";

/**
 * IndexNow: file di verifica proprietà su `https://www.arauze.com/{INDEXNOW_KEY}.txt`
 * (contenuto = solo la chiave, text/plain).
 */
export async function GET(
  _request: Request,
  context: { params: Promise<{ keyfile: string }> }
) {
  const { keyfile } = await context.params;
  const key = getIndexNowKey();

  if (!key || keyfile !== `${key}.txt`) {
    return new NextResponse("Not Found", { status: 404 });
  }

  return new NextResponse(key, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
