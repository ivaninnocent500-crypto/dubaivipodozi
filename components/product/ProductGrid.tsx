//components/product/ProductGrid.tsx
'use client'

import { products } from '@/data/products'
import ProductCard from './ProductCard'

const ProductGrid = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-heading text-center mb-12 text-gray-900">
          Our Collection
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

// THIS WAS MISSING:
export default ProductGrid
