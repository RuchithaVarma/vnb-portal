'use client';

import { usePathname } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navigation />}
      <main className={!isAdminRoute ? "min-h-screen" : ""}>
        {children}
      </main>
      {!isAdminRoute && <Footer />}
    </>
  );
}
