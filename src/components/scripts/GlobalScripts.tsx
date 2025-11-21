"use client";

import Script from "next/script";

interface GlobalScriptsProps {
    gaId?: string;
    gtmId?: string;
    adsenseId?: string;
}

export default function GlobalScripts({

    gtmId,
    adsenseId,
}: GlobalScriptsProps) {
    return (
        <>
            {/* Google Tag Manager */}
            {gtmId && (
                <Script
                    id="gtm-script"
                    strategy="afterInteractive"
                >{`
          (function(w,d,s,l,i){
            w[l]=w[l]||[];
            w[l].push({ 'gtm.start': new Date().getTime(), event:'gtm.js' });
            var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        `}</Script>
            )}

            {/* Google AdSense */}
            {adsenseId && (
                <Script
                    id="adsense-script"
                    async
                    strategy="afterInteractive"
                    crossOrigin="anonymous"
                    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
                />
            )}
        </>
    );
}
