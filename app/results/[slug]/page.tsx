// app/results/[slug]/page.tsx
'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { fetchProductsByResultSlug } from '@/lib/supabase/products'
import { Product } from '@/types'
import ProductCard from '@/components/product/ProductCard'
import Container from '@/ui/Container'

const resultsMap: Record<string, { title: string; description: string }> = {
  'flat-tummy': {
    title: 'Flat Tummy Solutions',
    description: 'Achieve a flatter, more toned stomach with our targeted formulas.'
  },
  'body-shaping': {
    title: 'Body Shaping',
    description: 'Enhance curves and sculpt your silhouette with these results-driven products.'
  },
  'firming-tightening': {
    title: 'Firming & Tightening',
    description: 'Lift and tighten skin for a more youthful, contoured appearance.'
  },
  'skin-glow': {
    title: 'Skin Glow',
    description: 'Radiant, luminous skin starts here. Boost your natural glow.'
  }
}

export default function ResultPage() {
  const params = useParams()
  const slug = params.slug as string
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const data = await fetchProductsByResultSlug(slug)
      setProducts(data)
      setLoading(false)
    }
    load()
  }, [slug])

  const meta = resultsMap[slug] || { title: 'Results', description: 'Discover transformation-driven products.' }

  if (loading) {
    return <Container className="py-20"><div className="h-40 bg-gray-100 animate-pulse" /></Container>
  }

  return (
    <Container className="py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-heading uppercase tracking-wider">{meta.title}</h1>
        <div className="w-12 h-0.5 bg-accent mx-auto mt-4 mb-4" />
        <p className="text-gray-500 max-w-xl mx-auto text-sm tracking-wide">{meta.description}</p>
      </div>
      {products.length === 0 ? (
        <p className="text-center text-gray-400">No products found for this category. Check back soon!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </Container>
  )
}
