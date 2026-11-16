import Image from "next/image";
import { StoreModal } from "./store-modal";

// Fotos em public/products são recortes provisórios da arte de categorias — trocar pelos PNGs finais.
const offers = [
  { name: "iPhone 18 Pro Max", detail: "256GB", image: "/products/smartphone.webp" },
  { name: "Perfume", detail: "para hombre", image: "/products/perfume.webp" },
  { name: "Consola", detail: "de videojuegos", image: "/products/gaming.webp" },
  { name: "Notebook", detail: "de alto rendimiento", image: "/products/notebook.webp" },
  { name: "Auriculares", detail: "inalámbricos", image: "/products/audio.webp" },
];

export default function Home() {
  return (
    <>
      <div className="bg-gradient-to-r from-[#ff8a00] via-[#ff9a1f] to-[#ff8a00] px-4 py-2 text-center font-condensed text-xs font-bold tracking-wide uppercase sm:text-sm">
        Black Friday Atlantico
        <span className="mx-2 opacity-60">|</span>
        <span className="hidden sm:inline">
          ¡Descuentos increíbles en toda la tienda!
          <span className="mx-2 opacity-60">|</span>
        </span>
        19 al 21 de noviembre
      </div>

      <main className="mx-auto w-full max-w-[1200px] pb-12">
        {/* 1 · Hero */}
        <section>
          <h1 className="sr-only">Black Friday Atlantico: hasta 75% OFF del 19 al 21 de noviembre</h1>
          <Image
            src="/images/hero.webp"
            alt="Atlantico Black Friday: 75% OFF del 19 al 21 de noviembre. Ver todas las ofertas"
            width={2000}
            height={812}
            sizes="(max-width: 1200px) 100vw, 1200px"
            preload
            className="h-auto w-full"
          />
        </section>

        {/* 2 · Comprá por categoría */}
        <section className="mt-6 px-4">
          <h2 className="sr-only">Comprá por categoría</h2>
          <div className="scroll-strip -mx-4 px-4">
            <Image
              src="/images/categorias.webp"
              alt="Smartphones, Perfumes, Gaming, Notebooks y Audio"
              width={2000}
              height={467}
              sizes="(max-width: 760px) 760px, 1168px"
              className="h-auto w-full min-w-[720px]"
            />
          </div>
        </section>

        {/* 3 · Ofertas imperdibles */}
        <section className="mt-10 px-4">
          <h2 className="sr-only">Ofertas imperdibles</h2>
          <Image
            src="/images/titulo-ofertas.webp"
            alt=""
            width={1400}
            height={77}
            sizes="(max-width: 1200px) 100vw, 1168px"
            className="h-auto w-full"
          />
          <ul className="scroll-strip -mx-4 mt-5 flex snap-x gap-3 px-4 sm:grid sm:grid-cols-5 sm:gap-4">
            {offers.map((offer) => (
              <li
                key={offer.name}
                className="relative aspect-[516/733] w-[44vw] shrink-0 snap-start bg-[url(/images/recuadro-productos.webp)] bg-[length:100%_100%] sm:w-auto"
              >
                <Image
                  src="/images/bf-label.webp"
                  alt="Black Friday"
                  width={196}
                  height={139}
                  className="absolute top-[3%] left-[5%] z-10 w-[30%]"
                />
                <div className="absolute inset-x-[6%] top-[10%] h-[52%]">
                  <Image
                    src={offer.image}
                    alt={`${offer.name} ${offer.detail}`}
                    fill
                    sizes="(max-width: 640px) 44vw, 220px"
                    className="object-contain [mask-image:radial-gradient(ellipse_at_center,#000_55%,transparent_75%)]"
                  />
                </div>
                <p className="absolute inset-x-[6%] top-[65%] text-center font-condensed text-[clamp(13px,1.7vw,19px)] leading-tight font-bold uppercase">
                  {offer.name}
                  <br />
                  {offer.detail}
                </p>
                <Image
                  src="/images/boton-comprar.webp"
                  alt="Comprar ahora"
                  width={447}
                  height={95}
                  className="absolute bottom-[5%] left-1/2 w-[84%] -translate-x-1/2 transition hover:brightness-110"
                />
              </li>
            ))}
          </ul>
        </section>

        {/* 4 · Beneficios */}
        <section className="mt-8 px-4">
          <h2 className="sr-only">Beneficios</h2>
          <div className="scroll-strip -mx-4 px-4">
            <Image
              src="/images/beneficios.webp"
              alt="Hasta 12 cuotas con tarjetas. Envío rápido a todo Paraguay. Compra segura"
              width={2000}
              height={139}
              sizes="(max-width: 760px) 760px, 1168px"
              className="h-auto w-full min-w-[720px]"
            />
          </div>
        </section>

        {/* 5 · Banner final */}
        <section className="mt-6 px-4">
          <Image
            src="/images/banner-final.webp"
            alt="Navegá hacia lo mejor en tecnología"
            width={2000}
            height={436}
            sizes="(max-width: 1200px) 100vw, 1168px"
            className="h-auto w-full"
          />
        </section>
      </main>

      <footer className="border-t border-white/10 px-4 py-6 text-center text-sm text-white/60">
        © 2026 Atlantico Shop · Black Friday del 19 al 21 de noviembre
      </footer>

      <StoreModal />
    </>
  );
}
