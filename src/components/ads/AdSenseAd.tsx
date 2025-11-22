"use client";

import React, { useEffect } from "react";

interface AdSenseAdProps {
    adSlot: string;
    adFormat?: string;
    fullWidthResponsive?: boolean;
    className?: string;
    style?: React.CSSProperties;
    /** Texto a mostrar cuando no se cargan ads (dev / local) */
    placeholderText?: string;
}

declare global {
    interface Window {
        adsbygoogle?: unknown[];
    }
}

// true en local / preview, false solo en prod
const IS_DEV = process.env.VERCEL_ENV !== "production";

export default function AdSenseAd({
    adSlot,
    adFormat = "auto",
    fullWidthResponsive = true,
    className,
    style,
    placeholderText = "Spazio pubblicitario (anteprima – nessun annuncio in questa modalità)",
}: AdSenseAdProps) {
    useEffect(() => {
        // En desarrollo no intentamos inicializar AdSense
        if (IS_DEV) return;

        try {
            if (typeof window !== "undefined") {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch {
            // Silenciado a propósito para evitar errores en consola / eslint
        }
    }, []);

    return (
        <div className={className}>
            {IS_DEV ? (
                // ✅ Fallback visible en local / entornos no productivos
                <div
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
            ) : (
                // AdSense
                <ins
                    className="adsbygoogle"
                    style={{ display: "block", ...style }}
                    data-ad-client="ca-pub-6280528663229175"
                    data-ad-slot={adSlot}
                    data-ad-format={adFormat}
                    data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
                />
            )}
        </div>
    );
}
