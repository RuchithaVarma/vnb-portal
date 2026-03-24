import { Metadata } from "next";
import AdminGuard from "./AdminGuard";

export const metadata: Metadata = {
  title: "Admin Portal - Brilliant Roots",
  description:
    "Manage your online teaching platform with our comprehensive admin dashboard",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminGuard>{children}</AdminGuard>;
}
