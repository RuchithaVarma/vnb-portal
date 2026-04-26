"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { 
  Users, 
  IndianRupee, 
  TrendingUp, 
  Wallet, 
  Plus, 
  ArrowUpRight, 
  Bell,
  CheckCircle2,
  AlertCircle,
  Clock
} from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import Link from "next/link";
import { useClientContext } from "@/context/ClientContext";
import { usePartnerContext } from "@/context/PartnerContext";
import { useAnnouncementContext } from "@/context/AnnouncementContext";
import { getSession } from "@/lib/auth-mock";
import { useState, useEffect } from "react";

export default function CPDashboard() {
  const { clients } = useClientContext();
  const { partners } = usePartnerContext();
  const { announcements } = useAnnouncementContext();
  const [session, setSession] = useState<any>(null);

  const [timeFilter, setTimeFilter] = useState<"all" | "monthly" | "yearly" | "custom">("all");
  const [customRange, setCustomRange] = useState({ start: "", end: "" });

  useEffect(() => {
    setSession(getSession());
  }, []);

  if (!session) return null;

  // Identify current partner
  const partnerProfile = partners.find(p => p.email === session.email);
  
  // Date parsing helper
  const parseDate = (dateStr: string) => {
    const parts = dateStr.split(" "); // ["26", "Apr,", "2024"]
    const day = parseInt(parts[0]);
    const monthStr = parts[1].replace(",", "");
    const year = parseInt(parts[2]);
    const months: any = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
    return new Date(year, months[monthStr], day);
  };

  // Filter logic
  const filteredClients = clients.filter(c => {
    const belongsToMe = c.partnerId === partnerProfile?.id || c.email === session.email;
    if (!belongsToMe) return false;

    if (timeFilter === "all") return true;

    const cDate = parseDate(c.date);
    const now = new Date();

    if (timeFilter === "monthly") {
      return cDate.getMonth() === now.getMonth() && cDate.getFullYear() === now.getFullYear();
    }

    if (timeFilter === "yearly") {
      return cDate.getFullYear() === now.getFullYear();
    }

    if (timeFilter === "custom" && customRange.start && customRange.end) {
      const start = new Date(customRange.start);
      const end = new Date(customRange.end);
      return cDate >= start && cDate <= end;
    }

    return true;
  });

  // Aggregates based on filtered data
  const totalSales = filteredClients.reduce((acc, c) => acc + (c.saleValue || 0), 0);
  const totalEarned = filteredClients.reduce((acc, c) => acc + (c.commissionEarned || 0), 0);
  const totalBalanceDue = filteredClients.reduce((acc, c) => acc + (c.balanceDue || 0), 0);

  return (
    <DashboardLayout role="cp">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Partner Dashboard</h1>
            <p className="text-slate-500">Welcome back, {session.name}! Tracking your {timeFilter} performance.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
            {(["all", "monthly", "yearly", "custom"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all",
                  timeFilter === filter 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none" 
                    : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {timeFilter === "custom" && (
          <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-3">
              <label className="text-xs font-bold text-slate-500 uppercase">From</label>
              <input 
                type="date" 
                value={customRange.start}
                onChange={(e) => setCustomRange({...customRange, start: e.target.value})}
                className="px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border-none text-sm"
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="text-xs font-bold text-slate-500 uppercase">To</label>
              <input 
                type="date" 
                value={customRange.end}
                onChange={(e) => setCustomRange({...customRange, end: e.target.value})}
                className="px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border-none text-sm"
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard 
            title="Total Clients" 
            value={filteredClients.length.toString()} 
            icon={Users} 
            trend={{ value: 12, isUp: true }} 
            color="indigo" 
          />
          <StatsCard 
            title="My Total Sales" 
            value={formatCurrency(totalSales)} 
            icon={TrendingUp} 
            trend={{ value: 8, isUp: true }} 
            color="emerald" 
          />
          <StatsCard 
            title="Net Earned" 
            value={formatCurrency(totalEarned - totalBalanceDue)} 
            icon={IndianRupee} 
            trend={{ value: 5, isUp: true }} 
            color="sky" 
          />
          <StatsCard 
            title="Balance Due" 
            value={formatCurrency(totalBalanceDue)} 
            icon={Wallet} 
            color="amber" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Sales Activity</h2>
                  <p className="text-sm text-slate-500">Track your latest client registrations</p>
                </div>
                <Link href="/cp/clients" className="text-indigo-600 dark:text-indigo-400 text-sm font-bold hover:underline flex items-center gap-1">
                  View All <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                      <th className="px-8 py-4 font-bold">Client Name</th>
                      <th className="px-8 py-4 font-bold text-right">Sale Amount</th>
                      <th className="px-8 py-4 font-bold text-right">Commission</th>
                      <th className="px-8 py-4 font-bold text-right">Balance Due</th>
                      <th className="px-8 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredClients.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-8 py-12 text-center text-slate-400">No recent sales found</td>
                      </tr>
                    ) : (
                      filteredClients.slice(0, 5).map((client) => (
                        <tr key={client.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                          <td className="px-8 py-5">
                            <div>
                              <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">{client.name}</p>
                              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                                <Clock className="w-3 h-3" /> {client.date}
                              </p>
                            </div>
                          </td>
                          <td className="px-8 py-5 text-sm text-slate-600 dark:text-slate-400 text-right font-medium">
                            {formatCurrency(client.saleValue)}
                          </td>
                          <td className="px-8 py-5 text-sm text-indigo-600 dark:text-indigo-400 text-right font-bold">
                            {formatCurrency(client.commissionEarned)}
                          </td>
                          <td className="px-8 py-5 text-sm text-emerald-600 dark:text-emerald-400 text-right font-bold">
                            {formatCurrency(client.balanceDue)}
                          </td>
                          <td className="px-8 py-5">
                            <span className={cn(
                              "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                              client.status === "Active" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400" : "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400"
                            )}>
                              <CheckCircle2 className="w-3 h-3" />
                              {client.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Bell className="w-5 h-5 text-indigo-600" />
                Announcements
              </h2>
              <div className="space-y-4">
                {(() => {
                  const filteredAnn = announcements.filter(ann => 
                    ann.targetPartners?.includes("all") || 
                    (partnerProfile && ann.targetPartners?.includes(partnerProfile.id))
                  );
                  
                  if (filteredAnn.length === 0) {
                    return <p className="text-sm text-slate-400 text-center py-10">No new announcements</p>;
                  }

                  return filteredAnn.slice(0, 3).map((ann) => (
                    <div key={ann.id} className={cn(
                      "p-5 rounded-3xl border transition-all",
                      ann.type === 'urgent' ? "bg-rose-50 dark:bg-rose-900/10 border-rose-100 dark:border-rose-900/30" : 
                      ann.type === 'warning' ? "bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/30" :
                      "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800/50"
                    )}>
                      <div className="flex items-start gap-3">
                        <AlertCircle className={cn(
                          "w-5 h-5 shrink-0 mt-0.5",
                          ann.type === 'urgent' ? "text-rose-600" : 
                          ann.type === 'warning' ? "text-amber-600" : "text-indigo-600"
                        )} />
                        <div>
                          <h4 className={cn(
                            "text-sm font-bold",
                            ann.type === 'urgent' ? "text-rose-900 dark:text-rose-200" : 
                            ann.type === 'warning' ? "text-amber-900 dark:text-amber-200" : "text-indigo-900 dark:text-indigo-200"
                          )}>{ann.title}</h4>
                          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                            {ann.content}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-widest">{ann.date}</p>
                        </div>
                      </div>
                    </div>
                  ));
                })()}
              </div>
              <Link href="/cp/announcements" className="block w-full mt-6 py-3 text-indigo-600 dark:text-indigo-400 text-sm font-bold hover:underline text-center">View All Notifications</Link>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-200 dark:shadow-none relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-700" />
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-3">Partner Support</h3>
                <p className="text-sm text-indigo-100/80 mb-8 leading-relaxed">
                  Have questions about a sale or your commission? Our support team is here to help you 24/7.
                </p>
                <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-bold hover:shadow-lg transition-all active:scale-95">
                  Contact Relationship Manager
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
