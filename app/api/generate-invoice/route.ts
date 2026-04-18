// app/api/invoice/route.ts
import { NextResponse } from 'next/server'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

export async function POST(req: Request) {
  try {
    const { items, total, user, invoiceNo = `DV-${Date.now().toString().slice(-5)}` } = await req.json()

    // Calculate total from items if not provided or invalid
    const calculatedTotal = items.reduce((sum: number, item: any) => sum + (item.product.price * item.quantity), 0)
    const finalTotal = typeof total === 'number' && !isNaN(total) ? total : calculatedTotal

    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([600, 850])
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

    const drawLine = (yPos: number) => {
      page.drawLine({
        start: { x: 50, y: yPos },
        end: { x: 550, y: yPos },
        thickness: 1,
        color: rgb(0.9, 0.85, 0.8),
      })
    }

    // Branding
    page.drawText('DUBAI VIPODOZI', { x: 200, y: 780, size: 24, font: helveticaBold, color: rgb(0.2, 0.15, 0.1) })
    page.drawText('Luxury Skincare & Fragrance', { x: 215, y: 765, size: 10, font: helvetica, color: rgb(0.5, 0.4, 0.3) })
    page.drawText('INVOICE', { x: 260, y: 720, size: 18, font: helveticaBold })

    // Meta & client
    page.drawText(`Invoice No: ${invoiceNo}`, { x: 430, y: 780, size: 9, font: helvetica })
    page.drawText(`Date: ${new Date().toLocaleDateString()}`, { x: 430, y: 765, size: 9, font: helvetica })
    page.drawText('Billed To:', { x: 50, y: 680, size: 12, font: helveticaBold, color: rgb(0.6, 0.4, 0.2) })
    page.drawText(user?.name || 'Valued Customer', { x: 50, y: 660, size: 11, font: helvetica })

    // Table header
    let currentY = 600
    page.drawRectangle({ x: 50, y: currentY - 5, width: 500, height: 25, color: rgb(0.97, 0.95, 0.92) })
    page.drawText('Description', { x: 60, y: currentY, size: 10, font: helveticaBold })
    page.drawText('QTY', { x: 400, y: currentY, size: 10, font: helveticaBold })
    page.drawText('TOTAL', { x: 520, y: currentY, size: 10, font: helveticaBold })

    // Items
    currentY -= 30
    items.forEach((item: any) => {
      const name = item.product.name.substring(0, 40)
      const qty = item.quantity
      const lineTotal = item.product.price * qty
      page.drawText(name, { x: 60, y: currentY, size: 9, font: helvetica })
      page.drawText(`${qty}`, { x: 405, y: currentY, size: 9, font: helvetica })
      page.drawText(`$${lineTotal.toFixed(2)}`, { x: 520, y: currentY, size: 9, font: helvetica })
      currentY -= 20
    })

    drawLine(currentY)
    currentY -= 25
    page.drawText('Total Amount:', { x: 420, y: currentY, size: 12, font: helveticaBold })
    page.drawText(`$${finalTotal.toFixed(2)}`, { x: 520, y: currentY, size: 12, font: helveticaBold })

    // Payment instructions
    currentY -= 60
    page.drawText('Payment Instructions:', { x: 50, y: currentY, size: 11, font: helveticaBold })
    page.drawText('Please pay via M-Pesa/TigoPesa to Lipa Namba provided on checkout.', { x: 50, y: currentY - 20, size: 9, font: helvetica })

    const pdfBytes = await pdfDoc.save()
    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="DubaiVipodozi_Invoice.pdf"',
      },
    })
  } catch (e) {
    console.error('PDF Error:', e)
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 })
  }
}