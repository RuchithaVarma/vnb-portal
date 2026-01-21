import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Blooms Energy Raw Powders | Raw. Real. Truly Pure.",
  description: "Clean, raw, chemical-free powders made from fresh farm produce — naturally pure. Lab-tested quality, FSSAI certified, direct from farmers. Shop fruit powders, vegetable powders, leafy vegetable powders, and flakes.",
  keywords: "raw powders, fruit powders, vegetable powders, leafy vegetable powders, flakes, chemical-free, FSSAI certified, lab-tested, Blooms Energy, bulk orders",
};

import { CartProvider } from "@/lib/cart-context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <CartProvider>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
