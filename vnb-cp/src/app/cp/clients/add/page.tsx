"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  UserPlus, 
  ArrowLeft, 
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Building2,
  User,
  Mail,
  Phone,
  IndianRupee
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useClientContext } from "@/context/ClientContext";
import { usePartnerContext } from "@/context/PartnerContext";
import { getSession } from "@/lib/auth-mock";
import { useRouter } from "next/navigation";

export default function AddClient() {
  const [loading, setLoading] = useState(false);
  const { addClient } = useClientContext();
  const { partners } = usePartnerContext();
  const [session, setSession] = useState<any>(null);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    product: "General Partnership",
    saleValue: 0,
    amountPaid: 0
  });

  useEffect(() => {
    setSession(getSession());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;
    
    setLoading(true);
    
    // Find partner to get commission rate
    const partner = partners.find(p => p.email === session.email);
    const rate = partner?.commission || 10;

    setTimeout(() => {
      addClient({
        name: formData.name,
        contactPerson: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
        product: formData.product,
        saleValue: Number(formData.saleValue),
        amountPaid: Number(formData.amountPaid),
        partnerId: partner?.id || "p-001"
      }, rate);
      
      setLoading(false);
      router.push("/cp/clients");
    }, 1500);
  };

  return (
    <DashboardLayout role="cp">
      <div className="max-w-2xl mx-auto space-y-8 pb-12">
        <div className="flex items-center gap-4">
          <Link href="/cp/clients" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
            <ArrowLeft className="w-5 h-5 text-slate-500" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Register New Client</h1>
            <p className="text-slate-500">Add a new client to your network</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden p-8 md:p-12">
          <div className="mb-10 flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 dark:shadow-none">
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Client Information</h2>
              <p className="text-sm text-slate-500">Provide basic contact details</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Client / Company Name</label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20 text-slate-900 dark:text-white" 
                  placeholder="e.g. Global Tech Inc." 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Contact Person</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20 text-slate-900 dark:text-white" 
                    placeholder="John Doe" 
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20 text-slate-900 dark:text-white" 
                    placeholder="client@example.com" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20 text-slate-900 dark:text-white" 
                    placeholder="+91 98765 43210" 
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-400">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span className="text-xs font-medium">Verified Registration</span>
              </div>
              <button 
                type="submit" 
                disabled={loading} 
                className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all flex items-center gap-2 disabled:opacity-70 active:scale-95"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                Register Client
              </button>
            </div>
          </form>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-start gap-4">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            By registering this client, you confirm that you have obtained necessary consent to store their information. 
            Sale and commission details can be updated later from the client management console.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
