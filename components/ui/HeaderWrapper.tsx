// components/ui/HeaderWrapper.tsx
'use client'

import { useState } from 'react'
import Header from './Header'
import SearchOverlay from './SearchOverlay'
import MobileMenu from './MobileMenu' // Import the new menu

export default function HeaderWrapper() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false) // New state

  return (
    <>
      <Header 
        onSearchOpen={() => setIsSearchOpen(true)} 
        onMenuOpen={() => setIsMenuOpen(true)} // Pass the toggle
      />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}

