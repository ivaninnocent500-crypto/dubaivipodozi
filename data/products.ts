//data/products.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'Cleanser' | 'Moisturizer' | 'Serum' | 'Sunscreen' | 'Fragrance';
  brand: string;
  images: string[];
  inStock: boolean;
  // --- Expansion Fields ---
  weightGrams: number; // For DHL/Aramex calculations
  skinType: 'All' | 'Oily' | 'Dry' | 'Sensitive' | 'Combination';
  concern?: 'Hydration' | 'Anti-Aging' | 'Acne-Control' | 'Brightening' | 'None';
  texture?: 'Lightweight' | 'Rich Cream' | 'Gel' | 'Oil' | 'Liquid';
  // --- Fragrance Specifics (Optional for Skincare) ---
  notes?: {
    top: string[];
    heart: string[];
    base: string[];
  };
  ingredients: {
    name: string;
    description: string;
  }[];
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Nocturnal Bloom',
    brand: 'Scent & Surface',
    price: 295,
    category: 'Fragrance',
    weightGrams: 450, // Including glass bottle weight
    skinType: 'All',
    description: 'A mysterious floral fragrance that unfolds in the darkness, revealing jasmine and oud.',
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800'
    ],
    notes: {
      top: ['Bergamot', 'Saffron'],
      heart: ['Jasmine', 'Tuberose'],
      base: ['Oud', 'Amber', 'Vanilla'],
    },
    ingredients: [
      { name: 'Jasmine Grandiflorum', description: 'Rich, exotic floral from Egypt' },
      { name: 'Oud', description: 'Aged agarwood, deep and resinous' }
    ],
    inStock: true,
  },
  {
    id: 'sc-1',
    name: 'The Rich Cream',
    brand: 'Augustinus Bader',
    price: 180,
    category: 'Moisturizer',
    weightGrams: 200,
    skinType: 'Dry',
    concern: 'Anti-Aging',
    texture: 'Rich Cream',
    description: 'An intense fast-absorbing moisturizer that helps transform the complexion.',
    images: ['https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=800'],
    ingredients: [
      { name: 'TFC8®', description: 'Trigger Factor Complex that guides key nutrients to cells' },
      { name: 'Evening Primrose Oil', description: 'Rich in fatty acids to reduce moisture loss' }
    ],
    inStock: true,
  },
  {
    id: 'sc-3',
    name: 'C-Firma Fresh',
    brand: 'Drunk Elephant',
    price: 78,
    category: 'Serum',
    weightGrams: 150,
    skinType: 'All',
    concern: 'Brightening',
    texture: 'Gel',
    description: 'A 15% Vitamin C day serum packed with antioxidants and fruit enzymes.',
    images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800'],
    ingredients: [
      { name: 'L-Ascorbic Acid', description: 'Potent Vitamin C for firming and brightening' },
      { name: 'Ferulic Acid', description: 'Enhances phytochemical efficacy of Vitamin C' }
    ],
    inStock: true,
  }
];

// Helper for Mock Data Expansion (25+ items)
for (let i = 4; i <= 25; i++) {
  products.push({
    id: `sc-${i}`,
    name: `Clinical Treatment No. ${i}`,
    brand: 'Dubai Vipodozi',
    price: Math.floor(Math.random() * (350 - 45) + 45),
    category: i % 2 === 0 ? 'Serum' : 'Moisturizer',
    weightGrams: 180,
    skinType: i % 3 === 0 ? 'Sensitive' : 'Oily',
    concern: i % 2 === 0 ? 'Hydration' : 'Acne-Control',
    texture: 'Lightweight',
    description: 'Professional grade skincare formulated for targeted results in tropical climates.',
    images: ['https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800'],
    ingredients: [
      { name: 'Hyaluronic Acid', description: 'Deep hydration for the "Mtaa" heat' }
    ],
    inStock: true,
  });
}

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

