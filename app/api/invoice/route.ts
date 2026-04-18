import { NextResponse } from 'next/server'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

export const runtime = 'nodejs'

type InvoiceItem = {
  product?: {
    name?: string
    price?: number
  }
  quantity?: number
}

const TZS_RATE_DEFAULT = 2650

const isValidNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value)

const formatUSD = (amount: number) => `$${amount.toFixed(2)}`
const formatTZS = (amount: number) => `TZS ${Math.round(amount).toLocaleString()}`

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const items: InvoiceItem[] = Array.isArray(body?.items) ? body.items : []

    if (items.length === 0) {
      return NextResponse.json(
        { error: 'Cannot generate invoice for an empty cart.' },
        { status: 400 }
      )
    }

    const calculatedSubtotal = items.reduce((sum, item) => {
      const price = Number(item.product?.price ?? 0)
      const quantity = Number(item.quantity ?? 0)
      return sum + price * quantity
    }, 0)

    const shipping =
      isValidNumber(body?.shipping) && body.shipping >= 0 ? body.shipping : 0

    const subtotal =
      isValidNumber(body?.subtotal) && body.subtotal > 0
        ? body.subtotal
        : calculatedSubtotal

    const total =
      isValidNumber(body?.total) && body.total > 0
        ? body.total
        : subtotal + shipping

    const exchangeRate =
      isValidNumber(body?.exchangeRate) && body.exchangeRate > 0
        ? body.exchangeRate
        : TZS_RATE_DEFAULT

    const totalTZS =
      isValidNumber(body?.totalTZS) && body.totalTZS > 0
        ? body.totalTZS
        : Math.round(total * exchangeRate)

    const invoiceNo =
      typeof body?.invoiceNo === 'string' && body.invoiceNo.trim()
        ? body.invoiceNo.trim()
        : `DV-${Date.now()}`

    const customerName =
      typeof body?.user?.name === 'string' && body.user.name.trim()
        ? body.user.name.trim()
        : 'Valued Customer'

    const customerPhone =
      typeof body?.user?.phone === 'string' && body.user.phone.trim()
        ? body.user.phone.trim()
        : 'N/A'

    const pdfDoc = await PDFDocument.create()
    let page = pdfDoc.addPage([595, 842])

    const regular = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

    const colorPrimary = rgb(0.2, 0.15, 0.1)
    const colorMuted = rgb(0.45, 0.45, 0.45)
    const colorAccent = rgb(0.95, 0.93, 0.9)
    const colorLine = rgb(0.86, 0.84, 0.82)

    let y = 790

    const drawLine = (yPos: number) => {
      page.drawLine({
        start: { x: 40, y: yPos },
        end: { x: 555, y: yPos },
        thickness: 1,
        color: colorLine,
      })
    }

    const drawTableHeader = () => {
      page.drawRectangle({
        x: 40,
        y: y - 6,
        width: 515,
        height: 22,
        color: colorAccent,
      })

      page.drawText('Description', {
        x: 50,
        y,
        size: 10,
        font: bold,
        color: colorPrimary,
      })

      page.drawText('Qty', {
        x: 360,
        y,
        size: 10,
        font: bold,
        color: colorPrimary,
      })

      page.drawText('Unit', {
        x: 420,
        y,
        size: 10,
        font: bold,
        color: colorPrimary,
      })

      page.drawText('Line Total', {
        x: 485,
        y,
        size: 10,
        font: bold,
        color: colorPrimary,
      })

      y -= 28
    }

    const startNewPage = () => {
      page = pdfDoc.addPage([595, 842])
      y = 790
      page.drawText('DUBAI VIPODOZI', {
        x: 40,
        y,
        size: 18,
        font: bold,
        color: colorPrimary,
      })
      y -= 24
      drawTableHeader()
    }

    // Header
    page.drawText('DUBAI VIPODOZI', {
      x: 40,
      y,
      size: 22,
      font: bold,
      color: colorPrimary,
    })

    page.drawText('Luxury Skincare & Fragrance', {
      x: 40,
      y: y - 18,
      size: 10,
      font: regular,
      color: colorMuted,
    })

    page.drawText('INVOICE', {
      x: 430,
      y,
      size: 18,
      font: bold,
      color: colorPrimary,
    })

    page.drawText(`Invoice No: ${invoiceNo}`, {
      x: 400,
      y: y - 20,
      size: 10,
      font: regular,
      color: colorMuted,
    })

    page.drawText(`Date: ${new Date().toLocaleDateString()}`, {
      x: 400,
      y: y - 36,
      size: 10,
      font: regular,
      color: colorMuted,
    })

    y -= 70
    drawLine(y)
    y -= 28

    page.drawText('Billed To', {
      x: 40,
      y,
      size: 12,
      font: bold,
      color: colorPrimary,
    })

    page.drawText(customerName, {
      x: 40,
      y: y - 18,
      size: 11,
      font: regular,
      color: colorPrimary,
    })

    page.drawText(`Phone: ${customerPhone}`, {
      x: 40,
      y: y - 36,
      size: 10,
      font: regular,
      color: colorMuted,
    })

    y -= 80
    drawTableHeader()

    for (const item of items) {
      if (y < 120) {
        startNewPage()
      }

      const name = (item.product?.name || 'Unnamed product').slice(0, 42)
      const qty = Number(item.quantity ?? 0)
      const unitPrice = Number(item.product?.price ?? 0)
      const lineTotal = qty * unitPrice

      page.drawText(name, {
        x: 50,
        y,
        size: 10,
        font: regular,
        color: colorPrimary,
      })

      page.drawText(String(qty), {
        x: 365,
        y,
        size: 10,
        font: regular,
        color: colorPrimary,
      })

      page.drawText(formatUSD(unitPrice), {
        x: 415,
        y,
        size: 10,
        font: regular,
        color: colorPrimary,
      })

      page.drawText(formatUSD(lineTotal), {
        x: 485,
        y,
        size: 10,
        font: regular,
        color: colorPrimary,
      })

      y -= 20
    }

    y -= 8
    drawLine(y)
    y -= 28

    page.drawText('Subtotal', {
      x: 410,
      y,
      size: 11,
      font: regular,
      color: colorPrimary,
    })

    page.drawText(formatUSD(subtotal), {
      x: 485,
      y,
      size: 11,
      font: regular,
      color: colorPrimary,
    })

    y -= 18

    page.drawText('Shipping', {
      x: 410,
      y,
      size: 11,
      font: regular,
      color: colorPrimary,
    })

    page.drawText(formatUSD(shipping), {
      x: 485,
      y,
      size: 11,
      font: regular,
      color: colorPrimary,
    })

    y -= 22

    page.drawText('Grand Total', {
      x: 410,
      y,
      size: 12,
      font: bold,
      color: colorPrimary,
    })

    page.drawText(formatUSD(total), {
      x: 485,
      y,
      size: 12,
      font: bold,
      color: colorPrimary,
    })

    y -= 18

    page.drawText('Total in TZS', {
      x: 410,
      y,
      size: 11,
      font: regular,
      color: colorPrimary,
    })

    page.drawText(formatTZS(totalTZS), {
      x: 465,
      y,
      size: 11,
      font: bold,
      color: colorPrimary,
    })

    y -= 40
    drawLine(y)
    y -= 25

    page.drawText('Payment Instructions:', {
      x: 40,
      y,
      size: 11,
      font: bold,
      color: colorPrimary,
    })

    page.drawText(
      'Please pay using the Mobile Money details provided on the checkout page.',
      {
        x: 40,
        y: y - 18,
        size: 10,
        font: regular,
        color: colorMuted,
      }
    )

    const pdfBytes = await pdfDoc.save()

    // We changed the name from 'body' to 'pdfBuffer' to avoid the name clash
    const pdfBuffer = Buffer.from(pdfBytes)

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${invoiceNo}_Invoice.pdf"`,
        'Cache-Control': 'no-store',
      },
    })
  } catch (error) {
    console.error('Invoice generation error:', error)

    return NextResponse.json(
      { error: 'Failed to generate invoice.' },
      { status: 500 }
    )
  }
}
