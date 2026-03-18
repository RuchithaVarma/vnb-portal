import { db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import seedData from "@/data/seed-data.json";

// Generic function to get items
export const getItems = async <T>(collectionName: string): Promise<T[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as T[];
  } catch (error) {
    console.error(`Error getting items from ${collectionName}:`, error);
    // Global Fallback to seedData to prevent blank screens
    if (seedData && (seedData as any)[collectionName]) {
      console.warn(`[Firestore] Falling back to local seed-data for: ${collectionName}`);
      return (seedData as any)[collectionName] as T[];
    }
    throw error;
  }
};

// Generic function to get items in real-time
export const subscribeItems = <T>(
  collectionName: string,
  callback: (items: T[]) => void
) => {
  return onSnapshot(collection(db, collectionName), (snapshot) => {
    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as T[];
    callback(items);
  });
};

// Generic function to add item
export const addItem = async <T>(collectionName: string, item: T): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...item,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return docRef.id;
  } catch (error) {
    console.error(`Error adding item to ${collectionName}:`, error);
    throw error;
  }
};

// Generic function to update item
export const updateItem = async <T>(
  collectionName: string,
  id: string,
  item: Partial<T>
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      ...item,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error(`Error updating item in ${collectionName}:`, error);
    throw error;
  }
};

// Generic function to delete item
export const deleteItem = async (collectionName: string, id: string): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting item from ${collectionName}:`, error);
    throw error;
  }
};
