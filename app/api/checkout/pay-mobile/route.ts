// app/api/checkout/pay-mobile/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { amount, phoneNumber, orderId, provider } = await req.json();

    // 1. Format phone number (e.g., 2557XXXXXXXX)
    const formattedPhone = phoneNumber.replace('+', '').replace(/^0/, '255');

    // 2. Integration with a Gateway (Selcom/Pesapal Example)
    // This is where you call the third-party API
    const response = await fetch('https://api.gateway.com/v1/stk-push', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GATEWAY_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        vendor_id: process.env.VENDOR_ID,
        amount: amount,
        msisdn: formattedPhone,
        reference: orderId,
        remark: 'Scent & Surface Purchase',
        operator: provider, // 'mpesa', 'tigopesa', etc.
      }),
    });

    const data = await response.json();

    if (data.success) {
      return NextResponse.json({ message: 'PIN Prompt Sent', status: 'pending' });
    } else {
      throw new Error('Push failed');
    }
  } catch (error) {
    return NextResponse.json({ error: 'Payment initiation failed' }, { status: 500 });
  }
}

