import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, emailTemplates, generateReceiptPDF } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    // Get the form data from PayU
    const formData = await request.formData();
    
    // Extract PayU response parameters
    const paymentId = formData.get('mihpayid') as string;
    const transactionId = formData.get('txnid') as string;
    const amount = formData.get('amount') as string;
    const status = formData.get('status') as string;
    const email = formData.get('email') as string;
    const firstname = formData.get('firstname') as string;
    
    // Send receipt emails for successful payments
    if (status === 'success' && paymentId && email && firstname && amount) {
      try {
        const donationData = {
          donorName: firstname,
          donorEmail: email,
          amount: parseFloat(amount),
          paymentId: paymentId,
          orderId: transactionId || paymentId,
          date: new Date().toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        };

        // Generate PDF receipt
        const pdfBuffer = await generateReceiptPDF(donationData);
        
        // Send receipt email to donor
        const donorTemplate = emailTemplates.donationReceipt(donationData);
        await sendEmail(
          donationData.donorEmail,
          donorTemplate.subject,
          donorTemplate.html,
          donorTemplate.text,
          [{
            filename: `donation-receipt-${donationData.paymentId}.pdf`,
            content: Buffer.from(pdfBuffer),
            contentType: 'application/pdf'
          }]
        );

        // Send notification to admin
        const adminTemplate = emailTemplates.adminNotification(donationData);
        await sendEmail(
          process.env.ADMIN_EMAIL || 'virasat.reach@gmail.com',
          adminTemplate.subject,
          adminTemplate.html,
          adminTemplate.text
        );

      } catch (emailError) {
        // Don't fail the payment for email issues - log error in production logs
        if (process.env.NODE_ENV === 'development') {
          console.error('Email sending failed:', emailError);
        }
      }
    }
    
    // Redirect to success page with parameters
    const successUrl = new URL('/donate/success', request.url);
    successUrl.searchParams.set('payment_id', paymentId || '');
    successUrl.searchParams.set('transaction_id', transactionId || '');
    successUrl.searchParams.set('amount', amount || '');
    successUrl.searchParams.set('status', status || 'success');
    successUrl.searchParams.set('email', email || '');
    successUrl.searchParams.set('firstname', firstname || '');
    
    return NextResponse.redirect(successUrl, 302);
    
  } catch (error) {
    // Log error only in development
    if (process.env.NODE_ENV === 'development') {
      console.error('PayU success callback error:', error);
    }
    
    // Redirect to success page even if there's an error
    const successUrl = new URL('/donate/success', request.url);
    successUrl.searchParams.set('status', 'success');
    successUrl.searchParams.set('error', 'callback_error');
    return NextResponse.redirect(successUrl, 302);
  }
}

// Also handle GET requests (fallback)
export async function GET(request: NextRequest) {
  // Redirect to success page
  const successUrl = new URL('/donate/success', request.url);
  return NextResponse.redirect(successUrl);
}