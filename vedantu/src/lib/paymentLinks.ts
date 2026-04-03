import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";
import * as FirebaseFirestore from "firebase/firestore";

export interface PaymentLinkData {
  id: string;
  courseId: string;
  courseName: string;
  amount: number;
  currency: string;
  expiryDate?: string;
  maxUses?: number;
  currentUses: number;
  isActive: boolean;
  createdAt: FirebaseFirestore.Timestamp | Date | FirebaseFirestore.FieldValue;
  updatedAt: FirebaseFirestore.Timestamp | Date | FirebaseFirestore.FieldValue;
  customMessage?: string;
  createdBy?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Create a new payment link
 */
export async function createPaymentLink(
  linkData: Omit<
    PaymentLinkData,
    "id" | "createdAt" | "updatedAt" | "currentUses"
  >,
): Promise<string> {
  const linkId = "pl_" + Math.random().toString(36).substr(2, 9);

  const newLink: PaymentLinkData = {
    ...linkData,
    id: linkId,
    currentUses: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await setDoc(doc(db, "paymentLinks", linkId), newLink);
  return linkId;
}

/**
 * Get payment link by ID
 */
export async function getPaymentLink(
  linkId: string,
): Promise<PaymentLinkData | null> {
  try {
    const linkDoc = await getDoc(doc(db, "paymentLinks", linkId));

    if (linkDoc.exists()) {
      return { id: linkDoc.id, ...linkDoc.data() } as PaymentLinkData;
    }

    return null;
  } catch (error) {
    console.error("Error fetching payment link:", error);
    return null;
  }
}

/**
 * Validate payment link (check expiry, usage, etc.)
 */
export async function validatePaymentLink(linkId: string): Promise<{
  valid: boolean;
  link?: PaymentLinkData;
  reason?: string;
}> {
  try {
    const link = await getPaymentLink(linkId);

    if (!link) {
      return { valid: false, reason: "Payment link not found" };
    }

    // Check if link is active
    if (!link.isActive) {
      return { valid: false, reason: "Payment link has been deactivated" };
    }

    // Check expiry
    if (link.expiryDate && new Date(link.expiryDate) < new Date()) {
      return { valid: false, reason: "Payment link has expired" };
    }

    // Check usage limit
    if (link.maxUses && link.currentUses >= link.maxUses) {
      return {
        valid: false,
        reason: "Payment link has reached maximum usage limit",
      };
    }

    return { valid: true, link };
  } catch (error) {
    console.error("Error validating payment link:", error);
    return { valid: false, reason: "Failed to validate payment link" };
  }
}

/**
 * Increment usage count for a payment link
 */
export async function incrementLinkUsage(linkId: string): Promise<void> {
  try {
    const linkRef = doc(db, "paymentLinks", linkId);
    const linkDoc = await getDoc(linkRef);

    if (linkDoc.exists()) {
      const currentUses = linkDoc.data().currentUses || 0;
      await updateDoc(linkRef, {
        currentUses: currentUses + 1,
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error("Error incrementing link usage:", error);
  }
}

/**
 * Deactivate a payment link
 */
export async function deactivatePaymentLink(linkId: string): Promise<void> {
  try {
    const linkRef = doc(db, "paymentLinks", linkId);
    await updateDoc(linkRef, {
      isActive: false,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error deactivating payment link:", error);
  }
}

/**
 * Get all payment links for a course
 */
export async function getCoursePaymentLinks(
  courseId: string,
): Promise<PaymentLinkData[]> {
  try {
    const linksQuery = query(
      collection(db, "paymentLinks"),
      where("courseId", "==", courseId),
    );

    const querySnapshot = await getDocs(linksQuery);
    const links: PaymentLinkData[] = [];

    querySnapshot.forEach((doc) => {
      links.push({ id: doc.id, ...doc.data() } as PaymentLinkData);
    });

    return links.sort((a, b) => {
      let aTime: number;
      let bTime: number;

      if (a.createdAt instanceof FirebaseFirestore.Timestamp) {
        aTime = a.createdAt.toMillis();
      } else if (a.createdAt instanceof Date) {
        aTime = a.createdAt.getTime();
      } else {
        // FieldValue case - skip sorting or use a default
        aTime = 0;
      }

      if (b.createdAt instanceof FirebaseFirestore.Timestamp) {
        bTime = b.createdAt.toMillis();
      } else if (b.createdAt instanceof Date) {
        bTime = b.createdAt.getTime();
      } else {
        // FieldValue case - skip sorting or use a default
        bTime = 0;
      }

      return bTime - aTime;
    });
  } catch (error) {
    console.error("Error fetching course payment links:", error);
    return [];
  }
}

/**
 * Get all payment links created by a user
 */
export async function getUserPaymentLinks(
  userId: string,
): Promise<PaymentLinkData[]> {
  try {
    const linksQuery = query(
      collection(db, "paymentLinks"),
      where("createdBy", "==", userId),
    );

    const querySnapshot = await getDocs(linksQuery);
    const links: PaymentLinkData[] = [];

    querySnapshot.forEach((doc) => {
      links.push({ id: doc.id, ...doc.data() } as PaymentLinkData);
    });

    return links.sort((a, b) => {
      let aTime: number;
      let bTime: number;

      if (a.createdAt instanceof FirebaseFirestore.Timestamp) {
        aTime = a.createdAt.toMillis();
      } else if (a.createdAt instanceof Date) {
        aTime = a.createdAt.getTime();
      } else {
        // FieldValue case - skip sorting or use a default
        aTime = 0;
      }

      if (b.createdAt instanceof FirebaseFirestore.Timestamp) {
        bTime = b.createdAt.toMillis();
      } else if (b.createdAt instanceof Date) {
        bTime = b.createdAt.getTime();
      } else {
        // FieldValue case - skip sorting or use a default
        bTime = 0;
      }

      return bTime - aTime;
    });
  } catch (error) {
    console.error("Error fetching user payment links:", error);
    return [];
  }
}

/**
 * Update payment link
 */
export async function updatePaymentLink(
  linkId: string,
  updates: Partial<PaymentLinkData>,
): Promise<void> {
  try {
    const linkRef = doc(db, "paymentLinks", linkId);
    await updateDoc(linkRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating payment link:", error);
  }
}

/**
 * Delete a payment link
 */

export async function deletePaymentLink(linkId: string): Promise<void> {
  try {
    await setDoc(
      doc(db, "paymentLinks", linkId),
      {
        isActive: false,
        deleted: true,
        deletedAt: serverTimestamp(),
      },
      { merge: true },
    );
  } catch (error) {
    console.error("Error deleting payment link:", error);
  }
}

/**
 * Generate payment URL
 */
export function generatePaymentUrl(linkId: string, baseUrl?: string): string {
  const base =
    baseUrl || (typeof window !== "undefined" ? window.location.origin : "");
  return `${base}/pay/${linkId}`;
}

/**
 * Check if payment link is expiring soon (within 24 hours)
 */
export function isLinkExpiringSoon(link: PaymentLinkData): boolean {
  if (!link.expiryDate) return false;

  const now = new Date();
  const expiry = new Date(link.expiryDate);
  const timeUntilExpiry = expiry.getTime() - now.getTime();
  const twentyFourHours = 24 * 60 * 60 * 1000;

  return timeUntilExpiry > 0 && timeUntilExpiry <= twentyFourHours;
}

/**
 * Get payment link statistics
 */
export async function getPaymentLinkStats(linkId: string): Promise<{
  totalUses: number;
  uniqueUsers: number;
  conversionRate: number;
  revenueGenerated: number;
}> {
  // This would typically query payment records associated with the link
  // For now, return mock data
  return {
    totalUses: 0,
    uniqueUsers: 0,
    conversionRate: 0,
    revenueGenerated: 0,
  };
}
