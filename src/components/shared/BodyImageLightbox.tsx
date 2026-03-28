"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useCallback, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  src: string;
  alt: string;
  caption?: string | null;
  sizes?: string;
  width?: number;
  height?: number;
};

export default function BodyImageLightbox({
  src,
  alt,
  caption,
  sizes = "(max-width: 768px) 100vw, 700px",
  width = 800,
  height = 500,
}: Props) {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  const modal =
    open &&
    typeof document !== "undefined" &&
    createPortal(
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/88 p-4 backdrop-blur-sm"
        onClick={close}
      >
        <p id={titleId} className="sr-only">
          {alt ? `Immagine ingrandita: ${alt}` : "Immagine ingrandita"}
        </p>
        <button
          type="button"
          onClick={close}
          className="absolute right-3 top-3 z-[210] rounded-full bg-white/15 p-2.5 text-white ring-1 ring-white/35 transition hover:bg-white/25"
          aria-label="Chiudi"
        >
          <X className="h-5 w-5" strokeWidth={2} aria-hidden />
        </button>
        <div
          className="flex max-h-[90vh] max-w-[95vw] items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* img: fullscreen lightbox con dimensioni fluide (stesso URL Sanity del thumbnail) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="max-h-[90vh] max-w-[95vw] object-contain shadow-2xl"
            draggable={false}
          />
        </div>
      </div>,
      document.body
    );

  return (
    <>
      <figure className="my-5">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative block w-full overflow-hidden rounded-lg border border-gray-200 text-left shadow-sm transition hover:opacity-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F66D5] focus-visible:ring-offset-2"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-label={alt ? `Apri immagine a schermo intero: ${alt}` : "Apri immagine a schermo intero"}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="h-auto w-full cursor-zoom-in transition duration-200 group-hover:scale-[1.02]"
            sizes={sizes}
          />
          <span className="pointer-events-none absolute bottom-2 end-2 rounded-md bg-black/50 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-sm transition group-hover:opacity-100 group-focus-visible:opacity-100">
            Clic per ingrandire
          </span>
        </button>
        {caption ? (
          <figcaption className="rac-body-sm mt-1 text-gray-500">{caption}</figcaption>
        ) : null}
      </figure>
      {modal}
    </>
  );
}
