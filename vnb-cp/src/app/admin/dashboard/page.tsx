"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { 
  Users, 
  IndianRupee, 
  TrendingUp, 
  Award, 
  Plus, 
  ArrowUpRight, 
  Search,
  Clock
} from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import Link from "next/link";
import { usePartnerContext } from "@/context/PartnerContext";
import { useClientContext } from "@/context/ClientContext";

import { useState } from "react";

export default function AdminDashboard() {
  const { partners } = usePartnerContext();
  const { clients } = useClientContext();
  const [timeFilter, setTimeFilter] = useState<"all" | "monthly" | "yearly" | "custom">("all");
  const [customRange, setCustomRange] = useState({ start: "", end: "" });

  // Date parsing helper
  const parseDate = (dateStr: string) => {
    try {
      if (!dateStr) return new Date(0);
      
      // Try parsing standard formats first
      const standard = new Date(dateStr);
      if (!isNaN(standard.getTime())) return standard;

      // Handle "26 Apr, 2024" format
      const parts = dateStr.split(" ");
      if (parts.length >= 3) {
        const day = parseInt(parts[0]);
        const monthStr = parts[1].replace(",", "");
        const year = parseInt(parts[2]);
        const months: any = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
        if (months[monthStr] !== undefined) {
          return new Date(year, months[monthStr], day);
        }
      }
      return new Date(0);
    } catch (e) {
      return new Date(0);
    }
  };

  // Filter logic
  const filteredClients = clients.filter(c => {
    // Check if partner still exists in the system
    const partnerExists = partners.some(p => p.id === c.partnerId);
    if (!partnerExists) return false;

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

  // Aggregate stats from filtered clients
  const totalSales = filteredClients.reduce((acc, c) => acc + Number(c.saleValue || 0), 0);
  const totalAmountPaid = filteredClients.reduce((acc, c) => acc + Number(c.amountPaid || 0), 0);
  const totalReceived = filteredClients.reduce((acc, c) => acc + Number(c.commissionReceived || 0), 0);
  const totalBalanceDue = filteredClients.reduce((acc, c) => acc + Number(c.balanceDue || 0), 0);

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Overview</h1>
            <p className="text-slate-500">System performance for {timeFilter} period</p>
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
            title="System Sales" 
            value={formatCurrency(totalSales)} 
            icon={TrendingUp} 
            trend={{ value: 8, isUp: true }} 
            color="indigo" 
          />
          <StatsCard 
            title="Collected Income" 
            value={formatCurrency(totalAmountPaid)} 
            icon={IndianRupee} 
            trend={{ value: 12, isUp: true }} 
            color="emerald" 
          />
          <StatsCard 
            title="Comm. Disbursed" 
            value={formatCurrency(totalReceived)} 
            icon={Award} 
            trend={{ value: 5, isUp: true }} 
            color="sky" 
          />
          <StatsCard 
            title="Pending Payouts" 
            value={formatCurrency(totalBalanceDue)} 
            icon={Clock} 
            color="amber" 
          />
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Active Channel Partners</h2>
              <p className="text-sm text-slate-500">Partner performance for the selected period</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                  <th className="px-8 py-4 font-bold">Partner Name</th>
                  <th className="px-8 py-4 font-bold text-right">Clients</th>
                  <th className="px-8 py-4 font-bold text-right">Sales Volume</th>
                  <th className="px-8 py-4 font-bold text-right">Comm %</th>
                  <th className="px-8 py-4 font-bold text-right">Earned</th>
                  <th className="px-8 py-4 font-bold text-right">Bal Due</th>
                  <th className="px-8 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {partners.map((partner) => {
                  const partnerClients = filteredClients.filter(c => c.partnerId === partner.id);
                  const pSales = partnerClients.reduce((acc, c) => acc + (c.saleValue || 0), 0);
                  const pEarned = partnerClients.reduce((acc, c) => acc + (c.commissionEarned || 0), 0);
                  const pDue = partnerClients.reduce((acc, c) => acc + (c.balanceDue || 0), 0);
                  
                  return (
                    <tr key={partner.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-600 dark:text-slate-400">
                            {partner.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">{partner.name}</p>
                            <p className="text-xs text-slate-500">{partner.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm text-slate-600 dark:text-slate-400 text-right font-medium">
                        {partnerClients.length}
                      </td>
                      <td className="px-8 py-5 text-sm text-slate-600 dark:text-slate-400 text-right font-medium">
                        {formatCurrency(pSales)}
                      </td>
                      <td className="px-8 py-5 text-sm text-slate-600 dark:text-slate-400 text-right">
                        {partner.commission}%
                      </td>
                      <td className="px-8 py-5 text-sm text-indigo-600 dark:text-indigo-400 text-right font-bold">
                        {formatCurrency(pEarned)}
                      </td>
                      <td className="px-8 py-5 text-sm text-rose-600 dark:text-rose-400 text-right font-bold">
                        {formatCurrency(pDue)}
                      </td>
                      <td className="px-8 py-5">
                        <span className={cn(
                          "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          partner.status === "Active" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400" : "bg-slate-50 text-slate-600"
                        )}>
                          {partner.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="p-8 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center">
            <Link href="/admin/partners" className="text-indigo-600 dark:text-indigo-400 text-sm font-bold flex items-center gap-1 hover:underline">
              View All Partners <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
