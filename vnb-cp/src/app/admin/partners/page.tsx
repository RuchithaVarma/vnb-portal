"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  UserPlus, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  MapPin, 
  Percent,
  ChevronRight,
  ArrowLeft,
  Edit,
  Trash2,
  X,
  AlertTriangle,
  CheckCircle,
  IndianRupee,
  Users
} from "lucide-react";
import Link from "next/link";
import { cn, formatCurrency } from "@/lib/utils";
import { usePartnerContext, Partner } from "@/context/PartnerContext";
import { useClientContext } from "@/context/ClientContext";

export default function PartnerManagement() {
  const { partners, addPartner, updatePartner, deletePartner } = usePartnerContext();
  const { clients } = useClientContext();
  const [showForm, setShowForm] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [createdCredentials, setCreatedCredentials] = useState<{ email: string; password: string } | null>(null);
  
  const [formData, setFormData] = useState<Partial<Partner>>({
    name: "",
    email: "",
    phone: "",
    commission: 10,
    location: "Mumbai",
  });

  const handleOpenAdd = () => {
    setEditingPartner(null);
    setCreatedCredentials(null);
    setFormData({ name: "", email: "", phone: "", commission: 10, location: "Mumbai" });
    setShowForm(true);
  };

  const handleOpenEdit = (partner: Partner) => {
    setEditingPartner(partner);
    setFormData(partner);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    deletePartner(id);
    setShowDeleteConfirm(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPartner) {
      updatePartner(editingPartner.id, formData);
      setShowForm(false);
    } else {
      addPartner(formData as Omit<Partner, "id" | "clients" | "status">);
      setCreatedCredentials({
        email: formData.email || "",
        password: "password" // Default password
      });
    }
  };

  const [selectedPartnerForDetails, setSelectedPartnerForDetails] = useState<Partner | null>(null);
  const [showPayoutModal, setShowPayoutModal] = useState<{ clientId: string; partnerId: string } | null>(null);
  const [payoutData, setPayoutData] = useState({ amount: 0, txId: "", incentives: 0, incStatus: "N/A" as any });
  const { updateClient } = useClientContext();

  const handleDisburse = (e: React.FormEvent) => {
    e.preventDefault();
    if (showPayoutModal) {
      const client = clients.find(c => c.id === showPayoutModal.clientId);
      if (client) {
        const newPayout = {
          id: `pay-${Math.random().toString(36).substr(2, 9)}`,
          amount: Number(payoutData.amount),
          txId: payoutData.txId,
          date: new Date().toLocaleString('en-GB', { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        };

        updateClient(showPayoutModal.clientId, {
          commissionReceived: Number(client.commissionReceived || 0) + Number(payoutData.amount),
          commissionTransactionId: payoutData.txId,
          payouts: [...(client.payouts || []), newPayout],
          incentives: Number(payoutData.incentives),
          incentivesStatus: payoutData.incStatus
        }, selectedPartnerForDetails?.commission);
      }
      setShowPayoutModal(null);
      setPayoutData({ amount: 0, txId: "", incentives: 0, incStatus: "N/A" });
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8 pb-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
              <ArrowLeft className="w-5 h-5 text-slate-500" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Channel Partners</h1>
              <p className="text-slate-500">Manage your partner network and track real-time performance</p>
            </div>
          </div>
          <button 
            onClick={handleOpenAdd}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-200 dark:shadow-none"
          >
            <UserPlus className="w-5 h-5" />
            Onboard New Partner
          </button>
        </div>

        {/* Partner Details & Payout Management Modal */}
        {selectedPartnerForDetails && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[70] flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 w-full max-w-6xl h-[90vh] rounded-[3rem] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
              <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                    {selectedPartnerForDetails.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedPartnerForDetails.name}</h2>
                    <p className="text-sm text-slate-500">Partner Revenue & Commission Tracking</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedPartnerForDetails(null)}
                  className="p-3 bg-white dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:text-rose-600 rounded-2xl transition-all shadow-sm"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8">
                {/* Stats Header for Partner */}
                {(() => {
                  const partnerClients = clients.filter(c => c.partnerId === selectedPartnerForDetails.id);
                  const totalSale = partnerClients.reduce((acc, c) => acc + Number(c.saleValue || 0), 0);
                  const totalPaid = partnerClients.reduce((acc, c) => acc + Number(c.amountPaid || 0), 0);
                  const totalEarned = partnerClients.reduce((acc, c) => acc + Number(c.commissionEarned || 0), 0);
                  const totalReceived = partnerClients.reduce((acc, c) => acc + Number(c.commissionReceived || 0), 0);
                  const totalDue = partnerClients.reduce((acc, c) => acc + Number(c.balanceDue || 0), 0);

                  return (
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-[2rem] border border-emerald-100 dark:border-emerald-900/30">
                          <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">Company Income</p>
                          <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">{formatCurrency(totalPaid)}</p>
                          <p className="text-[10px] text-emerald-600/70 mt-1">From {formatCurrency(totalSale)} total sales</p>
                        </div>
                        <div className="bg-indigo-50 dark:bg-indigo-900/10 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-900/30">
                          <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1">Net Commission</p>
                          <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">{formatCurrency(totalEarned)}</p>
                          <p className="text-[10px] text-indigo-600/70 mt-1">At {selectedPartnerForDetails.commission}% slab</p>
                        </div>
                        <div className="bg-sky-50 dark:bg-sky-900/10 p-6 rounded-[2rem] border border-sky-100 dark:border-sky-900/30">
                          <p className="text-xs font-bold text-sky-600 uppercase tracking-widest mb-1">Total Payouts</p>
                          <p className="text-2xl font-bold text-sky-700 dark:text-sky-400">{formatCurrency(totalReceived)}</p>
                          <p className="text-[10px] text-sky-600/70 mt-1">Disbursed to partner</p>
                        </div>
                        <div className="bg-rose-50 dark:bg-rose-900/10 p-6 rounded-[2rem] border border-rose-100 dark:border-rose-900/30">
                          <p className="text-xs font-bold text-rose-600 uppercase tracking-widest mb-1">Balance Due</p>
                          <p className="text-2xl font-bold text-rose-700 dark:text-rose-400">{formatCurrency(totalDue)}</p>
                          <p className="text-[10px] text-rose-600/70 mt-1">Pending settlement</p>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                          <h3 className="font-bold text-slate-900 dark:text-white">Client-wise Breakdown</h3>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left">
                            <thead>
                              <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] uppercase tracking-widest font-bold text-slate-400">
                                <th className="px-6 py-4">Client</th>
                                <th className="px-6 py-4 text-right">Sale Value</th>
                                <th className="px-6 py-4 text-right">Paid to VNB</th>
                                <th className="px-6 py-4 text-right">Partner Earned</th>
                                <th className="px-6 py-4 text-right">Disbursed</th>
                                <th className="px-6 py-4 text-right">Due</th>
                                <th className="px-6 py-4 text-center">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                              {partnerClients.length === 0 ? (
                                <tr>
                                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400">No clients registered under this partner</td>
                                </tr>
                              ) : (
                                partnerClients.map(client => (
                                  <tr key={client.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                      <p className="text-sm font-bold text-slate-900 dark:text-white">{client.name}</p>
                                      <p className="text-[10px] text-slate-400">{client.id}</p>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-right">{formatCurrency(client.saleValue)}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-emerald-600 text-right">{formatCurrency(client.amountPaid)}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-indigo-600 text-right">{formatCurrency(client.commissionEarned)}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-sky-600 text-right">{formatCurrency(client.commissionReceived)}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-rose-600 text-right">{formatCurrency(client.balanceDue)}</td>
                                    <td className="px-6 py-4 text-center">
                                      <button 
                                        onClick={() => setShowPayoutModal({ clientId: client.id, partnerId: selectedPartnerForDetails.id })}
                                        className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 transition-all"
                                      >
                                        Add Payout
                                      </button>
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        {/* Payout Entry Modal */}
        {showPayoutModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[80] flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 animate-in fade-in zoom-in duration-200">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <IndianRupee className="w-6 h-6 text-indigo-600" />
                Manage Payouts & Incentives
              </h3>
              <form onSubmit={handleDisburse} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Payout Amount (₹)</label>
                    <input 
                      type="number"
                      required
                      value={payoutData.amount || ""}
                      onChange={(e) => setPayoutData({...payoutData, amount: Number(e.target.value)})}
                      className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-lg font-bold text-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Incentives (₹)</label>
                    <input 
                      type="number"
                      value={payoutData.incentives || ""}
                      onChange={(e) => setPayoutData({...payoutData, incentives: Number(e.target.value)})}
                      className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-lg font-bold text-emerald-600 focus:ring-2 focus:ring-indigo-500/20"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Incentive Status</label>
                  <select 
                    value={payoutData.incStatus}
                    onChange={(e) => setPayoutData({...payoutData, incStatus: e.target.value as any})}
                    className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl font-bold text-sm focus:ring-2 focus:ring-indigo-500/20"
                  >
                    <option value="N/A">N/A</option>
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Transaction ID</label>
                  <input 
                    type="text"
                    required
                    value={payoutData.txId}
                    onChange={(e) => setPayoutData({...payoutData, txId: e.target.value})}
                    className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl font-mono text-sm focus:ring-2 focus:ring-indigo-500/20"
                    placeholder="e.g. TXN987654321"
                  />
                </div>
                <div className="flex gap-4 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setShowPayoutModal(null)}
                    className="flex-1 py-4 text-slate-500 font-bold"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-200"
                  >
                    Update Funds
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl p-8 animate-in fade-in zoom-in duration-200">
              <div className="w-16 h-16 bg-rose-50 dark:bg-rose-900/20 rounded-2xl flex items-center justify-center text-rose-600 mb-6">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Delete Partner?</h2>
              <p className="text-slate-500 mb-8">This action cannot be undone. All data associated with this partner will be permanently removed.</p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="flex-1 px-6 py-3 bg-rose-600 text-white font-bold rounded-xl shadow-lg shadow-rose-200 dark:shadow-none hover:bg-rose-700 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {showForm && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
              <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {editingPartner ? "Update Partner Details" : "Partner Onboarding"}
                </h2>
                <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {createdCredentials ? (
                <div className="p-8 text-center animate-in slide-in-from-bottom duration-500">
                  <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-6">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Partner Onboarded!</h3>
                  <p className="text-slate-500 mb-8">Login credentials have been automatically generated.</p>
                  
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 mb-8 text-left space-y-4 border border-slate-100 dark:border-slate-800">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Login Email</label>
                      <p className="text-lg font-mono font-bold text-indigo-600 dark:text-indigo-400">{createdCredentials.email}</p>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Default Password</label>
                      <p className="text-lg font-mono font-bold text-indigo-600 dark:text-indigo-400">{createdCredentials.password}</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setShowForm(false)}
                    className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8 grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20" 
                      placeholder="e.g. Rahul Sharma" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20" 
                      placeholder="rahul@partner.com" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20" 
                      placeholder="+91 98765 43210" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Commission Slab (%)</label>
                    <div className="relative">
                      <Percent className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="number" 
                        step="0.1"
                        required
                        value={formData.commission}
                        onChange={(e) => setFormData({ ...formData, commission: parseFloat(e.target.value) })}
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20" 
                        placeholder="10.5" 
                      />
                    </div>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Office Location</label>
                    <input 
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20" 
                      placeholder="e.g. Mumbai, India"
                    />
                  </div>
                  <div className="col-span-2 flex items-center justify-end gap-4 mt-4">
                    <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 text-slate-500 font-semibold">Cancel</button>
                    <button type="submit" className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all">
                      {editingPartner ? "Save Changes" : "Create Account"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, ID or location..." 
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500/20 outline-none text-slate-900 dark:text-white"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {partners.map((partner) => {
                    const partnerClients = clients.filter(c => c.partnerId === partner.id);
                    const pSales = partnerClients.reduce((acc, c) => acc + Number(c.saleValue || 0), 0);
                    const pPaidToCompany = partnerClients.reduce((acc, c) => acc + Number(c.amountPaid || 0), 0);
                    const pCommReceived = partnerClients.reduce((acc, c) => acc + Number(c.commissionReceived || 0), 0);
                    const pDue = partnerClients.reduce((acc, c) => acc + Number(c.balanceDue || 0), 0);

                    return (
                      <div key={partner.id} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                        <div className="flex items-start justify-between mb-6">
                          <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                            {partner.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span className={cn(
                              "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                              partner.status === "Active" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400" : "bg-slate-100 text-slate-500"
                            )}>
                              {partner.status}
                            </span>
                            <div className="flex items-center gap-1">
                              <button 
                                onClick={() => handleOpenEdit(partner)}
                                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => setShowDeleteConfirm(partner.id)}
                                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 transition-colors">
                          {partner.name}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium tracking-wide mb-6">ID: {partner.id}</p>
                        
                        <div className="grid grid-cols-2 gap-4 mb-8">
                          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Company Income</p>
                            <p className="text-sm font-bold text-emerald-600">{formatCurrency(pPaidToCompany)}</p>
                          </div>
                          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Total Payouts</p>
                            <p className="text-sm font-bold text-indigo-600">{formatCurrency(pCommReceived)}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 py-6 border-t border-slate-50 dark:border-slate-800">
                          <div className="text-center">
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Clients</p>
                            <p className="text-base font-bold text-slate-900 dark:text-white">{partnerClients.length}</p>
                          </div>
                          <div className="text-center border-x border-slate-100 dark:border-slate-800">
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Comm Slab</p>
                            <p className="text-base font-bold text-slate-900 dark:text-white">{partner.commission}%</p>
                          </div>
                          <div className="text-center">
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Net Due</p>
                            <p className="text-base font-bold text-rose-600">{formatCurrency(pDue).split('.')[0]}</p>
                          </div>
                        </div>

                        <button 
                          onClick={() => setSelectedPartnerForDetails(partner)}
                          className="w-full mt-4 py-3.5 bg-slate-50 dark:bg-slate-800 group-hover:bg-indigo-600 group-hover:text-white rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          Manage Partner Funds
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
        </div>
      </div>
    </DashboardLayout>
  );
}
