import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Arauze.com – Controlla la tua Raccomandata Online",
  description:
    "Scopri chi ti ha inviato la comunicazione e se richiede un’azione urgente.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={inter.variable} suppressHydrationWarning>
      <body className="bg-surface text-gray-900">
        <div className="min-h-dvh py-8">{children}</div>
      </body>
    </html>
  );
}