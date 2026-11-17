"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { currentSite, storeUrl } from "./site";

const noSubscribe = () => () => {};

// Link para a loja do país do domínio (o servidor renderiza o PY; o cliente corrige na hidratação).
// data-no-modal faz o clique navegar em vez de abrir o aviso.
export function StoreLink({ children, className }: { children: ReactNode; className?: string }) {
  const href = useSyncExternalStore(
    noSubscribe,
    () => storeUrl[currentSite()],
    () => storeUrl.py,
  );

  return (
    <a href={href} data-no-modal className={className}>
      {children}
    </a>
  );
}
