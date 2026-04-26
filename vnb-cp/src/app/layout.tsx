import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VNB | Channel Partner Portal",
  description: "Enterprise management system for VNB Channel Partners",
};

import { PartnerProvider } from "@/context/PartnerContext";
import { ClientProvider } from "@/context/ClientContext";
import { AnnouncementProvider } from "@/context/AnnouncementContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PartnerProvider>
          <ClientProvider>
            <AnnouncementProvider>
              {children}
            </AnnouncementProvider>
          </ClientProvider>
        </PartnerProvider>
      </body>
    </html>
  );
}
