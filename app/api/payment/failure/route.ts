import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, emailTemplates } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    // Get the form data from PayU
    const formData = await request.formData();
    
    // Extract PayU response parameters
    const paymentId = formData.get('mihpayid') as string;
    const transactionId = formData.get('txnid') as string;
    const amount = formData.get('amount') as string;
    const status = formData.get('status') as string;
    const error = formData.get('error') as string;
    const errorMessage = formData.get('error_Message') as string;
    
    // Redirect to failure page with parameters
    const failureUrl = new URL('/donate/failure', request.url);
    failureUrl.searchParams.set('payment_id', paymentId || '');
    failureUrl.searchParams.set('transaction_id', transactionId || '');
    failureUrl.searchParams.set('amount', amount || '');
    failureUrl.searchParams.set('status', status || 'failure');
    failureUrl.searchParams.set('error', error || '');
    failureUrl.searchParams.set('error_message', errorMessage || 'Payment failed');
    
    return NextResponse.redirect(failureUrl, 302);
    
  } catch (error) {
    // Log error only in development
    if (process.env.NODE_ENV === 'development') {
      console.error('PayU failure callback error:', error);
    }
    
    // Redirect to failure page even if there's an error
    const failureUrl = new URL('/donate/failure', request.url);
    failureUrl.searchParams.set('status', 'failure');
    failureUrl.searchParams.set('error', 'callback_error');
    failureUrl.searchParams.set('error_message', 'Payment processing failed');
    return NextResponse.redirect(failureUrl, 302);
  }
}

// Also handle GET requests (fallback)
export async function GET(request: NextRequest) {
  // Redirect to failure page
  const failureUrl = new URL('/donate/failure', request.url);
  return NextResponse.redirect(failureUrl);
}
