//store/cartStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product } from '@/types'

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  updateGiftOptions: (productId: string, giftWrap?: boolean, giftMessage?: string) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
              ),
            }
          }
          return { items: [...state.items, { product, quantity, giftWrap: false, giftMessage: '' }] }
        })
      },

      removeItem: (productId) => {
        set((state) => ({ items: state.items.filter((i) => i.product.id !== productId) }))
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          set((state) => ({ items: state.items.filter((i) => i.product.id !== productId) }))
        } else {
          set((state) => ({
            items: state.items.map((i) => (i.product.id === productId ? { ...i, quantity } : i)),
          }))
        }
      },

      updateGiftOptions: (productId, giftWrap, giftMessage) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId ? { ...i, giftWrap, giftMessage } : i
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        return get().items.reduce((total, i) => total + i.product.price * i.quantity, 0)
      },

      getItemCount: () => {
        return get().items.reduce((count, i) => count + i.quantity, 0)
      },
    }),
    { name: 'cart-storage' }
  )
)
