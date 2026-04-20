'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Product } from '@/types'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import { trackEvent } from '@/lib/analytics/track'
import { clsx } from 'clsx'
import * as Tooltip from '@radix-ui/react-tooltip'

interface ProductCardProps {
  product: Product
  layout?: 'grid' | 'horizontal'
}

type ProductIngredient = string | { name?: string }

const ProductCard = ({ product, layout = 'horizontal' }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem)
  const triggerSpray = useUIStore((state) => state.triggerSpray)
  const sprayAnimation = useUIStore((state) => state.sprayAnimation)

  const ingredients: ProductIngredient[] = Array.isArray(product.ingredients)
    ? product.ingredients
    : []

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    addItem(product)

    trackEvent('add_to_cart', {
      product_id: product.id,
      product_name: product.name,
    })
  }

  const handleSpray = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    triggerSpray(product.id)
    setTimeout(() => triggerSpray(''), 600)

    trackEvent('product_spray', {
      product_id: product.id,
    })
  }

  const getIngredientName = (ingredient: ProductIngredient) => {
    if (typeof ingredient === 'string') return ingredient
    return ingredient?.name ?? 'Ingredient'
  }

  const renderRatingStars = (rating: number, reviewCount?: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    const reviewText =
      typeof reviewCount === 'number'
        ? reviewCount >= 1000
          ? `${(reviewCount / 1000).toFixed(1)}k`
          : `${reviewCount}`
        : rating.toFixed(1)

    return (
      <div className="mt-1 flex items-center gap-1">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => {
            const filled = i < fullStars
            const half = i === fullStars && hasHalfStar

            return (
              <span key={i} className="relative inline-block h-[11px] w-[11px]">
                <svg
                  viewBox="0 0 24 24"
                  className="absolute inset-0 h-[11px] w-[11px] text-gray-200"
                  fill="currentColor"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>

                {(filled || half) && (
                  <span
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: filled ? '100%' : '50%' }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-[11px] w-[11px] text-blue-600"
                      fill="currentColor"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </span>
                )}
              </span>
            )
          })}
        </div>

        <span className="text-[10px] leading-none text-gray-500">{reviewText}</span>
      </div>
    )
  }

  const showNewBadge = Boolean(product.isNew)
  const showCleanBadge = Boolean(product.isClean)

  const cardWidth =
    layout === 'horizontal'
      ? 'w-[112px] min-[380px]:w-[116px] sm:w-[140px]'
      : 'w-full'

  const imageHeight =
    layout === 'horizontal'
      ? 'h-[112px] min-[380px]:h-[116px] sm:h-[148px]'
      : 'h-[180px] sm:h-[220px]'

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      whileHover={layout === 'grid' ? { y: -2 } : undefined}
      className={clsx(
        'group shrink-0 overflow-hidden rounded-md border border-[#e7e7e7] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.01)]',
        cardWidth
      )}
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className={clsx('relative bg-white', imageHeight)}>
          {showNewBadge && (
            <span className="absolute left-1.5 top-1.5 z-20 rounded-[3px] bg-black px-1.5 py-[2px] text-[8px] font-bold uppercase tracking-wide text-white">
              New
            </span>
          )}

          <div className="absolute inset-0 flex items-center justify-center p-3">
            <div className="relative h-full w-full">
              <Image
                src={product.images?.[0] || '/placeholder-product.png'}
                alt={product.name || 'Product Image'}
                fill
                sizes="(max-width: 640px) 116px, 140px"
                className="object-contain"
              />
            </div>
          </div>

          {showCleanBadge && (
            <span className="absolute bottom-1.5 right-1.5 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full border border-green-600 bg-white text-center text-[7px] font-bold uppercase leading-[1] text-green-700 shadow-sm">
              Clean
            </span>
          )}

          <AnimatePresence>
            {sprayAnimation === product.id && (
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
              >
                <div className="h-16 w-16 rounded-full bg-blue-100/40" />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute inset-x-2 bottom-2 hidden gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:flex">
            <button
              onClick={handleAddToCart}
              className="h-8 flex-1 rounded-full bg-black text-[11px] font-medium text-white"
              type="button"
            >
              Quick Add
            </button>

            <button
              onClick={handleSpray}
              className="h-8 w-8 rounded-full border border-gray-300 bg-white text-gray-700"
              aria-label="Spray product"
              type="button"
            >
              +
            </button>
          </div>
        </div>

        <div className="px-2.5 pb-2.5 pt-2">
          {product.brand && (
            <p className="text-[10px] font-semibold uppercase leading-tight tracking-[0.02em] text-black">
              {product.brand}
            </p>
          )}

          <h3 className="mt-1 min-h-[28px] line-clamp-2 text-[11px] leading-[1.25] text-black">
            {product.name}
          </h3>

          <p className="mt-1 text-[11px] font-semibold leading-tight text-black">
            $
            {typeof product.price === 'number'
              ? product.price.toFixed(2)
              : product.price || 0}
          </p>

          {ingredients.length > 0 && (
            <div className="mt-2 flex gap-1">
              {ingredients.slice(0, 3).map((ingredient, idx) => (
                <Tooltip.Provider key={`${product.id}-ingredient-${idx}`}>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <div className="h-3 w-3 rounded-full border border-gray-200 bg-gray-100" />
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        className="z-50 rounded bg-gray-900 px-2 py-1 text-[10px] text-white shadow-lg"
                        sideOffset={5}
                      >
                        {getIngredientName(ingredient)}
                        <Tooltip.Arrow className="fill-gray-900" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
              ))}
            </div>
          )}

          {typeof product.rating === 'number' && renderRatingStars(product.rating, product.reviewCount)}
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard

