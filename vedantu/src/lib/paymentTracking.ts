import { db } from "./firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

export interface PaymentRecord {
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  courseId: string;
  courseName: string;
  amount: number;
  currency: string;
  razorpayPaymentId: string;
  razorpayOrderId?: string;
  razorpaySignature?: string;
  status: "pending" | "success" | "failed" | "refunded";
  paymentMethod?: string;
  createdAt: Date | ReturnType<typeof serverTimestamp>;
  updatedAt: Date | ReturnType<typeof serverTimestamp>;
  metadata?: Record<string, unknown>;
}

export async function createPaymentRecord(
  data: Omit<PaymentRecord, "createdAt" | "updatedAt">,
): Promise<string> {
  try {
    const paymentData = {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "payments"), paymentData);
    console.log("Payment record created:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error creating payment record:", error);
    throw error;
  }
}

export async function updatePaymentRecord(
  paymentId: string,
  updates: Partial<PaymentRecord>,
): Promise<void> {
  try {
    const paymentRef = doc(db, "payments", paymentId);
    await updateDoc(paymentRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
    console.log("Payment record updated:", paymentId);
  } catch (error) {
    console.error("Error updating payment record:", error);
    throw error;
  }
}

export async function getPaymentRecord(
  paymentId: string,
): Promise<PaymentRecord | null> {
  try {
    const paymentRef = doc(db, "payments", paymentId);
    const paymentSnap = await getDoc(paymentRef);

    if (paymentSnap.exists()) {
      return paymentSnap.data() as PaymentRecord;
    }
    return null;
  } catch (error) {
    console.error("Error getting payment record:", error);
    throw error;
  }
}

export async function getUserPayments(
  userId: string,
): Promise<PaymentRecord[]> {
  try {
    const paymentsRef = collection(db, "payments");
    const q = query(paymentsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => doc.data() as PaymentRecord);
  } catch (error) {
    console.error("Error getting user payments:", error);
    throw error;
  }
}

export async function getPaymentsByEmail(
  email: string,
): Promise<(PaymentRecord & { id: string })[]> {
  try {
    const paymentsRef = collection(db, "payments");
    const q = query(paymentsRef, where("userEmail", "==", email));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as PaymentRecord),
    }));
  } catch (error) {
    console.error("Error getting payments by email:", error);
    return [];
  }
}

export async function getCoursePayments(
  courseId: string,
): Promise<PaymentRecord[]> {
  try {
    const paymentsRef = collection(db, "payments");
    const q = query(paymentsRef, where("courseId", "==", courseId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => doc.data() as PaymentRecord);
  } catch (error) {
    console.error("Error getting course payments:", error);
    throw error;
  }
}

export async function verifyPaymentExists(
  razorpayPaymentId: string,
): Promise<boolean> {
  try {
    const paymentsRef = collection(db, "payments");
    const q = query(
      paymentsRef,
      where("razorpayPaymentId", "==", razorpayPaymentId),
    );
    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error verifying payment:", error);
    return false;
  }
}

export async function getAllPayments(): Promise<(PaymentRecord & { id: string })[]> {
  try {
    const paymentsRef = collection(db, "payments");
    const querySnapshot = await getDocs(paymentsRef);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as PaymentRecord),
    }));
  } catch (error) {
    console.error("Error getting all payments:", error);
    throw error;
  }
}
