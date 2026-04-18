//components/ui/Header.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import Button from './Button'

const Header = () => {
  const itemCount = useCartStore(state => state.getItemCount())
  const setCartOpen = useUIStore(state => state.setCartOpen)
  
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="text-2xl font-heading tracking-tight hover:opacity-80 transition-opacity">
            Scent & Surface
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm uppercase tracking-wider hover:text-accent transition-colors">
              Shop
            </Link>
            <Link href="/#quiz" className="text-sm uppercase tracking-wider hover:text-accent transition-colors">
              Discover
            </Link>
            <Link href="/about" className="text-sm uppercase tracking-wider hover:text-accent transition-colors">
              About
            </Link>
          </nav>
          
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Shopping cart"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {itemCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
              >
                {itemCount}
              </motion.span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
