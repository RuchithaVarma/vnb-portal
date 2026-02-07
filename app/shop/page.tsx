import ShopClient from '@/components/ShopClient';
import { getProducts } from '@/lib/firestore/products';

export const dynamic = 'force-dynamic';

export default async function ShopPage() {
  const products = await getProducts();
  return <ShopClient initialProducts={products} />;
}
