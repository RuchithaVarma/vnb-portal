"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  TrendingUp, 
  Megaphone, 
  LogOut,
  ChevronRight,
  Briefcase,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  role: "admin" | "cp";
}

const adminLinks = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Channel Partners", href: "/admin/partners", icon: Users },
  { name: "Announcements", href: "/admin/announcements", icon: Megaphone },
];

const cpLinks = [
  { name: "Dashboard", href: "/cp/dashboard", icon: LayoutDashboard },
  { name: "My Clients", href: "/cp/clients", icon: Users },
  { name: "Announcements", href: "/cp/announcements", icon: Megaphone },
  { name: "Settings", href: "/cp/settings", icon: Settings },
];

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const links = role === "admin" ? adminLinks : cpLinks;

  return (
    <div className="flex flex-col w-64 h-screen bg-white border-r border-slate-200 dark:bg-slate-900 dark:border-slate-800 transition-all duration-300">
      <div className="flex items-center justify-center h-20 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200 dark:shadow-none">
            V
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-sky-600">
            VNB Portal
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 mb-4">
          Main Menu
        </p>
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400" 
                  : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50"
              )}
            >
              <div className="flex items-center gap-3">
                <link.icon className={cn(
                  "w-5 h-5 transition-colors",
                  isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                )} />
                <span className="font-medium">{link.name}</span>
              </div>
              {isActive && <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <button 
          onClick={() => {
            localStorage.removeItem("vnb-session");
            window.location.href = "/login";
          }}
          className="flex items-center gap-3 w-full px-4 py-3 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200 dark:text-slate-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
