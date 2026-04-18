// components/product/ProductListLayout.tsx
'use client'

import { useState, useMemo, useEffect } from 'react'
import { fetchProducts } from '@/lib/supabase/products'
import { Product } from '@/types'
import ProductCard from './ProductCard'
import { Search } from 'lucide-react'

export default function ProductListLayout() {
  const [dbProducts, setDbProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeSkinType, setActiveSkinType] = useState('All')

  useEffect(() => {
    setIsClient(true)
    async function load() {
      const data = await fetchProducts()
      setDbProducts(data)
      setLoading(false)
    }
    load()
  }, [])

  const filteredProducts = useMemo(() => {
    return dbProducts.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase())

      const matchesCategory =
        activeCategory === 'All' ||
        p.category?.toLowerCase() === activeCategory.toLowerCase()

      const productSkinType = p.skinType || 'All'
      const matchesSkin =
        activeSkinType === 'All' ||
        productSkinType.toLowerCase() === activeSkinType.toLowerCase()

      return matchesSearch && matchesCategory && matchesSkin
    })
  }, [search, activeCategory, activeSkinType, dbProducts])

  if (!isClient) return null

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="aspect-square bg-gray-100 animate-pulse rounded-2xl" />
        ))}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative max-w-2xl mx-auto mb-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search brand, product, or concern..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-full shadow-sm text-sm focus:ring-1 focus:ring-amber-300 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 space-y-8">
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
              Categories
            </h4>
            <div className="space-y-2">
              {['All', 'Skincare', 'Fragrance', 'Body Care'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`block text-sm transition-colors ${
                    activeCategory === cat
                      ? 'text-amber-700 font-semibold'
                      : 'text-gray-500 hover:text-black'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
              Skin Type
            </h4>
            <div className="flex flex-wrap gap-2">
              {['All', 'Oily', 'Dry', 'Sensitive', 'Combination'].map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveSkinType(type)}
                  className={`px-3 py-1 text-[10px] uppercase tracking-tighter border rounded-full transition-all ${
                    activeSkinType === type
                      ? 'bg-black text-white border-black'
                      : 'border-gray-200 text-gray-400 hover:border-black'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
              {filteredProducts.length} Results Found
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-gray-400 text-sm italic">
                No products found in this collection.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}