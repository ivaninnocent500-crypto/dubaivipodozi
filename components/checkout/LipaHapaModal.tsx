// components/checkout/LipaHapaModal.tsx

import { motion } from 'framer-motion'
import { Copy, CheckCircle2, X } from 'lucide-react'
import { useState } from 'react'
import Button from '@/components/ui/Button'

interface LipaHapaModalProps {
  total: number // ✅ already TZS from parent
  orderId: string
  onClose: () => void
  onConfirm: () => void
}

export default function LipaHapaModal({
  total,
  orderId,
  onClose,
  onConfirm
}: LipaHapaModalProps) {

  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white max-w-md w-full overflow-hidden shadow-2xl rounded-sm"
      >

        {/* HEADER */}
        <div className="bg-gray-900 text-white p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>

          <h3 className="font-heading text-2xl tracking-wide">
            Lipa Hapa
          </h3>

          <p className="text-gray-400 text-xs uppercase tracking-widest mt-1">
            Manual Payment Instructions
          </p>
        </div>

        {/* BODY */}
        <div className="p-8 space-y-6">

          {/* TOTAL (already TZS from parent) */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">
              Total Amount Due
            </p>
            <p className="text-3xl font-bold text-gray-900">
              TZS {total.toLocaleString()}
            </p>
          </div>

          {/* LIPA NAMBA */}
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase text-gray-400 font-bold">
                  Lipa Namba (Vodacom)
                </p>
                <p className="text-xl font-mono tracking-tighter text-black">
                  07573774368
                </p>
              </div>

              <button
                onClick={() => copyToClipboard('0757374368')}
                className="text-black hover:bg-white p-2 rounded-full transition-colors"
              >
                {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
              </button>
            </div>

            {/* INSTRUCTIONS */}
            <div className="text-sm text-gray-600 space-y-2">
              <p className="flex gap-3">
                <span className="font-bold">1.</span>
                Dial *150*00# (M-Pesa)
              </p>
              <p className="flex gap-3">
                <span className="font-bold">2.</span>
                Choose &apos;Lipa kwa M-Pesa&apos;
              </p>
              <p className="flex gap-3">
                <span className="font-bold">3.</span>
                Enter Lipa Namba & amount
              </p>
              <p className="flex gap-3">
                <span className="font-bold">4.</span>
                Use Order ID <span className="font-bold">#{orderId}</span>
              </p>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="space-y-3">

            <Button
              onClick={handleConfirm}
              className="w-full py-4 uppercase tracking-widest text-xs font-bold"
            >
              I Have Completed Payment
            </Button>

            <button
              onClick={onClose}
              className="w-full text-center text-xs text-gray-500 underline"
            >
              Cancel
            </button>

          </div>

        </div>
      </motion.div>
    </div>
  )
}