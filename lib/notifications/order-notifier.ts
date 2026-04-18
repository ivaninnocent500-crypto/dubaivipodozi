// lib/notifications/order-notifier.ts

export async function sendOrderNotifications(orderId: string, userData: any, items: any[], total: number) {
  try {
    // 1. Generate the PDF Invoice first (using the API we built)
    const invoiceResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/invoice`, {
      method: 'POST',
      body: JSON.stringify({ items, total, user: userData, invoiceNo: orderId }),
    });
    const pdfBlob = await invoiceResponse.blob();

    // 2. Trigger WhatsApp Message
    // This uses a service like Twilio or Vonage
    await fetch('https://api.twilio.com/2010-04-01/Accounts/.../Messages.json', {
      method: 'POST',
      headers: { 'Authorization': 'Basic ' + btoa('AC_SID:AUTH_TOKEN') },
      body: new URLSearchParams({
        'To': `whatsapp:${userData.phone}`,
        'From': 'whatsapp:+255620148904', // Your verified Business Number
        'Body': `Habari ${userData.name}! Order yako #${orderId} imepokelewa. Jumla ni TZS ${total.toLocaleString()}. Utapokea invoice yako ya PDF sasa hivi. Asante kwa kuchagua Dubai Vipodozi!`
      })
    });

    // 3. Send Email via Resend or Nodemailer
    // attach the pdfBlob here...
    console.log(`Notifications sent for Order ${orderId}`);
    
  } catch (error) {
    console.error('Notification System Error:', error);
  }
}
