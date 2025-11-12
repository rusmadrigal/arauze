"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

// Cargar DarkModeToggle solo en cliente
const DarkModeToggle = dynamic(() => import("@/components/ui/DarkModeToggle"), {
  ssr: false,
});

export default function TopNav() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Market", href: "/raccomandata-market" },
    { label: "Termini", href: "/termini" },
    { label: "Contatti", href: "/contatti" },
  ];

  return (
    <header className="flex items-center justify-between text-sm text-gray-500 mb-4 relative z-50">
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2 transition-transform duration-300 ease-out hover:scale-105 active:scale-95"
      >
        <Image
          src="/images/logo.webp"
          alt="Arauze logo"
          width={180}
          height={26}
          priority
          className="select-none"
        />
      </Link>

      {/* Desktop menu */}
      <nav className="hidden md:flex items-center space-x-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="relative px-3 py-1 rounded-lg transition-all duration-300 ease-in-out hover:text-gray-800 hover:shadow-[0_3px_8px_rgba(0,0,0,0.08)] hover:scale-[1.05] active:scale-[0.97] bg-white/0 hover:bg-white/70"
          >
            {item.label}
          </Link>
        ))}

        {/* Toggle en desktop */}
        <DarkModeToggle />
      </nav>

      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition duration-300"
        aria-label="Toggle menu"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile overlay menu */}
      {open && (
        <div className="fixed inset-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl flex flex-col items-center justify-center space-y-6 text-lg font-medium text-gray-800 dark:text-gray-100 animate-fadeIn">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="transition-all duration-300 ease-in-out hover:scale-110 hover:text-blue-600"
            >
              {item.label}
            </Link>
          ))}

          {/* Toggle en mobile */}
          <DarkModeToggle />

          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 p-2"
            aria-label="Close menu"
          >
            <X size={26} />
          </button>
        </div>
      )}
    </header>
  );
}