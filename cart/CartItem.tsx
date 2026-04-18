// src/components/cart/CartItem.tsx
'use client'

import Image from 'next/image'
import { CartItem as CartItemType } from '@/types'
import { useCartStore } from '@/store/cartStore'
import * as Checkbox from '@radix-ui/react-checkbox'
import { useState } from 'react'

interface CartItemProps {
  item: CartItemType
}

const CartItem = ({ item }: CartItemProps) => {
  const updateQuantity = useCartStore(state => state.updateQuantity)
  const removeItem = useCartStore(state => state.removeItem)
  const updateGiftOptions = useCartStore(state => state.updateGiftOptions)
  const [giftMessage, setGiftMessage] = useState(item.giftMessage || '')
  
  return (
    <div className="flex gap-4">
      <div className="relative w-20 h-20 bg-gray-100 flex-shrink-0">
        <Image
          src={item.product.images[0]}
          alt={item.product.name}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="flex-1">
        <h4 className="font-medium">{item.product.name}</h4>
        <p className="text-sm text-gray-600">${item.product.price}</p>
        
        <div className="flex items-center gap-3 mt-2">
          <select
            value={item.quantity}
            onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            {[1, 2, 3, 4, 5].map(q => (
              <option key={q} value={q}>{q}</option>
            ))}
          </select>
          <button
            onClick={() => removeItem(item.product.id)}
            className="text-sm text-gray-500 hover:text-accent transition-colors"
          >
            Remove
          </button>
        </div>
        
        {/* Gift Options */}
        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox.Root
              id={`gift-${item.product.id}`}
              checked={item.giftWrap}
              onCheckedChange={(checked) => updateGiftOptions(item.product.id, checked === true, giftMessage)}
              className="w-4 h-4 border border-gray-300 rounded"
            >
              <Checkbox.Indicator className="flex items-center justify-center">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z" />
                </svg>
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label htmlFor={`gift-${item.product.id}`} className="text-sm">
              Gift Wrap
            </label>
          </div>
          
          {item.giftWrap && (
            <input
              type="text"
              placeholder="Gift message"
              value={giftMessage}
              onChange={(e) => {
                setGiftMessage(e.target.value)
                updateGiftOptions(item.product.id, item.giftWrap, e.target.value)
              }}
              className="w-full text-sm border border-gray-300 rounded px-2 py-1"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default CartItem
