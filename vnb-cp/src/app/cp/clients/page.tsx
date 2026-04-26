"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Users, 
  Search, 
  Filter, 
  IndianRupee,
  TrendingUp,
  Clock,
  ArrowUpRight,
  Plus,
  Edit,
  Trash2,
  X,
  FileText,
  CreditCard,
  History,
  AlertTriangle,
  ChevronDown,
  UploadCloud
} from "lucide-react";

import Link from "next/link";
import { useClientContext, Client } from "@/context/ClientContext";
import { usePartnerContext } from "@/context/PartnerContext";
import { getSession } from "@/lib/auth-mock";
import { formatCurrency, cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function CPClientList() {
  const { clients, updateClient, deleteClient } = useClientContext();
  const { partners } = usePartnerContext();
  const [session, setSession] = useState<any>(null);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Client>>({});

  useEffect(() => {
    setSession(getSession());
  }, []);

  if (!session) return null;

  const partnerProfile = partners.find(p => p.email === session.email);
  const myClients = clients.filter(c => c.partnerId === partnerProfile?.id || c.email === session.email);

  const totalSales = myClients.reduce((acc, c) => acc + (c.saleValue || 0), 0);
  const totalEarned = myClients.reduce((acc, c) => acc + (c.commissionEarned || 0), 0);
  const totalBalanceDue = myClients.reduce((acc, c) => acc + (c.balanceDue || 0), 0);

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setFormData(client);
  };

  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingClient) {
      const rate = partnerProfile?.commission || 10;
      updateClient(editingClient.id, formData, rate);
      setEditingClient(null);
    }
  };

  const handleAmountPaidChange = (val: number) => {
    const rate = partnerProfile?.commission || 10;
    const comm = (val * rate) / 100;
    const tds = comm * 0.05;
    setFormData({
      ...formData, 
      amountPaid: val,
      commissionEarned: comm,
      deduction: tds
    });
  };

  const handleSaleValueChange = (val: number) => {
    setFormData({
      ...formData, 
      saleValue: val
    });
  };

  const handleDelete = (id: string) => {
    deleteClient(id);
    setShowDeleteConfirm(null);
  };

  return (
    <DashboardLayout role="cp">
      <div className="space-y-8 pb-20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Client Portfolio</h1>
            <p className="text-slate-500">Manage clients, track payments and commission payouts</p>
          </div>
          <Link 
            href="/cp/clients/add" 
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-200 dark:shadow-none"
          >
            <Plus className="w-5 h-5" />
            Register New Client
          </Link>
        </div>

        {/* Edit Modal */}
        {editingClient && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
              <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Edit Client & Transaction Details</h2>
                  <p className="text-sm text-slate-500">Update sale values and commission tracking</p>
                </div>
                <button onClick={() => setEditingClient(null)} className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all">
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleSubmitEdit} className="p-8 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Client Payment Side */}
                  <div className="space-y-6">
                    <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      Client Payment to Company
                    </h3>
                    <div className="space-y-4 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Sale Value (₹)</label>
                        <input 
                          type="number" 
                          value={formData.saleValue || ""}
                          onChange={(e) => handleSaleValueChange(Number(e.target.value))}
                          className="w-full px-4 py-3 bg-white dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20 font-bold" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Amount Paid to VNB (₹)</label>
                        <input 
                          type="number" 
                          value={formData.amountPaid || ""}
                          onChange={(e) => handleAmountPaidChange(Number(e.target.value))}
                          className="w-full px-4 py-3 bg-white dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20 font-bold text-emerald-600" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Client Transaction ID</label>
                        <input 
                          type="text" 
                          value={formData.clientTransactionId}
                          onChange={(e) => setFormData({...formData, clientTransactionId: e.target.value})}
                          className="w-full px-4 py-3 bg-white dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20 font-mono text-sm" 
                          placeholder="TXN-XXXX-XXXX"
                        />
                      </div>
                      <div className="pt-2">
                        <button type="button" className="w-full py-3 bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-slate-400 text-xs font-bold flex items-center justify-center gap-2 hover:border-indigo-500 hover:text-indigo-500 transition-all">
                          <UploadCloud className="w-4 h-4" />
                          Upload Client Invoice / Receipt
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Partner Commission Side */}
                  <div className="space-y-6">
                    <h3 className="text-sm font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                      <History className="w-4 h-4" />
                      Partner Commission Tracking
                    </h3>
                    <div className="space-y-4 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase">Gross Comm.</label>
                          <input 
                            type="number" 
                            value={formData.commissionEarned || ""}
                            onChange={(e) => setFormData({...formData, commissionEarned: Number(e.target.value)})}
                            className="w-full px-4 py-3 bg-white dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20 font-bold" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase">Deductions (TDS)</label>
                          <input 
                            type="number" 
                            value={formData.deduction || ""}
                            onChange={(e) => setFormData({...formData, deduction: Number(e.target.value)})}
                            className="w-full px-4 py-3 bg-white dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20 font-bold text-rose-500" 
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase flex items-center justify-between">
                            Incentives (₹)
                            <span className="text-[9px] text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded-full">Admin Managed</span>
                          </label>
                          <input 
                            type="number" 
                            readOnly
                            disabled
                            value={formData.incentives || ""}
                            className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-900/50 border-none rounded-xl font-bold text-indigo-600 cursor-not-allowed opacity-70" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase">Incentive Status</label>
                          <input 
                            type="text"
                            readOnly
                            disabled
                            value={formData.incentivesStatus}
                            className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-900/50 border-none rounded-xl font-bold text-sm cursor-not-allowed opacity-70"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase flex items-center justify-between">
                          Comm. Received from VNB (₹)
                          <span className="text-[9px] text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded-full">Managed by Admin</span>
                        </label>
                        <input 
                          type="number" 
                          readOnly
                          disabled
                          value={formData.commissionReceived || ""}
                          className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-900/50 border-none rounded-xl font-bold text-emerald-600 cursor-not-allowed opacity-70" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Commission Transaction ID</label>
                        <input 
                          type="text" 
                          readOnly
                          disabled
                          value={formData.commissionTransactionId}
                          className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-900/50 border-none rounded-xl font-mono text-sm cursor-not-allowed opacity-70" 
                          placeholder="Managed by Admin"
                        />
                      </div>

                      {/* Payout History Section */}
                      <div className="pt-4 border-t border-slate-200 dark:border-slate-700 mt-4">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <History className="w-3 h-3" />
                          Payout History (from Admin)
                        </h4>
                        <div className="space-y-3 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                          {!formData.payouts || formData.payouts.length === 0 ? (
                            <p className="text-[10px] text-slate-400 italic">No payout history available</p>
                          ) : (
                            formData.payouts.map((pay: any) => (
                              <div key={pay.id} className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                                <div>
                                  <p className="font-bold text-emerald-600">{formatCurrency(pay.amount)}</p>
                                  <p className="text-[9px] text-slate-400 font-mono mt-0.5">{pay.txId}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-slate-500 font-medium">{pay.date.split(',')[0]}</p>
                                  <p className="text-[9px] text-slate-400 mt-0.5">{pay.date.split(',')[1]}</p>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between p-6 bg-indigo-600 rounded-[2rem] text-white shadow-xl shadow-indigo-200 dark:shadow-none">
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-indigo-200 tracking-widest">Commission Due</p>
                      <p className="text-2xl font-bold">{formatCurrency((formData.commissionEarned || 0) - (formData.deduction || 0) - (formData.commissionReceived || 0))}</p>
                    </div>
                    <div className="w-px h-10 bg-indigo-500/50" />
                    <div>
                      <p className="text-[10px] uppercase font-bold text-indigo-200 tracking-widest">Total Payout Value</p>
                      <p className="text-2xl font-bold">{formatCurrency((formData.commissionEarned || 0) - (formData.deduction || 0) + (formData.incentives || 0))}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button type="button" onClick={() => setEditingClient(null)} className="px-6 py-3 font-bold text-indigo-100 hover:text-white transition-all">Cancel</button>
                    <button type="submit" className="bg-white text-indigo-600 px-10 py-3 rounded-xl font-bold hover:shadow-lg transition-all active:scale-95">Save Changes</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl p-8 animate-in fade-in zoom-in duration-200">
              <div className="w-16 h-16 bg-rose-50 dark:bg-rose-900/20 rounded-2xl flex items-center justify-center text-rose-600 mb-6">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Delete Client Record?</h2>
              <p className="text-slate-500 mb-8">This will permanently remove the client and all associated transaction history. This action is irreversible.</p>
              <div className="flex gap-4">
                <button onClick={() => setShowDeleteConfirm(null)} className="flex-1 px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-xl">Cancel</button>
                <button onClick={() => handleDelete(showDeleteConfirm)} className="flex-1 px-6 py-3 bg-rose-600 text-white font-bold rounded-xl shadow-lg shadow-rose-200 dark:shadow-none hover:bg-rose-700 transition-all">Delete Forever</button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Clients</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{myClients.length}</p>
            <div className="mt-4 flex items-center gap-2 text-emerald-600 text-xs font-bold">
              <TrendingUp className="w-4 h-4" />
              +12% from last month
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Sales Portfolio</p>
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">{formatCurrency(totalSales)}</p>
            <div className="mt-4 flex items-center gap-2 text-slate-400 text-xs font-bold">
              <Clock className="w-4 h-4" />
              Updated just now
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pending Payout</p>
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mt-2">{formatCurrency(totalBalanceDue)}</p>
              <div className="mt-4 flex items-center gap-2 text-indigo-400 text-xs font-bold">
                <IndianRupee className="w-4 h-4" />
                Net after TDS & payouts
              </div>
            </div>
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <IndianRupee className="w-20 h-20 text-indigo-600" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by client name or ID..." 
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500/20 shadow-sm"
              />
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:shadow-md transition-all">
                <Filter className="w-4 h-4" />
                Advanced Filters
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/30 text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold tracking-[0.2em]">
                  <th className="px-8 py-5">Client Identity</th>
                  <th className="px-8 py-5 text-right">Portfolio Value</th>
                  <th className="px-8 py-5 text-right">Commission</th>
                  <th className="px-8 py-5 text-right">Net Received</th>
                  <th className="px-8 py-5 text-right">Balance Due</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {myClients.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-8 py-24 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center text-slate-200">
                          <Users className="w-10 h-10" />
                        </div>
                        <div>
                          <p className="text-slate-500 font-bold text-lg">Your portfolio is empty</p>
                          <p className="text-slate-400 text-sm mt-1">Register your first client to see transaction history</p>
                        </div>
                        <Link href="/cp/clients/add" className="mt-2 bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-indigo-100">Add First Client</Link>
                      </div>
                    </td>
                  </tr>
                ) : (
                  myClients.map((client) => (
                    <tr key={client.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-all group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                            {client.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white mb-0.5">{client.name}</p>
                            <p className="text-[10px] text-slate-400 font-mono flex items-center gap-2">
                              {client.id} • <Clock className="w-3 h-3" /> {client.date}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-sm text-slate-900 dark:text-white text-right font-bold">
                        {formatCurrency(client.saleValue)}
                      </td>
                      <td className="px-8 py-6 text-sm text-indigo-600 dark:text-indigo-400 text-right font-bold">
                        {formatCurrency(client.commissionEarned)}
                      </td>
                      <td className="px-8 py-6 text-sm text-emerald-600 text-right font-bold">
                        {formatCurrency(client.commissionReceived)}
                      </td>
                      <td className="px-8 py-6 text-sm text-rose-600 dark:text-rose-400 text-right font-black">
                        {formatCurrency(client.balanceDue)}
                      </td>
                      <td className="px-8 py-6">
                        <span className={cn(
                          "px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider",
                          client.status === "Active" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400" : 
                          client.status === "Pending" ? "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400" : 
                          "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                        )}>
                          {client.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleEdit(client)}
                            className="p-2.5 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900/30 rounded-xl transition-all"
                            title="Edit Transaction"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => setShowDeleteConfirm(client.id)}
                            className="p-2.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-900/30 rounded-xl transition-all"
                            title="Delete Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
