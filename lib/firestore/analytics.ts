import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc, increment, serverTimestamp } from "firebase/firestore";

export async function incrementVisitorCount() {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const docRef = doc(db, 'analytics', 'visitors');

  try {
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        [`daily.${today}`]: increment(1),
        total: increment(1),
        updatedAt: serverTimestamp()
      });
    } else {
      await setDoc(docRef, {
        daily: { [today]: 1 },
        total: 1,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }
  } catch (error) {
    console.error("Error updating visitor count:", error);
  }
}

export async function getVisitorStats() {
  const docRef = doc(db, 'analytics', 'visitors');
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return { total: 0, daily: {} };
  } catch (error) {
    console.error("Error fetching visitor stats:", error);
    return { total: 0, daily: {} };
  }
}
