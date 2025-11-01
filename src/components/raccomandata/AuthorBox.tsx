"use client";
import React from "react";
import Image from "next/image";

export default function AuthorBox() {
  return (
    <section className="flex items-center gap-3 mt-6 text-sm text-gray-500">
      <Image
        src="/images/author-marco.jpg"
        alt="Marco Bruschi"
        width={40}
        height={40}
        className="rounded-full object-cover border border-gray-200"
      />
      <div>
        <p className="font-medium text-gray-700">Marco Bruschi</p>
        <p className="text-gray-500">
          Aggiornato il <span className="font-medium">1 Novembre 2025</span>
        </p>
      </div>
    </section>
  );
}
