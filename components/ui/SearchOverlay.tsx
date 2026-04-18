// components/ui/SearchOverlay.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { fetchProducts } from '@/lib/supabase/products' // Import your fetcher
import { Product } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

export default function SearchOverlay({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [allProducts, setAllProducts] = useState<Product[]>([])
  
  // Load products once when the overlay is opened
  useEffect(() => {
    if (isOpen) {
      const load = async () => {
        const data = await fetchProducts()
        setAllProducts(data)
      }
      load()
    }
  }, [isOpen])

  // Filter products based on search query
  const results = query.length > 2 
    ? allProducts.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.brand.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : []

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-md p-6 lg:p-20"
        >
          {/* Close Button */}
          <button onClick={onClose} className="absolute top-10 right-10 p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={32} className="text-gray-900" />
          </button>

          <div className="max-w-4xl mx-auto mt-20">
            {/* Search Input */}
            <div className="flex items-center border-b-2 border-gray-900 pb-4">
              <Search size={30} className="mr-4 text-gray-400" />
              <input 
                autoFocus
                placeholder="Search by brand (e.g. CeraVe, La Roche)..."
                className="text-2xl lg:text-5xl font-heading bg-transparent outline-none w-full placeholder:text-gray-200"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            {/* Live Results Grid */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              {results.map(product => (
                <Link 
                  href={`/product/${product.id}`} 
                  key={product.id} 
                  onClick={onClose}
                  className="flex gap-4 group p-2 hover:bg-gray-50 transition-colors"
                >
                  <div className="relative w-20 h-24 bg-gray-100 overflow-hidden rounded-sm">
                    {product.images?.[0] && (
                      <Image 
                        src={product.images[0]} 
                        alt={product.name} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                    )}
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-[10px] uppercase tracking-widest text-accent mb-1">{product.brand}</p>
                    <h4 className="font-heading text-lg leading-tight">{product.name}</h4>
                    <p className="text-gray-400 text-sm mt-1">${product.price}</p>
                  </div>
                </Link>
              ))}
              
              {query.length > 2 && results.length === 0 && (
                <p className="text-gray-400 italic py-4">No luxury items found for "{query}"</p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

