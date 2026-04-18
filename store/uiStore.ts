// src/store/uiStore.ts
import { create } from 'zustand'

interface UIStore {
  cartOpen: boolean
  setCartOpen: (open: boolean) => void
  sprayAnimation: string | null
  triggerSpray: (id: string) => void
  clearSpray: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  cartOpen: false,
  setCartOpen: (open) => set({ cartOpen: open }),
  sprayAnimation: null,
  triggerSpray: (id) => set({ sprayAnimation: id }),
  clearSpray: () => set({ sprayAnimation: null }),
}))
