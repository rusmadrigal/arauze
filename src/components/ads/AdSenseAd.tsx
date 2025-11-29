"use client";

import React, { useEffect, useState } from "react";

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

export default function AdSenseAd({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  className,
  style,
  placeholderText = "Spazio pubblicitario (anteprima – nessun annuncio in questa modalità)",
}: AdSenseAdProps) {
  // 🔹 Leemos una sola vez si podemos mostrar ads (solo cliente)
  const [canShowAds] = useState(() => {
    if (typeof window === "undefined") return false;

    const isProd = process.env.NODE_ENV === "production";
    const isProdDomain =
      window.location.hostname === "arauze.com" ||
      window.location.hostname === "www.arauze.com";

    return isProd && isProdDomain;
  });

  useEffect(() => {
    if (!canShowAds) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // silencioso
    }
  }, [canShowAds, adSlot]);

  // ❌ No dominio real / no prod → placeholder
  if (!canShowAds) {
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

  // ✅ Dominio real + prod → bloque AdSense
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
