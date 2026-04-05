"use client";

import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const SCALE_MIN = 1;
const SCALE_MAX = 4;
const SCALE_STEP = 0.25;
/** Swipe verso il basso per chiudere (solo a zoom 100%) */
const SWIPE_CLOSE_PX = 100;

type Common = {
  src: string;
  fullSrc?: string;
  alt: string;
  className?: string;
};

type Props = Common &
  (
    | { fill: true; sizes: string }
    | { fill?: false; width: number; height: number; sizes?: string }
  );

export default function ImageLightbox(props: Props) {
  const { src, fullSrc, alt, className = "" } = props;
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const swipeStartY = useRef<number | null>(null);

  const close = useCallback(() => setOpen(false), []);

  const zoomIn = useCallback(() => {
    setScale((s) => Math.min(SCALE_MAX, Math.round((s + SCALE_STEP) * 100) / 100));
  }, []);

  const zoomOut = useCallback(() => {
    setScale((s) => Math.max(SCALE_MIN, Math.round((s - SCALE_STEP) * 100) / 100));
  }, []);

  useEffect(() => {
    if (!open) {
      setScale(1);
      swipeStartY.current = null;
      return;
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      if (e.deltaY < 0) zoomIn();
      else zoomOut();
    },
    [zoomIn, zoomOut]
  );

  const displaySrc = fullSrc || src;

  const onOverlayTouchStart = useCallback((e: React.TouchEvent) => {
    if (scale !== 1) return;
    swipeStartY.current = e.touches[0].clientY;
  }, [scale]);

  const onOverlayTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (scale !== 1 || swipeStartY.current == null) {
        swipeStartY.current = null;
        return;
      }
      const y = e.changedTouches[0].clientY;
      if (y - swipeStartY.current > SWIPE_CLOSE_PX) close();
      swipeStartY.current = null;
    },
    [scale, close]
  );

  const thumbnail = props.fill ? (
    <Image src={src} alt={alt} fill className={className} sizes={props.sizes} />
  ) : (
    <Image
      src={src}
      alt={alt}
      width={props.width}
      height={props.height}
      className={className}
      sizes={props.sizes}
    />
  );

  const zoomBtnClass =
    "flex h-11 min-w-11 shrink-0 items-center justify-center rounded-full text-white active:bg-white/25 disabled:opacity-35 sm:h-10 sm:min-w-10 sm:hover:bg-white/15";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          props.fill
            ? "relative block h-full w-full cursor-zoom-in overflow-hidden text-left outline-none focus-visible:ring-2 focus-visible:ring-[#2F66D5] focus-visible:ring-offset-2"
            : "group relative block w-max max-w-full cursor-zoom-in text-left outline-none focus-visible:ring-2 focus-visible:ring-[#2F66D5] focus-visible:ring-offset-2"
        }
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`Apri immagine ingrandita: ${alt}`}
      >
        {thumbnail}
        <span className="pointer-events-none absolute bottom-2 right-2 rounded-md bg-black/60 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-white shadow-sm sm:text-xs">
          {props.fill ? "Ingrandisci" : "Zoom"}
        </span>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[240]"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          aria-describedby="lightbox-hint"
        >
          {/* Sfondo: tap / click chiude; fuori dall’immagine i tocchi arrivano qui (pointer-events) */}
          <button
            type="button"
            className="absolute inset-0 z-0 bg-black/92"
            aria-label="Chiudi: tocca fuori dall’immagine"
            onClick={close}
            onTouchStart={onOverlayTouchStart}
            onTouchEnd={onOverlayTouchEnd}
          />

          <p id="lightbox-hint" className="sr-only">
            Chiudi toccando lo sfondo scuro, trascinando verso il basso a zoom normale, o con il tasto
            Escape.
          </p>

          {/* Contenitore non interattivo: solo toolbar e box immagine intercettano i tocchi */}
          <div className="pointer-events-none absolute inset-0 z-10 flex flex-col pt-[max(0.5rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <div className="pointer-events-auto flex justify-center px-3">
              <div className="flex items-center gap-0.5 rounded-full border border-white/25 bg-black/55 px-1 py-1 shadow-lg backdrop-blur-md">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    zoomOut();
                  }}
                  className={zoomBtnClass}
                  aria-label="Zoom indietro"
                  disabled={scale <= SCALE_MIN}
                >
                  <Minus className="h-6 w-6 sm:h-5 sm:w-5" strokeWidth={2.25} aria-hidden />
                </button>
                <span className="min-w-13 px-1 text-center text-sm font-medium tabular-nums text-white sm:text-sm">
                  {Math.round(scale * 100)}%
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    zoomIn();
                  }}
                  className={zoomBtnClass}
                  aria-label="Zoom avanti"
                  disabled={scale >= SCALE_MAX}
                >
                  <Plus className="h-6 w-6 sm:h-5 sm:w-5" strokeWidth={2.25} aria-hidden />
                </button>
              </div>
            </div>

            <div className="pointer-events-none flex min-h-0 flex-1 items-center justify-center px-2 pt-2 sm:px-4">
              <div
                className="pointer-events-auto max-h-[min(88dvh,calc(100dvh-5.5rem))] max-w-[min(96vw,100%)] touch-pan-x touch-pan-y overflow-auto overscroll-contain [-webkit-overflow-scrolling:touch]"
                onWheel={onWheel}
                onClick={(e) => {
                  if (e.target === e.currentTarget) close();
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={displaySrc}
                  alt={alt}
                  draggable={false}
                  className={
                    scale === 1
                      ? "block h-auto max-h-[min(82dvh,calc(100dvh-6rem))] w-auto max-w-[min(100%,94vw)] select-none object-contain"
                      : "block h-auto w-auto max-w-none select-none object-contain"
                  }
                  style={scale === 1 ? undefined : { width: `${scale * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
