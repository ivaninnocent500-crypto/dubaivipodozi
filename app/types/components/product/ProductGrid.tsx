// components/product/ProductGrid.tsx

'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { fetchProducts } from '@/lib/supabase/products'
import { Product } from '@/types'
import ProductCard from './ProductCard'
import { trackProductImpression } from '@/lib/analytics/track'

const ProductGrid = () => {
  const [dbProducts, setDbProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setMounted(true)

    async function getProducts() {
      const data = await fetchProducts()
      setDbProducts(data)
      setLoading(false)
    }

    getProducts()
  }, [])

  useEffect(() => {
    if (!mounted || dbProducts.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            dbProducts.forEach((product, idx) => {
              trackProductImpression(product.id, product.name, idx)
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [dbProducts, mounted])

  if (!mounted) {
    return <div className="min-h-[220px] bg-white" />
  }

  if (loading) {
    return (
      <section className="bg-white py-5">
        <div className="px-3 sm:px-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[22px] font-semibold text-black">Chosen For You</h2>
          </div>

          <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-[116px] h-[210px] shrink-0 rounded-md border border-[#e7e7e7] bg-white animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="bg-white py-5">
      <div className="px-3 sm:px-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[22px] font-semibold text-black">Chosen For You</h2>
          <Link href="/products" className="text-[13px] text-sky-700 font-medium">
            View all
          </Link>
        </div>

        <div className="lg:hidden flex gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-1">
          {dbProducts.map((product) => (
            <ProductCard key={product.id} product={product} layout="horizontal" />
          ))}
        </div>

        <div className="hidden lg:grid grid-cols-4 xl:grid-cols-5 gap-4">
          {dbProducts.map((product) => (
            <ProductCard key={product.id} product={product} layout="grid" />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductGrid


