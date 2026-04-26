"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Client {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  product: string;
  saleValue: number;
  amountPaid: number;
  clientTransactionId: string;
  commissionEarned: number;
  commissionReceived: number;
  commissionTransactionId?: string;
  payouts?: {
    id: string;
    amount: number;
    txId: string;
    date: string;
  }[];
  deduction: number;
  incentives: number;
  incentivesStatus: "Pending" | "Paid" | "N/A";
  balanceDue: number;
  date: string;
  status: "Active" | "Pending" | "Closed";
  partnerId: string;
}

interface ClientContextType {
  clients: Client[];
  addClient: (
    client: Omit<
      Client,
      | "id"
      | "date"
      | "status"
      | "commissionEarned"
      | "deduction"
      | "balanceDue"
      | "clientTransactionId"
      | "commissionReceived"
      | "commissionTransactionId"
      | "incentives"
      | "incentivesStatus"
    >,
    commissionRate: number,
  ) => void;
  updateClient: (
    id: string,
    data: Partial<Client>,
    commissionRate?: number,
  ) => void;
  deleteClient: (id: string) => void;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

const INITIAL_CLIENTS: Client[] = [
  {
    id: "CL001",
    name: "Modern Tech Solutions",
    contactPerson: "Rahul",
    email: "rahul@modern.com",
    phone: "9876543210",
    product: "Software",
    saleValue: 450000,
    amountPaid: 450000,
    clientTransactionId: "tx-001",
    commissionEarned: 47250,
    commissionReceived: 0,
    commissionTransactionId: "",
    deduction: 2500,
    incentives: 0,
    incentivesStatus: "N/A",
    balanceDue: 44750,
    date: "22 Apr, 2024",
    status: "Active",
    partnerId: "p-001",
  },
  {
    id: "CL002",
    name: "Green Valley Resort",
    contactPerson: "Priya",
    email: "priya@green.com",
    phone: "9876543211",
    product: "Consulting",
    saleValue: 280000,
    amountPaid: 280000,
    clientTransactionId: "tx-002",
    commissionEarned: 29400,
    commissionReceived: 0,
    commissionTransactionId: "",
    deduction: 1500,
    incentives: 0,
    incentivesStatus: "N/A",
    balanceDue: 27900,
    date: "18 Apr, 2024",
    status: "Pending",
    partnerId: "p-001",
  },
];

export function ClientProvider({ children }: { children: React.ReactNode }) {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const savedClients = localStorage.getItem("vnb-clients");
    if (savedClients) {
      setTimeout(() => setClients(JSON.parse(savedClients)), 0);
    } else {
      setTimeout(() => {
        setClients(INITIAL_CLIENTS);
        localStorage.setItem("vnb-clients", JSON.stringify(INITIAL_CLIENTS));
      }, 0);
    }
  }, []);

  const addClient = (data: any, commissionRate: number) => {
    const amountPaid = data.amountPaid || 0;
    const commissionEarned = (amountPaid * commissionRate) / 100;
    const deduction = commissionEarned * 0.05; // 5% TDS
    const balanceDue = commissionEarned - deduction;

    const newClient: Client = {
      ...data,
      id: `CL${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Active",
      amountPaid,
      clientTransactionId: data.clientTransactionId || "",
      commissionEarned,
      commissionReceived: 0,
      commissionTransactionId: "",
      deduction,
      incentives: 0,
      incentivesStatus: "N/A",
      balanceDue,
    };

    const newClients = [...clients, newClient];
    setClients(newClients);
    localStorage.setItem("vnb-clients", JSON.stringify(newClients));
  };

  const updateClient = (
    id: string,
    data: Partial<Client>,
    commissionRate?: number,
  ) => {
    const updatedClients = clients.map((c) => {
      if (c.id === id) {
        const updated = { ...c, ...data };

        // If amountPaid changed and we have a commissionRate, recalculate commission
        if (data.amountPaid !== undefined && commissionRate !== undefined) {
          updated.commissionEarned =
            (updated.amountPaid * commissionRate) / 100;
          updated.deduction = updated.commissionEarned * 0.05; // 5% TDS
        }

        // Always re-calculate balance due
        updated.balanceDue =
          (updated.commissionEarned || 0) -
          (updated.deduction || 0) -
          (updated.commissionReceived || 0);

        return updated;
      }
      return c;
    });
    setClients(updatedClients);
    localStorage.setItem("vnb-clients", JSON.stringify(updatedClients));
  };

  const deleteClient = (id: string) => {
    const filtered = clients.filter((c) => c.id !== id);
    setClients(filtered);
    localStorage.setItem("vnb-clients", JSON.stringify(filtered));
  };

  return (
    <ClientContext.Provider
      value={{ clients, addClient, updateClient, deleteClient }}
    >
      {children}
    </ClientContext.Provider>
  );
}

export function useClientContext() {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error("useClientContext must be used within a ClientProvider");
  }
  return context;
}
