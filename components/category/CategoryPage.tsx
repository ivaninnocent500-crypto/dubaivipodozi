// components/category/CategoryPage.tsx
'use client'

import { useEffect, useState } from 'react'
import { Product } from '@/types'
import { fetchProductsByCategory } from '@/lib/supabase/products'
import ProductCard from '@/components/product/ProductCard'
import Container from '@/ui/Container'
import { trackPageView } from '@/lib/analytics/track'

interface CategoryPageProps {
  category: string
  title: string
  description: string
}

export default function CategoryPage({ category, title, description }: CategoryPageProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const data = await fetchProductsByCategory(category)
      setProducts(data)
      setLoading(false)
      trackPageView(`category:${category}`)
    }
    load()
  }, [category])

  if (loading) {
    return (
      <Container className="py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-gray-100 animate-pulse" />
          ))}
        </div>
      </Container>
    )
  }

  return (
    <Container className="py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-heading uppercase tracking-wider">{title}</h1>
        <div className="w-12 h-0.5 bg-accent mx-auto mt-4 mb-4" />
        <p className="text-gray-500 max-w-xl mx-auto text-sm tracking-wide">{description}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Container>
  )
}
