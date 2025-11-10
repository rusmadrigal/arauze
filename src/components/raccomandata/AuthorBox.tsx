import React from "react";
import Image from "next/image";

export type AuthorBoxData = {
  name?: string;
  avatarUrl?: string; // puede ser absoluta o /images/...
  updatedAt?: string; // ISO datetime desde Sanity
};

function formatItalianDate(iso?: string) {
  if (!iso) return null;
  const d = new Date(iso);
  return new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

export default function AuthorBox({ data }: { data?: AuthorBoxData }) {
  if (!data) return null;

  const name = data.name || "Redazione";
  const avatar = data.avatarUrl || "/images/author.jpg";
  const prettyDate = formatItalianDate(data.updatedAt);

  return (
    <section className="flex items-center gap-3 mt-6 text-sm text-gray-500">
      <Image
        src={avatar}
        alt={name}
        width={40}
        height={40}
        className="rounded-full object-cover border border-gray-200"
      />
      <div>
        <p className="font-medium text-gray-700">{name}</p>
        {prettyDate && (
          <p className="text-gray-500">
            Aggiornato il <span className="font-medium">{prettyDate}</span>
          </p>
        )}
      </div>
    </section>
  );
}
