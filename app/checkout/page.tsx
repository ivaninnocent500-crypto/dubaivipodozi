//app/checkout/page.tsx
'use client'

import { useCartStore } from '@/store/cartStore'
import CheckoutForm from '@/components/checkout/CheckoutForm'
import OrderSummary from '@/components/checkout/OrderSummary'
import Container from '@/ui/Container'

export default function CheckoutPage() {
  const items = useCartStore(state => state.items)

  if (items.length === 0) {
    return (
      <Container className="py-20 text-center">
        <h1 className="text-2xl font-heading mb-4">Your cart is empty</h1>
        <a href="/" className="text-accent underline">
          Continue Shopping
        </a>
      </Container>
    )
  }

  return (
    <Container className="py-12">
      <h1 className="text-3xl md:text-4xl font-heading mb-8">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <CheckoutForm />
        </div>
        <div>
          <OrderSummary />
        </div>
      </div>
    </Container>
  )
}
