// app/layout.tsx
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/ui/Footer";
import GlobalScripts from "@/components/scripts/GlobalScripts"; // 👈 nuevo import
import { getSiteOrigin, shouldNoIndexProductionPreview } from "@/lib/siteUrl";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

const siteUrl = getSiteOrigin();

// Script que fuerza el modo oscuro o claro antes de hidratar React
const themeInitScript = `
(function() {
  try {
    const ls = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldDark = ls ? (ls === 'dark') : prefersDark;
    const root = document.documentElement;
    if (shouldDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  } catch (e) {}
})();
`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Arauze.com – Controlla la tua Raccomandata Online",
  description:
    "Scopri chi ti ha inviato la comunicazione e se richiede un’azione urgente.",
  openGraph: {
    siteName: "Arauze.com",
    type: "website",
    locale: "it_IT",
    url: "/",
    title: "Arauze.com – Controlla la tua Raccomandata Online",
    description:
      "Scopri chi ti ha inviato la comunicazione e se richiede un’azione urgente.",
  },
  twitter: {
    card: "summary",
    title: "Arauze.com – Controlla la tua Raccomandata Online",
    description:
      "Scopri chi ti ha inviato la comunicazione e se richiede un’azione urgente.",
  },
  robots: shouldNoIndexProductionPreview(siteUrl)
    ? { index: false, follow: false }
    : { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Script para aplicar el tema antes de la carga visual */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="bg-surface text-gray-900 dark:text-gray-600 flex flex-col min-h-dvh transition-colors duration-200">
        {/* Scripts globales: GTM, AdSense, etc. */}

        <GlobalScripts gtmId="GTM-WTWX6SPM" adsenseId="ca-pub-6280528663229175" />

        {/* Contenedor: cada página define su propio <main> para HTML válido y SEO */}
        <div className="flex-1 py-8">{children}</div>

        {/* Footer global */}
        <Footer />
      </body>
    </html>
  );
}
