//components/cart/CartDrawer.tsx
'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { useUIStore } from '@/store/uiStore'
import { useCartStore } from '@/store/cartStore'
import CartItem from './CartItem'
import Button from '@/ui/Button'
import Link from 'next/link'
import WhatsAppInquiryButton from '@/ui/WhatsAppInquiryButton'

const CartDrawer = () => {
  const cartOpen = useUIStore((state) => state.cartOpen)
  const setCartOpen = useUIStore((state) => state.setCartOpen)
  const items = useCartStore((state) => state.items)
  const total = useCartStore((state) => state.getTotal())

  return (
    <Dialog.Root open={cartOpen} onOpenChange={setCartOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm" />
        <Dialog.Content className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-white z-[60] shadow-xl overflow-y-auto">
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <Dialog.Title className="text-2xl font-heading">Your Cart</Dialog.Title>
              <Dialog.Close className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Dialog.Close>
            </div>

            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <CartItem key={item.product.id} item={item} />
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-gray-200 p-6 space-y-4 bg-gray-50">
                <div className="flex justify-between text-lg font-medium">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <Link href="/checkout" onClick={() => setCartOpen(false)} className="block w-full">
                  <Button className="w-full py-4">Secure Checkout</Button>
                </Link>
                <WhatsAppInquiryButton className="w-full" />
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default CartDrawer
