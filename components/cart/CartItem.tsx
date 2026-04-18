//cartItem
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
  const updateQuantity = useCartStore((state: any) => state.updateQuantity)
  const removeItem = useCartStore((state: any) => state.removeItem)
  const updateGiftOptions = useCartStore((state: any) => state.updateGiftOptions)
  
  const [giftMessage, setGiftMessage] = useState(item.giftMessage || '')
  
  return (
    <div className="flex gap-4 p-4 border-b border-gray-100 last:border-0">
      <div className="relative w-20 h-20 bg-gray-100 flex-shrink-0 rounded-md overflow-hidden">
        {item.product.images?.[0] && (
          <Image
            src={item.product.images[0]}
            alt={item.product.name}
            fill
            className="object-cover"
          />
        )}
      </div>
      
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{item.product.name}</h4>
        <p className="text-sm text-gray-600">${item.product.price}</p>
        
        <div className="flex items-center gap-3 mt-2">
          <select
            value={item.quantity}
            onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 text-sm bg-white"
          >
            {[1, 2, 3, 4, 5].map(q => (
              <option key={q} value={q}>{q}</option>
            ))}
          </select>
          <button
            onClick={() => removeItem(item.product.id)}
            className="text-sm text-red-500 hover:text-red-700 transition-colors"
          >
            Remove
          </button>
        </div>
        
        <div className="mt-4 p-3 bg-gray-50 rounded-md space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox.Root
              id={`gift-${item.product.id}`}
              checked={item.giftWrap}
              onCheckedChange={(checked) => 
                updateGiftOptions(item.product.id, checked === true, giftMessage)
              }
              className="w-5 h-5 border border-gray-300 rounded bg-white flex items-center justify-center data-[state=checked]:bg-black data-[state=checked]:border-black transition-colors"
            >
              <Checkbox.Indicator className="text-white">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label htmlFor={`gift-${item.product.id}`} className="text-xs font-medium uppercase tracking-wider text-gray-700 cursor-pointer">
              Add Gift Wrap
            </label>
          </div>
          
          {item.giftWrap && (
            <input
              type="text"
              placeholder="Enter your gift message..."
              value={giftMessage}
              onChange={(e) => {
                setGiftMessage(e.target.value)
                updateGiftOptions(item.product.id, item.giftWrap, e.target.value)
              }}
              className="w-full text-sm border border-gray-200 rounded px-3 py-2 focus:ring-1 focus:ring-black outline-none bg-white"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default CartItem

