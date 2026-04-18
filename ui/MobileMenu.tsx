// components/ui/MobileMenu.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, MessageCircle, MapPin, User } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [showResults, setShowResults] = useState(false)

  const storeLocation = {
    fullAddress: 'Dar es Salaam, Tanzania',
    label: 'Dar es Salaam, TZ',
  }

  const openGoogleMaps = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(storeLocation.fullAddress)}`,
      '_blank'
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110] lg:hidden"
          />

          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
            className="fixed top-0 left-0 bottom-0 w-[88%] max-w-sm bg-white z-[120] flex flex-col lg:hidden overflow-y-auto shadow-xl"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-rose-500">
                  Menu
                </p>
                <p className="text-sm font-semibold text-black mt-1">Dubai Vipodozi</p>
              </div>

              <button onClick={onClose} className="p-2 -mr-2 rounded-full hover:bg-gray-100" type="button">
                <X size={22} />
              </button>
            </div>

            {/* Quick actions */}
            <div className="px-5 py-4 border-b border-gray-100">
              <div className="flex gap-2">
                <Link
                  href="/signin"
                  onClick={onClose}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-black text-white h-11 text-sm font-medium hover:bg-gray-900 transition"
                >
                  <User size={16} />
                  <span>Sign In</span>
                </Link>

                <button
                  onClick={openGoogleMaps}
                  type="button"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white h-11 text-sm font-medium text-gray-800 hover:bg-gray-50 transition"
                >
                  <MapPin size={16} />
                  <span className="truncate">{storeLocation.label}</span>
                </button>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-5 py-4 space-y-1">
              <Link
                href="/"
                onClick={onClose}
                className="block text-[15px] font-medium text-black rounded-xl px-3 py-3 hover:bg-gray-50"
              >
                Home
              </Link>

              <Link
                href="/skincare"
                onClick={onClose}
                className="block text-[15px] font-medium text-black rounded-xl px-3 py-3 hover:bg-gray-50"
              >
                Skincare
              </Link>

              <Link
                href="/body"
                onClick={onClose}
                className="block text-[15px] font-medium text-black rounded-xl px-3 py-3 hover:bg-gray-50"
              >
                Body
              </Link>

              <Link
                href="/fragrance"
                onClick={onClose}
                className="block text-[15px] font-medium text-black rounded-xl px-3 py-3 hover:bg-gray-50"
              >
                Fragrance
              </Link>

              <div className="rounded-xl overflow-hidden">
                <button
                  onClick={() => setShowResults(!showResults)}
                  className="flex justify-between items-center w-full text-[15px] font-medium text-black px-3 py-3 hover:bg-gray-50 rounded-xl"
                  type="button"
                >
                  <span>Results</span>
                  <ArrowRight
                    size={18}
                    className={`transform transition-transform ${showResults ? 'rotate-90' : ''}`}
                  />
                </button>

                {showResults && (
                  <div className="pl-4 pr-2 pb-2 space-y-1">
                    <Link
                      href="/results/flat-tummy"
                      onClick={onClose}
                      className="block text-sm text-gray-600 rounded-lg px-3 py-2 hover:bg-gray-50"
                    >
                      Flat Tummy
                    </Link>
                    <Link
                      href="/results/body-shaping"
                      onClick={onClose}
                      className="block text-sm text-gray-600 rounded-lg px-3 py-2 hover:bg-gray-50"
                    >
                      Body Shaping
                    </Link>
                    <Link
                      href="/results/firming-tightening"
                      onClick={onClose}
                      className="block text-sm text-gray-600 rounded-lg px-3 py-2 hover:bg-gray-50"
                    >
                      Firming &amp; Tightening
                    </Link>
                    <Link
                      href="/results/skin-glow"
                      onClick={onClose}
                      className="block text-sm text-gray-600 rounded-lg px-3 py-2 hover:bg-gray-50"
                    >
                      Skin Glow
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/offers"
                onClick={onClose}
                className="block text-[15px] font-medium text-black rounded-xl px-3 py-3 hover:bg-gray-50"
              >
                Offers
              </Link>

              <Link
                href="/about"
                onClick={onClose}
                className="block text-[15px] font-medium text-black rounded-xl px-3 py-3 hover:bg-gray-50"
              >
                About
              </Link>
            </nav>

            {/* Footer */}
            <div className="px-5 py-5 border-t border-gray-100 mt-auto">
              <div className="flex gap-4 mb-4">
                <Link
                  href="https://instagram.com/dubaivipodozi"
                  target="_blank"
                  className="text-[10px] uppercase tracking-widest font-bold text-gray-600"
                >
                  Instagram
                </Link>
                <Link
                  href="https://facebook.com/dubaivipodozi"
                  target="_blank"
                  className="text-[10px] uppercase tracking-widest font-bold text-gray-600"
                >
                  Facebook
                </Link>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-gray-500">
                <MessageCircle size={14} />
                <span>Need help? Chat with us</span>
              </div>

              <p className="text-[9px] text-gray-300 uppercase mt-4">
                Developed by <span className="font-bold text-gray-800">CS BUILDERS</span>
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

