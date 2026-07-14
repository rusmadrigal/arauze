"use client";
import React, { useEffect } from "react";

export default function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <button
        aria-label="Chiudi"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />
      {/* Panel */}
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-card p-5 md:p-6">
        {title ? (
          <h3 className="text-lg font-semibold mb-3 text-gray-900">{title}</h3>
        ) : null}
        {children}
        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
}
