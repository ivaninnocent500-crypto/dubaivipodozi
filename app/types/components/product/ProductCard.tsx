//components/product/ProductCard.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Product } from '@/types'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import Button from '@/ui/Button'
import * as Tooltip from '@radix-ui/react-tooltip'
import { trackEvent } from '@/lib/analytics/track'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem)
  const triggerSpray = useUIStore(state => state.triggerSpray)
  const sprayAnimation = useUIStore(state => state.sprayAnimation)
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product)
    trackEvent('add_to_cart', { product_id: product.id, product_name: product.name })
  }
  
  const handleSpray = (e: React.MouseEvent) => {
    e.preventDefault()
    triggerSpray(product.id)
    setTimeout(() => triggerSpray(''), 600)
    trackEvent('product_spray', { product_id: product.id })
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          
          {/* Spray Animation Overlay */}
          <AnimatePresence>
            {sprayAnimation === product.id && (
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="w-20 h-20 rounded-full bg-white/30 backdrop-blur-sm" />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Quick Actions */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex gap-2">
              <Button
                onClick={handleAddToCart}
                size="sm"
                className="flex-1 text-xs"
              >
                Quick Add
              </Button>
              <button
                onClick={handleSpray}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                aria-label="Spray fragrance"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-heading text-lg mb-1">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-2">${product.price}</p>
          
          {/* Ingredient Icons */}
          <div className="flex gap-2 mt-2">
           {(product.ingredients ?? []).slice(0, 3).map((ingredient, idx) => (

              <Tooltip.Provider key={idx}>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs cursor-help">
                      {ingredient.name.charAt(0)}
                    </div>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content className="bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg">
                      {ingredient.name}
                      <Tooltip.Arrow className="fill-gray-900" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard
