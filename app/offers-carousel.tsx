"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Carrossel por scroll-snap; os pontos só indicam a página (tocar abre o modal, como no resto da página).
export function OffersCarousel({ children }: { children: ReactNode }) {
  const listRef = useRef<HTMLUListElement>(null);
  const [pages, setPages] = useState(1);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    function update() {
      if (!list) return;
      const { scrollLeft, scrollWidth, clientWidth } = list;
      const total = Math.max(1, Math.ceil(scrollWidth / clientWidth - 0.05));
      const atEnd = scrollLeft + clientWidth >= scrollWidth - 2;
      setPages(total);
      setActive(atEnd ? total - 1 : Math.round(scrollLeft / clientWidth));
    }
    update();
    list.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      list.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div>
      <ul
        ref={listRef}
        className="scroll-strip flex snap-x snap-mandatory gap-[3%] pt-1 [&>li]:w-[calc((100%-6%)/3)]"
      >
        {children}
      </ul>
      <div className="mt-[4%] flex justify-center gap-1.5 sm:gap-2" aria-hidden="true">
        {Array.from({ length: pages }, (_, i) => (
          <span
            key={i}
            className={`size-1.5 rounded-full sm:size-2.5 transition-colors ${i === active ? "bg-brand" : "bg-white"}`}
          />
        ))}
      </div>
    </div>
  );
}
