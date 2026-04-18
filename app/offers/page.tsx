'use client'

import { useEffect, useState } from 'react'
import { fetchProducts } from '@/lib/supabase/products'
import { Product } from '@/types'
import ProductCard from '@/components/product/ProductCard'
import Container from '@/components/ui/Container'

// We define a local interface that extends your main Product type
// to include the discount field for this specific page.
interface ProductWithDiscount extends Product {
  discount?: number;
}

export default function OffersPage() {
  const [offers, setOffers] = useState<ProductWithDiscount[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const all = await fetchProducts() as ProductWithDiscount[]
        // Using optional chaining to safely check for the discount property
        const discounted = all.filter(p => (p.discount ?? 0) > 0)
        setOffers(discounted)
      } catch (error) {
        console.error("Failed to load offers:", error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <Container className="py-20">
        <div className="h-40 bg-gray-100 animate-pulse rounded-lg" />
      </Container>
    )
  }

  return (
    <Container className="py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-heading uppercase tracking-wider">Beauty Offers</h1>
        <div className="w-12 h-0.5 bg-accent mx-auto mt-4 mb-4" />
        <p className="text-gray-500 max-w-xl mx-auto text-sm tracking-wide">
          Exclusive deals on premium skincare and fragrance.
        </p>
      </div>
      
      {offers.length === 0 ? (
        <p className="text-center text-gray-400">No active offers at the moment. Check back soon!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {offers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </Container>
  )
}