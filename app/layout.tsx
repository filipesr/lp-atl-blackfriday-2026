import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Black Friday Atlantico | Hasta 75% OFF",
  description:
    "Black Friday Atlantico Shop: descuentos increíbles en toda la tienda del 19 al 21 de noviembre.",
};

export const viewport: Viewport = {
  themeColor: "#05041a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${barlow.variable} ${barlowCondensed.variable} antialiased`}
    >
      <body className="flex flex-col">{children}</body>
    </html>
  );
}
