//app/products/paage.tsx

'use client'

import { useState, useEffect } from 'react'
import { fetchProducts } from '@/lib/supabase/products'
import { Product } from '@/types'
import ProductCard from '@/components/product/ProductCard'
import { Search } from 'lucide-react'

export default function AllProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  useEffect(() => {
    async function load() {
      const data = await fetchProducts()
      setProducts(data)
      setLoading(false)
    }
    load()
  }, [])

  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                          p.brand.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'all' || p.category?.toLowerCase() === category.toLowerCase()
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="aspect-square bg-gray-100 animate-pulse rounded-2xl" />
        ))}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-heading text-center mb-8">All Products</h1>
      <div className="max-w-md mx-auto mb-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by name or brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full"
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {['all', 'skincare', 'fragrance', 'body care'].map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1 text-sm rounded-full capitalize ${
              category === cat ? 'bg-black text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-gray-500 py-20">No products found.</p>
      )}
    </div>
  )
}
