import { db } from "../firebase";
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  setDoc, 
  deleteDoc, 
  updateDoc 
} from "firebase/firestore";
import { Product } from "../products";

const COLLECTION_NAME = "products";

export async function getProducts(): Promise<Product[]> {
  const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
  return querySnapshot.docs.map((doc) => doc.data() as Product);
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  const docRef = doc(db, COLLECTION_NAME, slug);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as Product;
  } else {
    return undefined;
  }
}

export async function addProduct(product: Product): Promise<void> {
  // Use slug as document ID
  await setDoc(doc(db, COLLECTION_NAME, product.slug), product);
}

export async function updateProduct(slug: string, data: Partial<Product>): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, slug);
  await updateDoc(docRef, data);
}

export async function deleteProduct(slug: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, slug);
  await deleteDoc(docRef);
}
