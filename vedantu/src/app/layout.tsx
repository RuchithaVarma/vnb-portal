import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";
import { AuthProvider } from "@/context/AuthContext";
import FirebaseErrorBoundary from "@/components/FirebaseErrorBoundary";
import "@/lib/firebase-error-handler";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brilliant Roots | India's Leading Online Learning Platform",
  description:
    "Live online classes with India's best teachers. Personalized learning for Class 1-12, JEE, NEET & more. Book a FREE trial today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-poppins antialiased`}>
        <FirebaseErrorBoundary>
          <AuthProvider>
            <Layout>{children}</Layout>
          </AuthProvider>
        </FirebaseErrorBoundary>
      </body>
    </html>
  );
}
