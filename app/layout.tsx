import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "Blooms Energy | Raw. Real. Truly Pure.",
    template: "%s | Blooms Energy"
  },
  description: "Experience nature's potency with our clean, chemical-free powders. Direct from farmers, 100% additive-free, and lab-tested for your wellness.",
  keywords: ["raw powders", "organic supplements", "blooms energy", "chemical free", "fruit powders", "vegetable powders", "wellness", "natural energy"],
  authors: [{ name: "Blooms Energy Team" }],
  creator: "Blooms Energy",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://bloomsenergy.in",
    title: "Blooms Energy | Raw. Real. Truly Pure.",
    description: "Pure, lab-tested raw powders direct from farmers.",
    siteName: "Blooms Energy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blooms Energy | Raw. Real. Truly Pure.",
    description: "Pure, lab-tested raw powders direct from farmers.",
  },
};

import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from "@/lib/cart-context";
import ClientLayout from "@/components/ClientLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-sans bg-cream-100 text-forest-900 antialiased selection:bg-gold-200">
        <AuthProvider>
          <CartProvider>
            <ClientLayout>{children}</ClientLayout>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
