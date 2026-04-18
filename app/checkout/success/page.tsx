// app/checkout/success/page.tsx
'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Download, MessageCircle, Home } from 'lucide-react'
import Link from 'next/link'
import Button from '@/ui/Button'

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white p-8 text-center shadow-xl border border-gray-100"
      >
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
            <CheckCircle className="text-green-500" size={48} />
          </div>
        </div>

        <h1 className="font-heading text-3xl mb-2">Order Confirmed!</h1>
        <p className="text-gray-500 mb-8">
          Thank you for your purchase. Your luxury skincare items are being prepared for delivery.
        </p>

        <div className="space-y-3">
          <Button className="w-full flex items-center justify-center gap-2">
            <Download size={18} />
            Download PDF Invoice
          </Button>
          
          <Link href="https://wa.me/255XXXXXXXXX" target="_blank" className="block">
            <Button variant="outline" className="w-full flex items-center justify-center gap-2 border-green-200 text-green-600 hover:bg-green-50">
              <MessageCircle size={18} />
              Chat with us on WhatsApp
            </Button>
          </Link>

          <Link href="/" className="block pt-4 text-sm text-gray-400 hover:text-accent transition-colors">
            <div className="flex items-center justify-center gap-2">
              <Home size={14} />
              Back to Store
            </div>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

