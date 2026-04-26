"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, UserRole } from "@/lib/auth-mock";
import { Shield, Users, ArrowRight, Loader2, Sparkles, Building2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [role, setRole] = useState<UserRole>("cp");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      const user = login(email, password, role);
      if (user) {
        router.push(role === "admin" ? "/admin/dashboard" : "/cp/dashboard");
      } else {
        setError("Invalid credentials. Please check your email and password.");
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-sky-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-purple-600/10 rounded-full blur-[80px]" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px] pointer-events-none" />

      <div className="w-full max-w-[1100px] grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Side: Brand & Value Prop */}
        <div className="hidden lg:flex flex-col space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-2xl shadow-indigo-500/20">
              V
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">VNB Portal</span>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl font-black text-white leading-tight">
              Empowering your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">
                Partner Growth
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-md leading-relaxed">
              Real-time analytics, automated commissions, and seamless client management in one unified platform.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-8">
            {[
              { icon: Sparkles, text: "Dynamic Analytics" },
              { icon: Building2, text: "Partner Network" },
              { icon: Lock, text: "Secure Payouts" },
              { icon: Users, text: "Client Portfolio" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-indigo-400" />
                </div>
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Login Card */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 p-10 rounded-[3rem] shadow-2xl relative">
            <div className="lg:hidden mb-8 flex justify-center">
               <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl">V</div>
            </div>
            
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Access Your Portal</h2>
              <p className="text-slate-400 text-sm">Welcome back! Please enter your details.</p>
            </div>

            {/* Role Switcher */}
            <div className="flex bg-slate-950/50 p-1.5 rounded-2xl mb-8 border border-white/5">
              <button
                onClick={() => setRole("cp")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-300 text-sm font-bold",
                  role === "cp" 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" 
                    : "text-slate-500 hover:text-slate-300"
                )}
              >
                <Users className="w-4 h-4" />
                Partner
              </button>
              <button
                onClick={() => setRole("admin")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-300 text-sm font-bold",
                  role === "admin" 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" 
                    : "text-slate-500 hover:text-slate-300"
                )}
              >
                <Shield className="w-4 h-4" />
                Admin
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={role === "admin" ? "admin@vnb.com" : "john@partner.com"}
                  className="w-full px-5 py-4 bg-slate-950/50 border border-white/10 rounded-2xl focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all outline-none text-white placeholder:text-slate-600"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                    Password
                  </label>
                  <button type="button" className="text-[10px] text-indigo-400 font-bold hover:text-indigo-300 uppercase tracking-widest">Forgot?</button>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-950/50 border border-white/10 rounded-2xl focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all outline-none text-white placeholder:text-slate-600"
                />
              </div>

              {error && (
                <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center gap-3 text-rose-500 text-xs font-bold animate-in fade-in slide-in-from-top-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 px-6 rounded-2xl shadow-2xl shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                {loading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    Sign In to Portal
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-white/5 flex flex-col items-center gap-4">
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em]">Secured by VNB Enterprise</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { AlertCircle } from "lucide-react";
