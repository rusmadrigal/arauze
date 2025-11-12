// components/ui/Footer.tsx
"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Facebook, Instagram, Github } from "lucide-react";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="mt-16 border-t border-slate-200 bg-gradient-to-r from-[#2F66D5]/5 to-[#3A78E0]/5">
            <div className="max-w-6xl mx-auto px-6 md:px-10 py-10">
                {/* Top section - links and brand */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    {/* Brand / Description */}
                    <div>
                        <Link href="/" className="inline-block hover:opacity-90 transition">
                            <Image
                                src="/images/logo-footer.png"
                                alt="Arauze.com"
                                width={160}
                                height={40}
                                className="h-auto w-auto"
                                priority
                            />
                        </Link>
                        <p className="mt-3 text-sm text-slate-600 max-w-xs leading-relaxed">
                            Controlla online il significato dei codici raccomandata e scopri
                            chi è il mittente della tua comunicazione ufficiale.
                        </p>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900 mb-3">
                            Navigazione
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="/"
                                    className="text-slate-600 hover:text-[#2552AD] transition"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/chi-siamo"
                                    className="text-slate-600 hover:text-[#2552AD] transition"
                                >
                                    Chi Siamo
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacy"
                                    className="text-slate-600 hover:text-[#2552AD] transition"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contatti"
                                    className="text-slate-600 hover:text-[#2552AD] transition"
                                >
                                    Contatti
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact & social */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900 mb-3">
                            Contatti
                        </h3>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-[#2552AD]" />
                                <a href="mailto:info@arauze.com" className="hover:underline">
                                    info@arauze.com
                                </a>
                            </li>
                        </ul>

                        {/* Social links */}
                        <div className="mt-4 flex items-center gap-4">
                            <a
                                href="#"
                                aria-label="Facebook"
                                className="text-slate-500 hover:text-[#2552AD] transition"
                            >
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                aria-label="Instagram"
                                className="text-slate-500 hover:text-[#2552AD] transition"
                            >
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a
                                href="https://github.com/rusmadrigal/arauze"
                                aria-label="GitHub"
                                className="text-slate-500 hover:text-[#2552AD] transition"
                            >
                                <Github className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-200 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
                    <p className="text-sm text-slate-500">
                        © {year} Arauze.com — Tutti i diritti riservati.
                    </p>
                    <p className="text-xs text-slate-400">
                        Progetto sviluppato da Rus Madrigal
                    </p>
                </div>
            </div>
        </footer>
    );
}
