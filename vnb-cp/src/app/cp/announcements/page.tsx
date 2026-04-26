"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Bell, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  AlertTriangle 
} from "lucide-react";
import { useAnnouncementContext } from "@/context/AnnouncementContext";
import { usePartnerContext } from "@/context/PartnerContext";
import { getSession } from "@/lib/auth-mock";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function CPAnnouncements() {
  const { announcements } = useAnnouncementContext();
  const { partners } = usePartnerContext();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    setSession(getSession());
  }, []);

  const currentPartner = partners.find(p => p.email === session?.email);
  
  const filteredAnnouncements = announcements.filter(ann => 
    ann.targetPartners?.includes("all") || 
    (currentPartner && ann.targetPartners?.includes(currentPartner.id))
  );

  return (
    <DashboardLayout role="cp">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">System Updates</h1>
          <p className="text-slate-500">Stay informed about the latest changes and announcements</p>
        </div>

        <div className="grid grid-cols-1 gap-6 max-w-4xl">
          {filteredAnnouncements.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 p-20 rounded-[2.5rem] border border-dashed border-slate-200 dark:border-slate-800 text-center">
              <Bell className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-400">No announcements for you at this time.</p>
            </div>
          ) : (
            filteredAnnouncements.map((ann) => (
              <div key={ann.id} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex items-start gap-6 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0",
                  ann.type === 'urgent' ? "bg-rose-50 text-rose-600" : 
                  ann.type === 'warning' ? "bg-amber-50 text-amber-600" :
                  ann.type === 'success' ? "bg-emerald-50 text-emerald-600" : "bg-indigo-50 text-indigo-600"
                )}>
                  {ann.type === 'urgent' ? <AlertCircle className="w-7 h-7" /> : 
                   ann.type === 'warning' ? <AlertTriangle className="w-7 h-7" /> :
                   ann.type === 'success' ? <CheckCircle2 className="w-7 h-7" /> : <Info className="w-7 h-7" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">{ann.title}</h3>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">{ann.date}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{ann.content}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
