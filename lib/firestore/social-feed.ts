import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  Timestamp
} from "firebase/firestore";

export interface SocialFeedItem {
  id?: string;
  imageUrl: string; // The text mentioned "images and videos", we can store the URL here
  caption?: string;
  type: 'image' | 'video';
  createdAt: string;
}

const COLLECTION_NAME = "social_feed";

export async function getSocialFeedItems(): Promise<SocialFeedItem[]> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy("createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    } as SocialFeedItem));
  } catch (error) {
    console.error("Error fetching social feed items:", error);
    return [];
  }
}

export async function addSocialFeedItem(item: Omit<SocialFeedItem, 'id' | 'createdAt'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...item,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding social feed item:", error);
    throw error;
  }
}

export async function deleteSocialFeedItem(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error("Error deleting social feed item:", error);
    throw error;
  }
}
