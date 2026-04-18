// src/components/checkout/OrderSummary.tsx
'use client'

import { useCartStore } from '@/store/cartStore'
import Image from 'next/image'

const OrderSummary = () => {
  const items = useCartStore(state => state.items)
  const total = useCartStore(state => state.getTotal())
  
  return (
    <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
      <h3 className="text-xl font-heading mb-6">Order Summary</h3>
      
      <div className="space-y-4 mb-6">
        {items.map(item => (
          <div key={item.product.id} className="flex gap-3">
            <div className="relative w-12 h-12 bg-gray-200 flex-shrink-0">
              <Image
                src={item.product.images[0]}
                alt={item.product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{item.product.name}</p>
              <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
            </div>
            <p className="text-sm font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between text-lg font-medium pt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
