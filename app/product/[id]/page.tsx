//app/product/[id]/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import Image from 'next/image'
import { supabase } from '@/lib/supabase/client' // Use Supabase client
import { Product } from '@/types'
import Button from '@/ui/Button'
import NoteWheel from '@/components/product/NoteWheel'
import IngredientTooltip from '@/components/product/IngredientTooltip'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import { trackEvent } from '@/lib/analytics/track'
import { motion } from 'framer-motion'

export default function ProductPage() {
  const params = useParams()
  const id = params?.id as string
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  
  const addItem = useCartStore((state: any) => state.addItem)
  const triggerSpray = useUIStore((state: any) => state.triggerSpray)

  useEffect(() => {
    async function getDetails() {
      setLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()

      if (!error && data) {
        setProduct(data)
      }
      setLoading(false)
    }
    if (id) getDetails()
  }, [id])
  
  if (loading) {
    return <div className="container mx-auto px-4 py-32 text-center animate-pulse font-heading">Curating Details...</div>
  }

  if (!product) {
    return <div className="container mx-auto px-4 py-32 text-center font-heading">Product not found in collection</div>
  }
  
  const handleAddToCart = () => {
    addItem(product)
    triggerSpray(product.id)
    setTimeout(() => triggerSpray(''), 600)
    trackEvent('add_to_cart', { product_id: product.id })
  }
  
  const handleWhatsApp = () => {
    const msg = encodeURIComponent(`Hello Dubai Vipodozi, I am interested in ${product.brand} ${product.name}. Is it in stock?`)
    window.open(`https://wa.me/255620148904?text=${msg}`, '_blank')
  }
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Gallery */}
        <div className="bg-gray-50 rounded-sm overflow-hidden">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className="aspect-[3/4]"
          >
            {product.images?.map((img: string, idx: number) => (
              <SwiperSlide key={idx}>
                <div className="relative w-full h-full">
                  <Image src={img} alt={product.name} fill className="object-cover" priority={idx === 0} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
        {/* Product Info */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <span className="text-[10px] uppercase tracking-ultra text-accent font-bold mb-2 block">{product.brand}</span>
          <h1 className="text-4xl font-heading mb-4 uppercase tracking-tighter">{product.name}</h1>
          <p className="text-2xl mb-8 font-light">${product.price}</p>
          <p className="text-gray-500 mb-10 leading-relaxed text-sm">{product.description}</p>
          
          {/* Note Wheel - Only shows for Fragrances */}
          {product.category === 'Fragrance' && product.notes && (
            <div className="mb-10 p-6 bg-gray-50 rounded-sm">
              <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-6">Olfactory Pyramid</h3>
              <NoteWheel
                topNotes={product.notes.top}
                heartNotes={product.notes.heart}
                baseNotes={product.notes.base}
              />
            </div>
          )}
          
          {/* Ingredients/Highlights */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="mb-10">
              <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4">Formulation Highlights</h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing: any, idx: number) => (
                  <IngredientTooltip key={idx} name={ing.name} description={ing.description} />
                ))}
              </div>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={handleAddToCart} className="flex-1 py-5">Add to Collection</Button>
            <Button variant="outline" onClick={handleWhatsApp} className="flex-1 py-5 border-gray-200">Enquire via WhatsApp</Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
