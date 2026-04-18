//app/layout
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import  './globals.css'
import HeaderWrapper from '@/ui/HeaderWrapper'
import Footer from '@/ui/Footer'
import CartDrawer from '@/components/cart/CartDrawer'
import QuizModal from '@/components/quiz/QuizModal'

// Optimized fonts with swap to prevent invisible text during load
const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap' 
})

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-playfair',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Dubai Vipodozi | Luxury Skincare & Fragrance',
  description: 'Premium skincare from La Roche-Posay and CeraVe.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body 
        className="bg-white text-gray-900 antialiased font-body" 
        suppressHydrationWarning
      >
        <HeaderWrapper />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CartDrawer />
        <QuizModal />
      </body>
    </html>
  )
}

