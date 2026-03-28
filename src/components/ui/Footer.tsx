// components/ui/Footer.tsx
"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";

/** Lucide v1+ no incluye iconos de marca; SVGs mínimos con currentColor. */
function IconFacebook(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
    );
}

function IconInstagram(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
    );
}

function IconGithub(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
    );
}

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
                                sizes="160px"
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
                                    href="/termini"
                                    className="text-slate-600 hover:text-[#2552AD] transition"
                                >
                                    Termini
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
                                <IconFacebook className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                aria-label="Instagram"
                                className="text-slate-500 hover:text-[#2552AD] transition"
                            >
                                <IconInstagram className="h-5 w-5" />
                            </a>
                            <a
                                href="https://github.com/rusmadrigal/arauze"
                                aria-label="GitHub"
                                className="text-slate-500 hover:text-[#2552AD] transition"
                            >
                                <IconGithub className="h-5 w-5" />
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
