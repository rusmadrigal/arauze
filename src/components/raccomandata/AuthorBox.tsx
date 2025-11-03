"use client";
import React from "react";
import Image from "next/image";

export default function AuthorBox() {
  return (
    <section className="flex items-center gap-3 mt-6 text-sm text-gray-500">
      <Image
        src="/images/author.jpg"
        alt="Lorenzo Sposti"
        width={40}
        height={40}
        className="rounded-full object-cover border border-gray-200"
      />
      <div>
        <p className="font-medium text-gray-700">Lorenzo Sposti</p>
        <p className="text-gray-500">
          Aggiornato il <span className="font-medium">1 Novembre 2025</span>
        </p>
      </div>
    </section>
  );
}
