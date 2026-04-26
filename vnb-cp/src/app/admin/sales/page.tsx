"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { 
  TrendingUp, 
  IndianRupee, 
  ArrowUpRight, 
  ArrowDownRight,
  Calendar,
  Filter,
  Download,
  Search,
  ArrowLeft
} from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { usePartnerContext } from "@/context/PartnerContext";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SalesAnalytics() {
  const { partners } = usePartnerContext();

  // Aggregate monthly sales across all partners
  const monthlyData = [
    { month: "Jan", amount: 0 },
    { month: "Feb", amount: 0 },
    { month: "Mar", amount: 0 },
    { month: "Apr", amount: 0 },
  ];

  partners.forEach(p => {
    p.monthlySales?.forEach((s, i) => {
      if (monthlyData[i]) monthlyData[i].amount += s.amount;
    });
  });

  const totalSales = monthlyData.reduce((acc, d) => acc + d.amount, 0);
  const maxSales = Math.max(...monthlyData.map(d => d.amount));

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8 pb-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
              <ArrowLeft className="w-5 h-5 text-slate-500" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Sales Analytics</h1>
              <p className="text-slate-500">Comprehensive overview of monthly performance</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-all">
              <Download className="w-4 h-4" />
              Export Report
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all">
              <Calendar className="w-4 h-4" />
              Last 4 Months
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard 
            title="Total Revenue" 
            value={formatCurrency(totalSales)} 
            icon={TrendingUp} 
            trend={{ value: 15, isUp: true }} 
            color="indigo" 
          />
          <StatsCard 
            title="Avg. Monthly Sales" 
            value={formatCurrency(totalSales / 4)} 
            icon={IndianRupee} 
            trend={{ value: 8, isUp: true }} 
            color="emerald" 
          />
          <StatsCard 
            title="Growth Rate" 
            value="+22.5%" 
            icon={ArrowUpRight} 
            trend={{ value: 4, isUp: true }} 
            color="sky" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Monthly Sales Overview</h2>
                <p className="text-sm text-slate-500">Revenue distribution for the current year</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-xs font-bold text-indigo-600">
                  <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                  Sales
                </div>
              </div>
            </div>

            <div className="flex items-end justify-between h-64 gap-4 px-4">
              {monthlyData.map((data, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                  <div className="relative w-full flex flex-col items-center justify-end h-full">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${(data.amount / maxSales) * 100}%` }}
                      transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                      className="w-full max-w-[60px] bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-2xl shadow-lg shadow-indigo-100 dark:shadow-none group-hover:from-indigo-500 group-hover:to-indigo-300 transition-all relative"
                    >
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-2 py-1 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        {formatCurrency(data.amount)}
                      </div>
                    </motion.div>
                  </div>
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">{data.month}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-8">Top Performers</h2>
            <div className="space-y-6">
              {[...partners]
                .sort((a, b) => (b.totalSales || 0) - (a.totalSales || 0))
                .slice(0, 4)
                .map((partner, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-600">
                      {partner.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{partner.name}</p>
                      <p className="text-xs text-slate-500">{partner.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-indigo-600">{formatCurrency(partner.totalSales || 0)}</p>
                    <div className="flex items-center gap-1 justify-end text-[10px] font-bold text-emerald-500">
                      <ArrowUpRight className="w-3 h-3" />
                      12%
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-3 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-100 transition-all">
              View All Partners
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Transaction History</h2>
              <p className="text-sm text-slate-500">Detailed breakdown of recent sales activity</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search transactions..." 
                  className="pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
              <button className="p-2 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-lg hover:text-indigo-600 transition-all">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                  <th className="px-8 py-4 font-bold">Partner</th>
                  <th className="px-8 py-4 font-bold">Location</th>
                  <th className="px-8 py-4 font-bold text-right">Commission</th>
                  <th className="px-8 py-4 font-bold text-right">Revenue</th>
                  <th className="px-8 py-4 font-bold text-right">Growth</th>
                  <th className="px-8 py-4 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {partners.map((partner) => (
                  <tr key={partner.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-xs font-bold text-indigo-600">
                          {partner.name.charAt(0)}
                        </div>
                        <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">{partner.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm text-slate-500">{partner.location}</td>
                    <td className="px-8 py-5 text-sm font-bold text-slate-900 dark:text-white text-right">{partner.commission}%</td>
                    <td className="px-8 py-5 text-sm font-bold text-indigo-600 text-right">{formatCurrency(partner.totalSales || 0)}</td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-1 text-xs font-bold text-emerald-500">
                        <ArrowUpRight className="w-3 h-3" />
                        14.2%
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                        Settled
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
