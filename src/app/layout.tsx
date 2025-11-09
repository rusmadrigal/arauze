// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/ui/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Dominio base (prod) con fallback a localhost en dev
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  (process.env.NODE_ENV === "production" ? "https://arauze.com" : "http://localhost:3000");

export const metadata: Metadata = {
  // Base para construir canónicos absolutos desde rutas relativas
  metadataBase: new URL(siteUrl),

  title: "Arauze.com – Controlla la tua Raccomandata Online",
  description:
    "Scopri chi ti ha inviato la comunicazione e se richiede un’azione urgente.",

  // (Opcional) Defaults útiles para redes
  openGraph: {
    siteName: "Arauze.com",
    type: "website",
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
  // (Opcional) Robots por defecto
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={inter.variable} suppressHydrationWarning>
      <body className="bg-surface text-gray-900 flex flex-col min-h-dvh">
        {/* Main content wrapper */}
        <main className="flex-1 py-8">{children}</main>

        {/* Global footer displayed on all pages */}
        <Footer />
      </body>
    </html>
  );
}
