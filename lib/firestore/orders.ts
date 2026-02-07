import { db } from "../firebase";
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  setDoc, 
  updateDoc,
  query,
  orderBy,
  where,
  Timestamp
} from "firebase/firestore";
import { Order, OrderStatus } from "../orders";

const COLLECTION_NAME = "orders";

export async function getOrders(statusFilter?: OrderStatus): Promise<Order[]> {
  try {
    let q;
    if (statusFilter) {
      q = query(
        collection(db, COLLECTION_NAME),
        where("status", "==", statusFilter),
        orderBy("createdAt", "desc")
      );
    } else {
      q = query(
        collection(db, COLLECTION_NAME),
        orderBy("createdAt", "desc")
      );
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    } as Order));
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

export async function getOrder(orderId: string): Promise<Order | undefined> {
  try {
    const docRef = doc(db, COLLECTION_NAME, orderId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Order;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error("Error fetching order:", error);
    return undefined;
  }
}

export async function createOrder(order: Omit<Order, 'id'>): Promise<string> {
  try {
    const orderId = `ORD-${Date.now()}`;
    const docRef = doc(db, COLLECTION_NAME, orderId);
    
    await setDoc(docRef, {
      ...order,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    
    return orderId;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, orderId);
    await updateDoc(docRef, {
      status,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
}

export async function updateOrder(orderId: string, data: Partial<Order>): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, orderId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
}
