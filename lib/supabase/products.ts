// lib/supabase/products.ts

import { supabase } from './client'
import { Product } from '@/types'

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Supabase Error:', error)
    return []
  }

  return data.map(mapProduct)
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Supabase Error:', error)
    return []
  }
  return data.map(mapProduct)
}

export async function fetchProductsByResultSlug(slug: string): Promise<Product[]> {
  // Assumes 'results' column (text[]) exists
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .contains('results', [slug])
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Supabase Error:', error)
    return []
  }
  return data.map(mapProduct)
}

function mapProduct(item: any): Product {
  return {
    id: item.id,
    name: item.name || 'New Arrival',
    brand: item.brand || 'Dubai Vipodozi',
    price: Number(item.price) || 0,
    description: item.description || '',
    category: item.category || 'Skincare',
    skinType: item.skin_type || 'All',
    images: Array.isArray(item.images) && item.images.length > 0
      ? item.images
      : ['/placeholder-product.png'],
    inStock: item.in_stock ?? true,
    notes: item.notes || { top: [], heart: [], base: [] },
    ingredients: item.ingredients || [],
    created_at: item.created_at || new Date().toISOString(),
    isNew: item.is_new ?? false,
    rating: item.rating ?? null,
    discount: item.discount ?? null,
    results: item.results ?? [],
  }
}
