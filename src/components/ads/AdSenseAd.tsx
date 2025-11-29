"use client";

import React, { useEffect } from "react";

interface AdSenseAdProps {
  adSlot: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
  /** Texto a mostrar cuando no se cargan ads (dev / local / preview) */
  placeholderText?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * ✅ Solo mostramos anuncios cuando:
 * - VERCEL_ENV === "production"
 * - Y el dominio configurado es el real (ej: https://arauze.com)
 *
 * En cualquier otro caso → placeholder.
 */
const IS_REAL_PROD =
  process.env.VERCEL_ENV === "production" &&
  (process.env.NEXT_PUBLIC_SITE_URL?.includes("arauze.com") ?? false);

export default function AdSenseAd({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  className,
  style,
  placeholderText = "Spazio pubblicitario (anteprima – nessun annuncio in questa modalità)",
}: AdSenseAdProps) {
  useEffect(() => {
    // En entornos que no son producción real, no inicializamos AdSense
    if (!IS_REAL_PROD) return;

    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch {
      // Silenciado a propósito
    }
  }, []);

  // ❌ No prod real → placeholder
  if (!IS_REAL_PROD) {
    return (
      <div
        className={className}
        style={{
          padding: "12px 16px",
          borderRadius: "8px",
          border: "1px dashed rgba(148, 163, 184, 0.6)",
          fontSize: "0.75rem",
          textAlign: "center",
          opacity: 0.8,
          ...style,
        }}
      >
        {placeholderText}
      </div>
    );
  }

  // ✅ Prod real → bloque de AdSense
  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", ...style }}
        data-ad-client="ca-pub-6280528663229175"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
      />
    </div>
  );
}
