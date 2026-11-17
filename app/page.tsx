import Image, { getImageProps } from "next/image";
import { OffersCarousel } from "./offers-carousel";
import { StoreLink } from "./store-link";
import { StoreModal } from "./store-modal";

// Fotos em public/products: smartphone, notebook e audio são recortes da arte de categorias;
// perfume e gaming são o topo do card da arte mobile (cardTop: já trazem fundo, borda e selo,
// e cobrem os 62% de cima do card). Trocar pelos PNGs finais quando chegarem.
const offers = [
  { name: "iPhone 18 Pro Max", detail: "256GB", image: "/products/smartphone.webp" },
  { name: "Perfume", detail: "para hombre", image: "/products/perfume-card.webp", cardTop: true },
  { name: "Consola", detail: "de videojuegos", image: "/products/gaming-card.webp", cardTop: true },
  { name: "Notebook", detail: "de alto rendimiento", image: "/products/notebook.webp" },
  { name: "Auriculares", detail: "inalámbricos", image: "/products/audio.webp" },
];

type Art = { src: string; width: number; height: number };

// Troca a arte desktop pela mobile abaixo de lg (art direction com <picture>).
function ArtDirected({
  alt,
  desktop,
  mobile,
  priority = false,
}: {
  alt: string;
  desktop: Art;
  mobile: Art;
  priority?: boolean;
}) {
  const common = { alt, sizes: "(max-width: 1200px) 100vw, 1200px" };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, ...desktop });
  const {
    props: { srcSet: mobileSrcSet, ...rest },
  } = getImageProps({ ...common, ...mobile });

  return (
    <picture>
      <source media="(min-width: 1024px)" srcSet={desktopSrcSet} />
      <source srcSet={mobileSrcSet} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt vem do getImageProps */}
      <img
        {...rest}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        className="h-auto w-full"
      />
    </picture>
  );
}

function OfferCard({ offer }: { offer: (typeof offers)[number] }) {
  return (
    <li className="@container relative aspect-[516/733] shrink-0 snap-start bg-[url(/images/recuadro-productos.webp)] bg-[length:100%_100%]">
      {"cardTop" in offer ? (
        <div className="absolute inset-x-0 top-0 h-[62%]">
          <Image
            src={offer.image}
            alt={`${offer.name} ${offer.detail}`}
            fill
            sizes="(max-width: 640px) 50vw, 240px"
            className="rounded-t-[7%] [mask-image:linear-gradient(#000_85%,transparent)] object-cover"
          />
        </div>
      ) : (
        <>
          <Image
            src="/images/bf-label.webp"
            alt="Black Friday"
            width={196}
            height={139}
            className="absolute top-[2%] left-[2.5%] z-10 w-[32%]"
          />
          <div className="absolute inset-x-[6%] top-[10%] h-[52%]">
            <Image
              src={offer.image}
              alt={`${offer.name} ${offer.detail}`}
              fill
              sizes="(max-width: 640px) 50vw, 240px"
              className="object-contain [mask-image:radial-gradient(ellipse_at_center,#000_55%,transparent_75%)]"
            />
          </div>
        </>
      )}
      <p className="absolute inset-x-[6%] top-[65%] text-center font-condensed text-[8cqw] leading-tight font-bold uppercase">
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
  );
}

// O logo leva à loja do país; os ícones, como o resto da página, só abrem o modal.
function Footer() {
  return (
    <footer className="relative mt-4 border-t border-[#1f3bff]/60 bg-[#05041a]/80 shadow-[0_-1px_24px_rgba(31,59,255,0.35)]">
      {/* mobile/tablet: logo e ícones nos cantos; desktop: espaços iguais antes, entre e depois */}
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-4 lg:justify-evenly lg:py-5">
        <StoreLink className="transition hover:brightness-125">
          <Image
            src="/images/logo.webp"
            alt="Atlantico Shop"
            width={644}
            height={120}
            sizes="160px"
            className="h-auto w-28 lg:w-40"
          />
        </StoreLink>
        <div className="flex items-center gap-4 text-white lg:gap-5">
          <a href="#" aria-label="Instagram" className="hover:text-brand">
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
            </svg>
          </a>
          <a href="#" aria-label="Facebook" className="hover:text-brand">
            <svg viewBox="0 0 24 24" className="size-6" fill="currentColor">
              <path d="M12 2a10 10 0 0 0-1.56 19.88v-7H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57V12h2.78l-.44 2.89h-2.34v7A10 10 0 0 0 12 2Z" />
            </svg>
          </a>
          <a href="#" aria-label="YouTube" className="hover:text-brand">
            <svg viewBox="0 0 24 24" className="size-7" fill="currentColor">
              <path d="M21.6 7.2a2.5 2.5 0 0 0-1.77-1.77C18.27 5 12 5 12 5s-6.27 0-7.83.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.77 1.77C5.73 19 12 19 12 19s6.27 0 7.83-.43a2.5 2.5 0 0 0 1.77-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

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

      <main className="mx-auto w-full max-w-[1200px] flex-1 pb-12">
        {/* 1 · Hero */}
        <section>
          <h1 className="sr-only">Black Friday Atlantico: hasta 75% OFF del 19 al 21 de noviembre</h1>
          <ArtDirected
            alt="Atlantico Black Friday: 75% OFF del 19 al 21 de noviembre. Ver todas las ofertas"
            desktop={{ src: "/images/hero.webp", width: 2000, height: 812 }}
            mobile={{ src: "/images/hero-mobile.webp", width: 1600, height: 466 }}
            priority
          />
        </section>

        {/* 2 · Comprá por categoría — no mobile a mesma arte, inteira na largura, como no mockup */}
        <section className="mt-4 px-4 lg:mt-6">
          <h2 className="sr-only">Comprá por categoría</h2>
          <Image
            src="/images/categorias.webp"
            alt="Smartphones, Perfumes, Gaming, Notebooks y Audio"
            width={2000}
            height={467}
            sizes="(max-width: 1200px) 100vw, 1168px"
            className="h-auto w-full"
          />
        </section>

        {/* 3 · Ofertas imperdibles (+ beneficios ao lado no mobile) */}
        <section className="mt-6 px-4 lg:mt-10">
          <h2 className="sr-only">Ofertas imperdibles</h2>
          <Image
            src="/images/titulo-ofertas.webp"
            alt=""
            width={1400}
            height={77}
            sizes="(max-width: 1200px) 100vw, 1168px"
            className="h-auto w-full"
          />

          <ul className="mt-5 hidden grid-cols-5 gap-4 lg:grid">
            {offers.map((offer) => (
              <OfferCard key={offer.name} offer={offer} />
            ))}
          </ul>

          {/* Mesma composição do tablet em qualquer largura abaixo de lg, só que proporcionalmente menor */}
          <div className="mt-4 flex items-start gap-[4%] lg:hidden">
            <div className="w-[62%]">
              <OffersCarousel>
                {offers.map((offer) => (
                  <OfferCard key={offer.name} offer={offer} />
                ))}
              </OffersCarousel>
            </div>
            <Image
              src="/images/beneficios-mobile.webp"
              alt="Hasta 12 cuotas con tarjetas. Envío rápido a todo Paraguay. Compra segura"
              width={704}
              height={616}
              sizes="32vw"
              className="mt-[4%] h-auto w-[30%]"
            />
          </div>
        </section>

        {/* 4 · Beneficios (desktop; no mobile ficam ao lado das ofertas) */}
        <section className="mt-8 hidden px-4 lg:block">
          <h2 className="sr-only">Beneficios</h2>
          <Image
            src="/images/beneficios.webp"
            alt="Hasta 12 cuotas con tarjetas. Envío rápido a todo Paraguay. Compra segura"
            width={2000}
            height={139}
            sizes="1168px"
            className="h-auto w-full"
          />
        </section>

        {/* 5 · Banner final */}
        <section className="mt-8 px-4 lg:mt-6">
          <ArtDirected
            alt="Navegá hacia lo mejor en tecnología"
            desktop={{ src: "/images/banner-final.webp", width: 2000, height: 436 }}
            mobile={{ src: "/images/banner-final-mobile.webp", width: 1600, height: 311 }}
          />
        </section>
      </main>

      <Footer />

      <StoreModal />
    </>
  );
}
