import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('PayU success callback received at /api/donate/success');
    }
    
    // Get the form data from PayU's POST request
    const formData = await request.formData();
    
    // Extract payment details from PayU response
    const paymentId = formData.get('mihpayid') || formData.get('payment_id') || formData.get('id') || formData.get('txnid');
    const transactionId = formData.get('txnid') || formData.get('transaction_id') || formData.get('order_id');
    const amount = formData.get('amount');
    const status = formData.get('status');
    const email = formData.get('email');
    const firstname = formData.get('firstname');
    
    // Log all callback data for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('PayU Success Callback Data:', {
        paymentId,
        transactionId,
        amount,
        status,
        email,
        firstname,
        allFormData: Object.fromEntries(formData.entries())
      });
    }
    
    // Create URL parameters for the success page
    const params = new URLSearchParams();
    if (paymentId) params.set('payment_id', paymentId.toString());
    if (transactionId) params.set('transaction_id', transactionId.toString());
    if (amount) params.set('amount', amount.toString());
    if (status) params.set('status', status.toString());
    if (email) params.set('email', email.toString());
    if (firstname) params.set('firstname', firstname.toString());
    
    // Redirect to the success page with parameters
    const redirectUrl = `/donate/success?${params.toString()}`;
    if (process.env.NODE_ENV === 'development') {
      console.log('Redirecting to:', redirectUrl);
    }
    
    return NextResponse.redirect(new URL(redirectUrl, request.url));
    
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error processing PayU success callback:', error);
    }
    
    // Redirect to success page even if there's an error
    return NextResponse.redirect(new URL('/donate/success?status=success&error=callback_error', request.url));
  }
}

// Also handle GET requests for direct access
export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV === 'development') {
    console.log('GET request to /api/donate/success - redirecting to success page');
  }
  return NextResponse.redirect(new URL('/donate/success', request.url));
}