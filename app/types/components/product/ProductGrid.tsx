//components/product/ProductGrid.tsx
'use client'

import { products } from '@/data/products'
import ProductCard from './ProductCard'
import { trackProductImpression } from '@/lib/analytics/track'
import { useEffect, useRef } from 'react'

const ProductGrid = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Track product impressions when grid enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            products.forEach((product, idx) => {
              trackProductImpression(product.id, product.name, idx)
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-gray-900">
            Our Collection
          </h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mt-4 mb-4" />
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our signature fragrances, each crafted with rare ingredients and artistic vision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductGrid
