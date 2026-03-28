import Link from "next/link";
import type { ReactNode } from "react";

const defaultClass = "text-blue-600 underline underline-offset-2 hover:text-blue-700";

function internalPath(href: string): string | null {
  if (!href || href === "#") return null;
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return null;
  if (href.startsWith("/") && !href.startsWith("//")) return href;
  try {
    const u = new URL(href);
    if (u.hostname === "www.arauze.com" || u.hostname === "arauze.com") {
      return `${u.pathname}${u.search}${u.hash}`;
    }
  } catch {
    return null;
  }
  return null;
}

/**
 * Enlace Portable Text: Next.js Link para rutas internas, &lt;a&gt; para externos.
 */
export default function PortableTextMarkLink({
  href,
  children,
  className = defaultClass,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  if (href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  const path = internalPath(href);
  if (path) {
    return (
      <Link href={path} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}
