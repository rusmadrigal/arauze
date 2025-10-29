"use client";

import Image from "next/image";
import Link from "next/link";

export default function TopNav() {
  return (
    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
      {/* Main logo with smooth animation */}
      <Link
        href="/"
        className="flex items-center gap-2 transition-transform duration-300 ease-out hover:scale-105 active:scale-95 hover:animate-pulse-slow"
      >
        <Image
          src="/images/logo.webp"
          alt="Arauze logo"
          width={250}
          height={28}
          priority
          className="select-none"
        />
      </Link>

      {/* Nav */}
      <nav className="space-x-6">
        <Link href="#" className="hover:text-gray-700">
          Privacy
        </Link>
        <Link href="#" className="hover:text-gray-700">
          Termini
        </Link>
        <Link href="#" className="hover:text-gray-700">
          Contatti
        </Link>
      </nav>
    </div>
  );
}
