"use client";

import { useEffect, useRef, useState } from "react";

const messages = {
  py: {
    title: "Precios sin IVA",
    body: [
      "Oferta exclusiva para tienda física",
      "(web no habilitada para pedidos online en estas fechas).",
    ],
    closing: "¡Te esperamos por la tienda!",
    ok: "Entendido",
    close: "Cerrar",
    width: "max-w-[30rem]",
  },
  br: {
    title: "Preços exclusivos para compra na loja.",
    body: ["Não realizamos envios nem entregas para o território Brasileiro."],
    closing: "Esperamos por você na loja!",
    ok: "Entendi",
    close: "Fechar",
    width: "max-w-xl",
  },
};

// O mesmo deploy atende os dois domínios: .br mostra a versão BR, o resto (inclusive localhost) a PY.
// Para testar localmente: ?site=br ou ?site=py.
function currentSite(): keyof typeof messages {
  const forced = new URLSearchParams(window.location.search).get("site");
  if (forced === "br" || forced === "py") return forced;
  return window.location.hostname.endsWith(".br") ? "br" : "py";
}

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

  // Só renderiza aberto no cliente, então ler window aqui não quebra a hidratação.
  const text = open ? messages[currentSite()] : null;

  return (
    <div ref={rootRef}>
      {text && (
        <div
          className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="store-modal-title"
            className={`animate-modal-in relative w-full ${text.width} cursor-default rounded-3xl border-2 border-[#1f3bff] bg-[radial-gradient(ellipse_at_center,#1d5fa3_0%,#12082a_75%)] px-8 py-10 text-center shadow-[0_0_60px_rgba(31,59,255,0.45)]`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label={text.close}
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
              className="mt-3 font-condensed text-3xl leading-tight font-extrabold uppercase"
            >
              {text.title}
            </h2>
            <p className="mt-3 text-base leading-snug text-white/85">
              {/* Cada item é uma linha; a partir de sm não quebra dentro dela */}
              {text.body.map((line) => (
                <span key={line} className="block sm:whitespace-nowrap">
                  {line}
                </span>
              ))}
            </p>
            <p className="mt-4 text-xl font-semibold">{text.closing}</p>
            <button
              type="button"
              className="mt-8 cursor-pointer rounded-full bg-gradient-to-r from-[#ff9a1f] to-[#d96a00] px-8 py-3 font-condensed text-lg font-bold tracking-wide uppercase shadow-lg transition hover:brightness-110"
              onClick={() => setOpen(false)}
            >
              {text.ok}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
