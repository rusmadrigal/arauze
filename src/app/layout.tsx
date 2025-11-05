// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/ui/Footer"; // ✅ Import global footer

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Arauze.com – Controlla la tua Raccomandata Online",
  description:
    "Scopri chi ti ha inviato la comunicazione e se richiede un’azione urgente.",
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
