import { NextRequest, NextResponse } from 'next/server';

// This route handles PayU callbacks that come to /donate/success-redirect
// and redirects them to the proper API endpoint
export async function POST(request: NextRequest) {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('PayU callback received at /donate/success-redirect - redirecting to API');
    }
    
    // Get the form data from PayU's POST request
    const formData = await request.formData();
    
    // Log all the data for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('PayU callback data:', Object.fromEntries(formData.entries()));
    }
    
    // Create a new request to the proper API endpoint
    const apiUrl = new URL('/api/payment/success', request.url);
    
    // Forward the POST request to the API endpoint
    const response = await fetch(apiUrl.toString(), {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    
    // If the API call was successful, redirect to the response location
    if (response.redirected) {
      return NextResponse.redirect(response.url);
    }
    
    // Fallback: redirect to success page manually
    const paymentId = formData.get('mihpayid') || formData.get('payment_id') || formData.get('txnid');
    const transactionId = formData.get('txnid') || formData.get('transaction_id');
    const amount = formData.get('amount');
    const status = formData.get('status');
    const email = formData.get('email');
    const firstname = formData.get('firstname');
    
    const params = new URLSearchParams();
    if (paymentId) params.set('payment_id', paymentId.toString());
    if (transactionId) params.set('transaction_id', transactionId.toString());
    if (amount) params.set('amount', amount.toString());
    if (status) params.set('status', status.toString());
    if (email) params.set('email', email.toString());
    if (firstname) params.set('firstname', firstname.toString());
    
    const redirectUrl = `/donate/success?${params.toString()}`;
    return NextResponse.redirect(new URL(redirectUrl, request.url));
    
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error in success redirect:', error);
    }
    return NextResponse.redirect(new URL('/donate/success?status=success&error=redirect_error', request.url));
  }
}

export async function GET(request: NextRequest) {
  // Redirect GET requests to the success page
  return NextResponse.redirect(new URL('/donate/success', request.url));
}