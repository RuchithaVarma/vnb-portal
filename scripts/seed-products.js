const { initializeApp } = require("firebase/app");
const { getFirestore, collection, doc, setDoc } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyB5_DFNmSNVvLF_OKaK7E2llulN8vYc8Zo",
  authDomain: "bloomsraw-e2af6.firebaseapp.com",
  projectId: "bloomsraw-e2af6",
  storageBucket: "bloomsraw-e2af6.firebasestorage.app",
  messagingSenderId: "308381166050",
  appId: "1:308381166050:web:ceb32b2e281f1f525331bb",
  measurementId: "G-N2E77KQ2P4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const products = [
    {
      id: 1,
      slug: 'beetroot-powder',
      name: 'Beetroot Powder',
      category: 'vegetable',
      price: 238,
      originalPrice: 280,
      discount: 15,
      sizes: ['50g', '150g', '250g'],
      image: '/images/beetroot_powder.png',
      description: 'Made from carefully selected fresh raw materials and processed with utmost care to retain all nutrients.',
      benefits: ['Rich in antioxidants', 'Supports heart health', 'Boosts stamina', 'Natural blood pressure support'],
      fssai: true,
      featured: true,
    },
    {
      id: 2,
      slug: 'moringa-powder',
      name: 'Moringa Powder',
      category: 'leafy',
      price: 229,
      originalPrice: 270,
      discount: 15,
      sizes: ['50g', '150g', '250g'],
      image: '/images/spinach_powder.png',
      description: 'Premium organic moringa powder packed with essential vitamins and minerals.',
      benefits: ['Nutrient-rich superfood', 'Boosts immunity', 'Natural energy enhancer', 'Anti-inflammatory properties'],
      fssai: true,
      featured: true,
    },
    {
      id: 3,
      slug: 'turmeric-powder',
      name: 'Turmeric Powder',
      category: 'vegetable',
      price: 189,
      originalPrice: 220,
      discount: 14,
      sizes: ['100g', '250g', '500g'],
      image: '/images/turmeric_powder.png',
      description: 'Pure turmeric powder with high curcumin content. No additives, no preservatives.',
      benefits: ['Anti-inflammatory', 'Immune support', 'Joint health', 'Natural antioxidant'],
      fssai: true,
      featured: true,
    },
    {
      id: 4,
      slug: 'amla-powder',
      name: 'Amla Powder',
      category: 'fruit',
      price: 199,
      originalPrice: 240,
      discount: 17,
      sizes: ['100g', '200g', '400g'],
      image: '/images/turmeric_powder.png',
      description: 'Rich in Vitamin C, made from sun-dried Indian gooseberries.',
      benefits: ['Vitamin C powerhouse', 'Hair and skin health', 'Digestive support', 'Immunity booster'],
      fssai: true,
      featured: true,
    },
    {
      id: 5,
      slug: 'spinach-powder',
      name: 'Spinach Powder',
      category: 'leafy',
      price: 249,
      originalPrice: 290,
      discount: 14,
      sizes: ['50g', '150g', '300g'],
      image: '/images/spinach_powder.png',
      description: 'Nutrient-dense spinach powder, perfect for smoothies and cooking.',
      benefits: ['Iron-rich', 'Bone health', 'Energy booster', 'Antioxidant support'],
      fssai: true,
      featured: true,
    },
    {
      id: 6,
      slug: 'carrot-powder',
      name: 'Carrot Powder',
      category: 'vegetable',
      price: 219,
      originalPrice: 260,
      discount: 16,
      sizes: ['100g', '200g', '350g'],
      image: '/images/turmeric_powder.png',
      description: 'Sweet and versatile carrot powder rich in beta-carotene.',
      benefits: ['Eye health', 'Skin glow', 'Vitamin A source', 'Immune support'],
      fssai: true,
      featured: true,
    },
    {
      id: 7,
      slug: 'ginger-powder',
      name: 'Ginger Powder',
      category: 'vegetable',
      price: 169,
      originalPrice: 200,
      discount: 15,
      sizes: ['50g', '100g', '200g'],
      image: '/images/turmeric_powder.png',
      description: 'Sharp, aromatic ginger powder for wellness and cooking.',
      benefits: ['Digestive aid', 'Anti-nausea', 'Anti-inflammatory', 'Metabolism boost'],
      fssai: true,
      featured: true,
    },
    {
      id: 8,
      slug: 'ashwagandha-powder',
      name: 'Ashwagandha Powder',
      category: 'vegetable',
      price: 299,
      originalPrice: 350,
      discount: 14,
      sizes: ['100g', '200g', '400g'],
      image: '/images/turmeric_powder.png',
      description: 'Premium ashwagandha root powder for stress relief and vitality.',
      benefits: ['Stress reducer', 'Energy booster', 'Sleep support', 'Cognitive health'],
      fssai: true,
      featured: true,
    },
    {
      id: 9,
      slug: 'broccoli-powder',
      name: 'Broccoli Powder',
      category: 'vegetable',
      price: 279,
      originalPrice: 330,
      discount: 15,
      sizes: ['50g', '150g', '250g'],
      image: '/images/spinach_powder.png',
      description: 'Concentrated broccoli powder packed with nutrients.',
      benefits: ['Detox support', 'Rich in fiber', 'Vitamin K source', 'Antioxidant power'],
      fssai: true,
      featured: true,
    },
    {
      id: 10,
      slug: 'wheatgrass-powder',
      name: 'Wheatgrass Powder',
      category: 'leafy',
      price: 259,
      originalPrice: 300,
      discount: 13,
      sizes: ['100g', '200g', '400g'],
      image: '/images/spinach_powder.png',
      description: 'Fresh, green wheatgrass powder for daily nutrition.',
      benefits: ['Chlorophyll-rich', 'Alkalizing', 'Energy boost', 'Detoxification'],
      fssai: true,
      featured: true,
    },
    {
      id: 11,
      slug: 'pomegranate-powder',
      name: 'Pomegranate Powder',
      category: 'fruit',
      price: 329,
      originalPrice: 390,
      discount: 15,
      sizes: ['100g', '200g', '300g'],
      image: '/images/beetroot_powder.png',
      description: 'Tangy pomegranate powder rich in antioxidants.',
      benefits: ['Heart health', 'Anti-aging', 'Blood sugar support', 'High antioxidants'],
      fssai: true,
      featured: true,
    },
    {
      id: 12,
      slug: 'tomato-powder',
      name: 'Tomato Powder',
      category: 'vegetable',
      price: 199,
      originalPrice: 230,
      discount: 13,
      sizes: ['100g', '250g', '500g'],
      image: '/images/beetroot_powder.png',
      description: 'Rich tomato powder perfect for soups, sauces, and cooking.',
      benefits: ['Lycopene source', 'Skin health', 'Heart support', 'Vitamin C'],
      fssai: true,
      featured: true,
    },
  ];

async function seedProducts() {
  console.log('Seeding products to Firestore...');
  const collectionRef = collection(db, 'products');

  for (const product of products) {
    try {
      // Use slug as doc ID for easier access
      await setDoc(doc(collectionRef, product.slug), product);
      console.log(`Added product: ${product.name}`);
    } catch (error) {
      console.error(`Error adding product ${product.name}:`, error);
    }
  }

  console.log('Seeding complete!');
  process.exit(0);
}

seedProducts();
