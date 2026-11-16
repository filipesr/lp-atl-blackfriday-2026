"use client";

import { useEffect, useRef, useState } from "react";

// Qualquer clique na página abre o aviso; cliques dentro do próprio modal não reabrem.
export function StoreModal() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (rootRef.current?.contains(event.target as Node)) return;
      event.preventDefault();
      setOpen(true);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("click", onClick, true);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <div ref={rootRef}>
      {open && (
        <div
          className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="store-modal-title"
            className="animate-modal-in relative w-full max-w-md cursor-default rounded-3xl border-2 border-[#1f3bff] bg-[radial-gradient(ellipse_at_center,#1d5fa3_0%,#12082a_75%)] px-8 py-10 text-center shadow-[0_0_60px_rgba(31,59,255,0.45)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Cerrar"
              className="absolute top-3 right-4 cursor-pointer text-3xl leading-none text-white/70 hover:text-white"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
            <p className="font-condensed text-sm font-bold tracking-[0.2em] text-brand uppercase">
              Black Friday Atlantico
            </p>
            <h2
              id="store-modal-title"
              className="mt-3 font-condensed text-4xl leading-tight font-extrabold uppercase"
            >
              Precio en la tienda
            </h2>
            <p className="mt-2 text-xl font-semibold text-white/90">
              ¡Vení y aprovechá!
            </p>
            <button
              type="button"
              className="mt-8 cursor-pointer rounded-full bg-gradient-to-r from-[#ff9a1f] to-[#d96a00] px-8 py-3 font-condensed text-lg font-bold tracking-wide uppercase shadow-lg transition hover:brightness-110"
              onClick={() => setOpen(false)}
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
