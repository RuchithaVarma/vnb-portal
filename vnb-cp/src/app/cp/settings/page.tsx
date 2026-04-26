"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Lock, 
  ShieldCheck, 
  Key, 
  Save, 
  Loader2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useState, useEffect } from "react";
import { getSession, updatePassword } from "@/lib/auth-mock";

export default function CPSettings() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  useEffect(() => {
    setSession(getSession());
  }, []);

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (passwords.new !== passwords.confirm) {
      setError("New passwords do not match");
      return;
    }

    if (passwords.new.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (session) {
        updatePassword(session.email, passwords.new);
        setSuccess(true);
        setPasswords({ current: "", new: "", confirm: "" });
      }
      setLoading(false);
    }, 1500);
  };

  if (!session) return null;

  return (
    <DashboardLayout role="cp">
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Account Settings</h1>
          <p className="text-slate-500">Manage your profile and security preferences</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center text-indigo-600">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Security & Password</h2>
              <p className="text-sm text-slate-500">Update your login credentials</p>
            </div>
          </div>

          <form onSubmit={handleUpdatePassword} className="p-8 space-y-6">
            {success && (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl flex items-center gap-3 text-emerald-600">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-semibold">Password updated successfully!</span>
              </div>
            )}

            {error && (
              <div className="p-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-900/30 rounded-2xl flex items-center gap-3 text-rose-600">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm font-semibold">{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Current Password</label>
              <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="password" 
                  required
                  value={passwords.current}
                  onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">New Password</label>
                <input 
                  type="password" 
                  required
                  value={passwords.new}
                  onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20" 
                  placeholder="Min. 6 chars" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Confirm New Password</label>
                <input 
                  type="password" 
                  required
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20" 
                  placeholder="Repeat new password" 
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-400">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs">Secure encryption active</span>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all disabled:opacity-70"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Update Password
              </button>
            </div>
          </form>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Password Requirements</h3>
          <ul className="text-xs text-slate-500 space-y-2 list-disc pl-4">
            <li>Minimum 6 characters long</li>
            <li>Should be different from your current password</li>
            <li>We recommend including numbers and special characters</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
