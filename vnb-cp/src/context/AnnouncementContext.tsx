"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: "info" | "warning" | "success" | "urgent";
  date: string;
  targetPartners: string[]; // ['all'] or array of partner IDs
}

interface AnnouncementContextType {
  announcements: Announcement[];
  addAnnouncement: (announcement: Omit<Announcement, "id" | "date">) => void;
  deleteAnnouncement: (id: string) => void;
}

const AnnouncementContext = createContext<AnnouncementContextType | undefined>(undefined);

const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-1",
    title: "Bonus Commission Week",
    content: "Register 3 new sales this week to unlock a 2% bonus incentive on total portfolio value.",
    type: "info",
    date: "26 Apr, 2024"
  },
  {
    id: "ann-2",
    title: "Portal Update v2.0",
    content: "We have upgraded the dashboard to include real-time payment tracking and automated commission calculations.",
    type: "success",
    date: "25 Apr, 2024"
  }
];

export function AnnouncementProvider({ children }: { children: React.ReactNode }) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("vnb-announcements");
    if (saved) {
      setAnnouncements(JSON.parse(saved));
    } else {
      setAnnouncements(INITIAL_ANNOUNCEMENTS);
      localStorage.setItem("vnb-announcements", JSON.stringify(INITIAL_ANNOUNCEMENTS));
    }
  }, []);

  const addAnnouncement = (data: Omit<Announcement, "id" | "date">) => {
    const newAnn: Announcement = {
      ...data,
      id: `ann-${Math.floor(Math.random() * 10000)}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    };
    const updated = [newAnn, ...announcements];
    setAnnouncements(updated);
    localStorage.setItem("vnb-announcements", JSON.stringify(updated));
  };

  const deleteAnnouncement = (id: string) => {
    const updated = announcements.filter(a => a.id !== id);
    setAnnouncements(updated);
    localStorage.setItem("vnb-announcements", JSON.stringify(updated));
  };

  return (
    <AnnouncementContext.Provider value={{ announcements, addAnnouncement, deleteAnnouncement }}>
      {children}
    </AnnouncementContext.Provider>
  );
}

export function useAnnouncementContext() {
  const context = useContext(AnnouncementContext);
  if (context === undefined) {
    throw new Error("useAnnouncementContext must be used within an AnnouncementProvider");
  }
  return context;
}
