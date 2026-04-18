'use client'
import { useCartStore } from '@/store/cartStore'
import Button from './Button'
import { trackEvent } from '@/lib/analytics/track'

interface WhatsAppInquiryButtonProps {
  user?: { name: string; email: string }
  className?: string
}

const WhatsAppInquiryButton = ({ user, className }: WhatsAppInquiryButtonProps) => {
  const items = useCartStore((state) => state.items)
  const total = useCartStore((state) => state.getTotal())

  const handleSendInquiry = async () => {
    let message = 'Hello! I would like to inquire about the following items:\n\n'
    items.forEach((item) => {
      message += `• ${item.product.name} – Qty: ${item.quantity} – $${(item.product.price * item.quantity).toFixed(2)}\n`
      if (item.giftWrap) message += `  (Gift wrap + message: "${item.giftMessage || '—'}")\n`
    })
    message += `\nTotal: $${total.toFixed(2)}\n\n`
    if (user?.name) message += `Customer: ${user.name}\n`
    if (user?.email) message += `Email: ${user.email}\n`

    const encodedMessage = encodeURIComponent(message)
    // Replace with your actual WhatsApp business number (include country code)
    const whatsappUrl = `https://wa.me/1234567890?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')

    // Generate and download PDF invoice
    try {
      const response = await fetch('/api/generate-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, total, user: user || { name: 'Guest', email: '' } }),
      })
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'invoice.pdf'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('PDF generation failed', error)
      alert('Invoice could not be generated. Please contact support.')
    }

    trackEvent('whatsapp_inquiry', { items_count: items.length, total })
  }

  if (items.length === 0) return null

  return (
    <Button onClick={handleSendInquiry} variant="outline" className={className}>
      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.967-.94 1.165-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.01-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      </svg>
      Send Inquiry via WhatsApp
    </Button>
  )
}

export default WhatsAppInquiryButton