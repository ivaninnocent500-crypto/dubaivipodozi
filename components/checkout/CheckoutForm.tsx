//components/chechkout/CheckoukForm.tsx
'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import Button from '@/ui/Button'
import LipaHapaModal from './LipaHapaModal'
import { FileText, MessageCircle } from 'lucide-react'

interface CheckoutFormProps {
  total?: number
  shipping?: number
}

const TZS_RATE = 2650

const isValidNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value)

export default function CheckoutForm({
  total,
  shipping = 0,
}: CheckoutFormProps) {
  const router = useRouter()

  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)
  const storeTotal = useCartStore((state) => state.getTotal())

  const [loading, setLoading] = useState(false)
  const [showLipaHapa, setShowLipaHapa] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const itemsSubtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const price = Number(item.product?.price ?? 0)
      const quantity = Number(item.quantity ?? 0)
      return sum + price * quantity
    }, 0)
  }, [items])

  const safeSubtotal = useMemo(() => {
    if (isValidNumber(total) && total > 0) return total
    if (isValidNumber(storeTotal) && storeTotal > 0) return storeTotal
    return itemsSubtotal
  }, [total, storeTotal, itemsSubtotal])

  const safeShipping = isValidNumber(shipping) && shipping > 0 ? shipping : 0
  const grandTotalUSD = safeSubtotal + safeShipping
  const totalTZS = Math.round(grandTotalUSD * TZS_RATE)

  const generateOrderId = () =>
    `DV-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`

  const ensureOrderId = () => {
    if (orderId) return orderId
    const newOrderId = generateOrderId()
    setOrderId(newOrderId)
    return newOrderId
  }

  const validateCustomer = () => {
    if (items.length === 0) {
      alert('Your cart is empty')
      return false
    }

    if (!name.trim() || !phone.trim()) {
      alert('Please enter your name and phone number')
      return false
    }

    return true
  }

  const handleMobilePayment = () => {
    if (!validateCustomer()) return
    ensureOrderId()
    setShowLipaHapa(true)
  }

  const handleDownloadInvoice = async () => {
    if (items.length === 0) {
      alert('Your cart is empty')
      return
    }

    if (!name.trim()) {
      alert('Enter your name first')
      return
    }

    const currentOrderId = ensureOrderId()

    setLoading(true)

    try {
      const res = await fetch('/api/invoice', {
        method: 'POST',
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoiceNo: currentOrderId,
          orderId: currentOrderId,
          items,
          subtotal: safeSubtotal,
          shipping: safeShipping,
          total: grandTotalUSD,
          exchangeRate: TZS_RATE,
          totalTZS,
          user: {
            name: name.trim(),
            phone: phone.trim(),
          },
        }),
      })

      if (!res.ok) {
        const errorText = await res.text().catch(() => '')
        throw new Error(errorText || 'Failed to generate invoice')
      }

      const blob = await res.blob()
      const downloadUrl = window.URL.createObjectURL(blob)

      const disposition = res.headers.get('Content-Disposition')
      const matchedFileName = disposition?.match(/filename="?([^"]+)"?/)
      const fileName = matchedFileName?.[1] || `${currentOrderId}_Invoice.pdf`

      const a = document.createElement('a')
      a.href = downloadUrl
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      a.remove()

      window.URL.revokeObjectURL(downloadUrl)
    } catch (error) {
      console.error('Invoice download failed:', error)
      alert('Could not download invoice. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleWhatsApp = () => {
    if (!validateCustomer()) return

    const currentOrderId = ensureOrderId()

    const summary = items
      .map(
        (item) =>
          `• ${item.product.name} (x${item.quantity}) - $${(
            Number(item.product.price) * Number(item.quantity)
          ).toFixed(2)}`
      )
      .join('\n')

    const msg = encodeURIComponent(
      `ORDER ID: ${currentOrderId}
Name: ${name.trim()}
Phone: ${phone.trim()}

Items:
${summary}

Subtotal: $${safeSubtotal.toFixed(2)}
Shipping: $${safeShipping.toFixed(2)}
Total: $${grandTotalUSD.toFixed(2)}
Total in TZS: ${totalTZS.toLocaleString()} TZS`
    )

    window.open(`https://wa.me/255757374368?text=${msg}`, '_blank')
  }

  const handlePaymentComplete = () => {
    clearCart()
    router.push('/thank-you')
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-xs uppercase font-bold tracking-wider">
          Customer Details
        </h3>

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border-b py-3 outline-none"
        />

        <input
          placeholder="Phone Number (0XXXXXXXXX)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border-b py-3 outline-none"
        />
      </div>

      <div className="bg-gray-50 p-6 flex justify-between">
        <span className="font-medium">Total Amount</span>
        <div className="text-right">
          <div className="font-bold text-lg">
            TZS {totalTZS.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">
            USD ${grandTotalUSD.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Button onClick={handleMobilePayment} disabled={items.length === 0}>
          Pay via Mobile Money
        </Button>

        <button
          onClick={handleDownloadInvoice}
          className="flex items-center justify-center gap-2 border py-3 hover:bg-gray-50 transition disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={loading || items.length === 0}
        >
          <FileText size={14} />
          {loading ? 'Generating...' : 'Download Invoice'}
        </button>

        <button
          onClick={handleWhatsApp}
          className="flex items-center justify-center gap-2 border border-green-500 text-green-600 py-3 hover:bg-green-50 transition disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={items.length === 0}
        >
          <MessageCircle size={14} />
          Order via WhatsApp
        </button>
      </div>

      {showLipaHapa && (
        <LipaHapaModal
          total={totalTZS}
          orderId={orderId}
          onClose={() => setShowLipaHapa(false)}
          onConfirm={handlePaymentComplete}
        />
      )}
    </div>
  )
}
