"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Bell, 
  Plus, 
  Trash2, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  AlertTriangle 
} from "lucide-react";
import { useState } from "react";
import { useAnnouncementContext, Announcement } from "@/context/AnnouncementContext";
import { usePartnerContext } from "@/context/PartnerContext";
import { cn } from "@/lib/utils";

export default function AdminAnnouncements() {
  const { announcements, addAnnouncement, deleteAnnouncement } = useAnnouncementContext();
  const { partners } = usePartnerContext();
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Omit<Announcement, "id" | "date">>({
    title: "",
    content: "",
    type: "info",
    targetPartners: ["all"]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAnnouncement(formData);
    setFormData({ title: "", content: "", type: "info", targetPartners: ["all"] });
    setShowAddForm(false);
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">System Announcements</h1>
            <p className="text-slate-500">Manage global updates for all Channel Partners</p>
          </div>
          <button 
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-xl shadow-indigo-200 dark:shadow-none"
          >
            <Plus className="w-5 h-5" />
            New Announcement
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl p-8 animate-in fade-in slide-in-from-top-4 duration-300">
            <h2 className="text-xl font-bold mb-6">Create Announcement</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600 uppercase">Title</label>
                  <input 
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500/20"
                    placeholder="e.g. System Maintenance"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600 uppercase">Priority / Type</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                    className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500/20"
                  >
                    <option value="info">Information (Blue)</option>
                    <option value="success">Success (Green)</option>
                    <option value="warning">Warning (Amber)</option>
                    <option value="urgent">Urgent (Red)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-600 uppercase">Target Audience</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, targetPartners: ["all"]})}
                    className={cn(
                      "px-4 py-3 rounded-xl text-xs font-bold border-2 transition-all",
                      formData.targetPartners.includes("all") 
                        ? "bg-indigo-600 border-indigo-600 text-white" 
                        : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500 hover:border-indigo-200"
                    )}
                  >
                    All Partners
                  </button>
                  {partners.map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        let newTargets = [...formData.targetPartners].filter(t => t !== "all");
                        if (newTargets.includes(p.id)) {
                          newTargets = newTargets.filter(t => t !== p.id);
                          if (newTargets.length === 0) newTargets = ["all"];
                        } else {
                          newTargets.push(p.id);
                        }
                        setFormData({...formData, targetPartners: newTargets});
                      }}
                      className={cn(
                        "px-4 py-3 rounded-xl text-xs font-bold border-2 transition-all overflow-hidden text-ellipsis whitespace-nowrap",
                        formData.targetPartners.includes(p.id) 
                          ? "bg-indigo-600 border-indigo-600 text-white" 
                          : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500 hover:border-indigo-200"
                      )}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600 uppercase">Content</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="Describe the update in detail..."
                />
              </div>
              <div className="flex items-center gap-4">
                <button type="submit" className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold">Post Announcement</button>
                <button 
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-8 py-4 text-slate-500 font-bold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          {announcements.map((ann) => (
            <div key={ann.id} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex items-start justify-between group">
              <div className="flex items-start gap-6">
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
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{ann.title}</h3>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                      ann.type === 'urgent' ? "bg-rose-50 text-rose-600" : 
                      ann.type === 'warning' ? "bg-amber-50 text-amber-600" :
                      ann.type === 'success' ? "bg-emerald-50 text-emerald-600" : "bg-indigo-50 text-indigo-600"
                    )}>
                      {ann.type}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed mb-4">{ann.content}</p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{ann.date}</p>
                </div>
              </div>
              <button 
                onClick={() => deleteAnnouncement(ann.id)}
                className="p-3 text-slate-300 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
