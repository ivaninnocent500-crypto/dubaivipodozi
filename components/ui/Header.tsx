//components/ui/Header.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Search,
  ShoppingBag,
  Menu as MenuIcon,
  ChevronDown,
  MapPin,
  User,
} from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import { useState, useRef, useEffect } from 'react'

interface HeaderProps {
  onSearchOpen?: () => void
  onMenuOpen?: () => void
}

const Header = ({ onSearchOpen, onMenuOpen }: HeaderProps) => {
  const itemCount = useCartStore((state) => state.getItemCount())
  const setCartOpen = useUIStore((state) => state.setCartOpen)

  const [isResultsOpen, setIsResultsOpen] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        setIsResultsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Change only these values when you want a new location label
  const storeLocation = {
    city: 'Dar es Salaam',
    region: 'TZ',
    fullAddress: '33Msimbazi, Dar es Salaam',
  }

  const formatStoreLabel = () => {
    if (storeLocation.city && storeLocation.region) {
      return `${storeLocation.city}, ${storeLocation.region}`
    }
    if (storeLocation.city) return storeLocation.city
    return 'Find a Store'
  }

  const openGoogleMaps = () => {
    window.open(
      `https://maps.app.goo.gl/kP2kcdPoTaz83zh97?g_st=ic=${encodeURIComponent(storeLocation.fullAddress)}`,
      '_blank'
    )
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* PROMO BAR */}
      <div className="bg-rose-300 text-black text-center px-4 py-2 text-[11px] sm:text-xs font-medium tracking-wide">
        FREE shipping on orders over $50 • Use code: FREESHIP
        <span className="ml-2 underline cursor-pointer hover:opacity-80">Shop Now</span>
      </div>

      {/* MOBILE HEADER */}
      <div className="lg:hidden border-b border-gray-100">
        <div className="px-3">
          {/* ROW 1: menu + brand + search + cart */}
          <div className="flex items-center gap-2 py-3">
            <button
              onClick={onMenuOpen}
              className="shrink-0 p-2 rounded-full hover:bg-gray-100 transition"
              aria-label="Open menu"
              type="button"
            >
              <MenuIcon size={22} />
            </button>

            <Link href="/" className="shrink-0 min-w-fit">
              <div className="leading-none">
                <h1 className="text-[14px] font-semibold tracking-[0.18em] uppercase whitespace-nowrap text-black">
                  Dubai Vipodozi
                </h1>
              </div>
            </Link>

            <button
              onClick={onSearchOpen}
              className="flex-1 min-w-0 h-10 rounded-full border border-gray-300 bg-white px-4 flex items-center gap-2 hover:bg-gray-50 transition"
              aria-label="Search"
              type="button"
            >
              <Search size={16} className="text-gray-500 shrink-0" />
              <span className="text-sm text-gray-500 truncate">Search</span>
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="relative shrink-0 p-2 rounded-full hover:bg-gray-100 transition"
              aria-label="Cart"
              type="button"
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold"
                >
                  {itemCount}
                </motion.span>
              )}
            </button>
          </div>

          {/* ROW 2: account copy + sign in button */}
          <div className="flex items-center justify-between gap-3 pb-3">
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-semibold text-black leading-tight">
                Sign in for a faster shopping experience
              </p>
              <p className="text-[11px] text-gray-500 mt-0.5 truncate">
                Don&apos;t have an account? Create one today
              </p>
            </div>

            <Link
              href="/signin"
              className="shrink-0 inline-flex items-center justify-center rounded-full bg-black text-white text-sm font-medium px-5 h-10 hover:bg-gray-900 transition"
            >
              Sign In
            </Link>
          </div>

          {/* ROW 3: horizontal chips */}
          <div className="pb-3">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <button
                onClick={openGoogleMaps}
                className="shrink-0 inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 h-10 text-sm font-medium text-gray-800 hover:bg-gray-50 transition"
                aria-label="Find our store"
                type="button"
              >
                <MapPin size={15} className="text-gray-600" />
                <span>{formatStoreLabel()}</span>
              </button>

              <Link
                href="/skincare"
                className="shrink-0 inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 h-10 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                Skincare
              </Link>

              <Link
                href="/body"
                className="shrink-0 inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 h-10 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                Body
              </Link>

              <Link
                href="/fragrance"
                className="shrink-0 inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 h-10 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                Fragrance
              </Link>

              <button
                onClick={() => setIsResultsOpen(!isResultsOpen)}
                className="shrink-0 inline-flex items-center gap-1 rounded-xl border border-gray-300 bg-white px-4 h-10 text-sm text-gray-700 hover:bg-gray-50 transition"
                type="button"
                aria-expanded={isResultsOpen}
              >
                Results
                <ChevronDown
                  size={14}
                  className={`transition-transform ${isResultsOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <Link
                href="/offers"
                className="shrink-0 inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 h-10 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                Offers
              </Link>
            </div>

            {isResultsOpen && (
              <div
                ref={resultsRef}
                className="mt-3 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden"
              >
                <Link
                  href="/results/flat-tummy"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100"
                >
                  Flat Tummy
                </Link>
                <Link
                  href="/results/body-shaping"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100"
                >
                  Body Shaping
                </Link>
                <Link
                  href="/results/firming-tightening"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100"
                >
                  Firming &amp; Tightening
                </Link>
                <Link
                  href="/results/skin-glow"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Skin Glow
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DESKTOP HEADER */}
      <div className="hidden lg:block border-b border-gray-100">
        <div className="container mx-auto px-6 xl:px-8 py-4">
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-6">
            {/* Brand */}
            <Link href="/" className="min-w-fit">
              <div className="leading-none">
                <h1 className="font-serif text-2xl tracking-[0.22em] uppercase whitespace-nowrap">
                  Dubai Vipodozi
                </h1>
                <p className="text-[10px] tracking-[0.3em] text-gray-400 text-center mt-1">
                  Skincare &amp; Fragrance
                </p>
              </div>
            </Link>

            {/* Search */}
            <button
              onClick={onSearchOpen}
              className="h-11 rounded-full border border-gray-300 px-5 flex items-center gap-3 hover:bg-gray-50 transition max-w-xl w-full mx-auto"
              aria-label="Search"
              type="button"
            >
              <Search size={18} className="text-gray-500" />
              <span className="text-sm text-gray-500">Search products, categories, brands...</span>
            </button>

            {/* Actions */}
            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={openGoogleMaps}
                className="inline-flex items-center gap-2 rounded-full bg-gray-100 hover:bg-gray-200 px-4 h-11 transition"
                aria-label="Find our store"
                type="button"
              >
                <MapPin size={16} className="text-gray-700" />
                <span className="text-sm font-medium text-gray-800">{formatStoreLabel()}</span>
              </button>

              <Link
                href="/signin"
                className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-black h-11 px-3"
              >
                <User size={16} />
                <span>Sign In</span>
              </Link>

              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 hover:bg-gray-100 rounded-full transition"
                aria-label="Cart"
                type="button"
              >
                <ShoppingBag size={21} />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP NAV */}
      <div className="hidden lg:block border-b border-gray-100 py-3">
        <div className="container mx-auto px-8">
          <nav className="flex justify-center items-center space-x-8 text-xs">
            <Link href="/skincare" className="uppercase tracking-wider text-gray-600 hover:text-black">
              Skincare
            </Link>
            <Link href="/body" className="uppercase tracking-wider text-gray-600 hover:text-black">
              Body
            </Link>
            <Link href="/fragrance" className="uppercase tracking-wider text-gray-600 hover:text-black">
              Fragrance
            </Link>

            <div ref={resultsRef} className="relative">
              <button
                onClick={() => setIsResultsOpen(!isResultsOpen)}
                className="flex items-center gap-1 uppercase tracking-wider text-gray-600 hover:text-black"
                type="button"
              >
                Results
                <ChevronDown
                  size={12}
                  className={`transition-transform ${isResultsOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isResultsOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-lg border rounded-md py-2 z-50">
                  <Link href="/results/flat-tummy" className="block px-4 py-2 text-sm hover:bg-gray-50">
                    Flat Tummy
                  </Link>
                  <Link href="/results/body-shaping" className="block px-4 py-2 text-sm hover:bg-gray-50">
                    Body Shaping
                  </Link>
                  <Link
                    href="/results/firming-tightening"
                    className="block px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    Firming &amp; Tightening
                  </Link>
                  <Link href="/results/skin-glow" className="block px-4 py-2 text-sm hover:bg-gray-50">
                    Skin Glow
                  </Link>
                </div>
              )}
            </div>

            <Link href="/offers" className="uppercase tracking-wider text-gray-600 hover:text-black">
              Offers
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header

