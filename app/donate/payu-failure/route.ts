import { NextRequest, NextResponse } from 'next/server';

// This route handles PayU POST callbacks for failures and redirects to the failure page
export async function POST(request: NextRequest) {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('PayU failure callback received at /donate/payu-failure');
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
    const error = formData.get('error') || formData.get('error_Message');
    
    // Log all callback data for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('PayU Failure Callback Data:', {
        paymentId,
        transactionId,
        amount,
        status,
        email,
        firstname,
        error,
        allFormData: Object.fromEntries(formData.entries())
      });
    }
    
    // Create URL parameters for the failure page
    const params = new URLSearchParams();
    if (paymentId) params.set('payment_id', paymentId.toString());
    if (transactionId) params.set('transaction_id', transactionId.toString());
    if (amount) params.set('amount', amount.toString());
    if (status) params.set('status', status.toString());
    if (email) params.set('email', email.toString());
    if (firstname) params.set('firstname', firstname.toString());
    if (error) params.set('error', error.toString());
    
    // Redirect to the failure page with parameters
    const redirectUrl = `/donate/failure?${params.toString()}`;
    if (process.env.NODE_ENV === 'development') {
      console.log('Redirecting to:', redirectUrl);
    }
    
    return NextResponse.redirect(new URL(redirectUrl, request.url));
    
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error processing PayU failure callback:', error);
    }
    
    // Redirect to failure page even if there's an error
    return NextResponse.redirect(new URL('/donate/failure?status=failure&error=callback_error', request.url));
  }
}

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV === 'development') {
    console.log('GET request to /donate/payu-failure - redirecting to failure page');
  }
  return NextResponse.redirect(new URL('/donate/failure', request.url));
}