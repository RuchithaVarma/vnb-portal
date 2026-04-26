"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Partner {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  commission: number;
  clients: number;
  status: "Active" | "Pending" | "Inactive";
  totalSales?: number;
  earned?: number;
  incentives?: number;
  balance?: number;
  monthlySales?: { month: string; amount: number }[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "cp";
  partnerId?: string;
}

interface PartnerContextType {
  partners: Partner[];
  addPartner: (partner: Omit<Partner, "id" | "clients" | "status">) => void;
  updatePartner: (id: string, updates: Partial<Partner>) => void;
  deletePartner: (id: string) => void;
}

const PartnerContext = createContext<PartnerContextType | undefined>(undefined);

const INITIAL_PARTNERS: Partner[] = [
  { 
    id: "CP-2024-001", name: "Rahul Sharma", email: "rahul@partner.com", phone: "+91 98765 00001", location: "Mumbai", commission: 12.5, clients: 12, status: "Active", 
    totalSales: 1250000, earned: 156250, incentives: 25000, balance: 45000,
    monthlySales: [
      { month: "Jan", amount: 120000 }, { month: "Feb", amount: 150000 }, { month: "Mar", amount: 180000 }, { month: "Apr", amount: 200000 }
    ]
  },
  { 
    id: "CP-2024-002", name: "Priya Patel", email: "priya@partner.com", phone: "+91 98765 00002", location: "Delhi", commission: 10.0, clients: 24, status: "Active", 
    totalSales: 980000, earned: 98000, incentives: 15000, balance: 12000,
    monthlySales: [
      { month: "Jan", amount: 80000 }, { month: "Feb", amount: 95000 }, { month: "Mar", amount: 110000 }, { month: "Apr", amount: 130000 }
    ]
  },
  { 
    id: "CP-2024-003", name: "Amit Kumar", email: "amit@partner.com", phone: "+91 98765 00003", location: "Bangalore", commission: 15.0, clients: 36, status: "Active", 
    totalSales: 2100000, earned: 315000, incentives: 50000, balance: 85000,
    monthlySales: [
      { month: "Jan", amount: 250000 }, { month: "Feb", amount: 280000 }, { month: "Mar", amount: 310000 }, { month: "Apr", amount: 350000 }
    ]
  },
  { 
    id: "CP-2024-004", name: "Sneha Reddy", email: "sneha@partner.com", phone: "+91 98765 00004", location: "Hyderabad", commission: 8.5, clients: 48, status: "Active", 
    totalSales: 540000, earned: 45900, incentives: 5000, balance: 8000,
    monthlySales: [
      { month: "Jan", amount: 45000 }, { month: "Feb", amount: 55000 }, { month: "Mar", amount: 65000 }, { month: "Apr", amount: 75000 }
    ]
  },
];

export function PartnerProvider({ children }: { children: React.ReactNode }) {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    const savedPartners = localStorage.getItem("vnb-partners");
    if (savedPartners) {
      setPartners(JSON.parse(savedPartners));
    } else {
      setPartners(INITIAL_PARTNERS);
      localStorage.setItem("vnb-partners", JSON.stringify(INITIAL_PARTNERS));
    }
  }, []);

  const savePartners = (newPartners: Partner[]) => {
    setPartners(newPartners);
    localStorage.setItem("vnb-partners", JSON.stringify(newPartners));
  };

  const addPartner = (data: Omit<Partner, "id" | "clients" | "status">) => {
    const id = `CP-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const newPartner: Partner = {
      ...data,
      id,
      clients: 0,
      status: "Active",
      totalSales: 0,
      earned: 0,
      incentives: 0,
      balance: 0,
      monthlySales: [
        { month: "Jan", amount: 0 }, { month: "Feb", amount: 0 }, { month: "Mar", amount: 0 }, { month: "Apr", amount: 0 }
      ]
    };

    const newPartners = [...partners, newPartner];
    savePartners(newPartners);

    // Automatically create login credentials
    const dynamicUsers = JSON.parse(localStorage.getItem("vnb-dynamic-users") || "[]");
    const newUser: User = {
      id: `user-${id}`,
      name: data.name,
      email: data.email,
      role: "cp",
      partnerId: id
    };
    localStorage.setItem("vnb-dynamic-users", JSON.stringify([...dynamicUsers, newUser]));
  };

  const updatePartner = (id: string, updates: Partial<Partner>) => {
    const newPartners = partners.map(p => p.id === id ? { ...p, ...updates } : p);
    savePartners(newPartners);

    // Update login credentials if email or name changed
    if (updates.email || updates.name) {
      const dynamicUsers = JSON.parse(localStorage.getItem("vnb-dynamic-users") || "[]");
      const updatedUsers = dynamicUsers.map((u: User) => 
        u.partnerId === id ? { ...u, ...(updates.name && { name: updates.name }), ...(updates.email && { email: updates.email }) } : u
      );
      localStorage.setItem("vnb-dynamic-users", JSON.stringify(updatedUsers));
    }
  };

  const deletePartner = (id: string) => {
    const newPartners = partners.filter(p => p.id !== id);
    savePartners(newPartners);

    // Remove login credentials
    const dynamicUsers = JSON.parse(localStorage.getItem("vnb-dynamic-users") || "[]");
    const updatedUsers = dynamicUsers.filter((u: User) => u.partnerId !== id);
    localStorage.setItem("vnb-dynamic-users", JSON.stringify(updatedUsers));
  };

  return (
    <PartnerContext.Provider value={{ partners, addPartner, updatePartner, deletePartner }}>
      {children}
    </PartnerContext.Provider>
  );
}

export function usePartnerContext() {
  const context = useContext(PartnerContext);
  if (context === undefined) {
    throw new Error("usePartnerContext must be used within a PartnerProvider");
  }
  return context;
}
