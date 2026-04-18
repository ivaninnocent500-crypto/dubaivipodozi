// app/api/webhooks/payments/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // 1. Verify the signature (Security: Ensure this actually came from your provider)
    // const isValid = verifyProviderSignature(req.headers.get('x-signature'), data);
    // if (!isValid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { reference, status, transaction_id } = data;

    if (status === 'SUCCESS') {
      // 2. Update Order in Supabase
      const { error } = await supabase
        .from('orders')
        .update({ 
          status: 'paid', 
          payment_ref: transaction_id,
          updated_at: new Date().toISOString() 
        })
        .eq('order_id', reference);

      if (error) throw error;

      // 3. Trigger Email/SMS notification to user
      // await sendConfirmationEmail(reference);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
