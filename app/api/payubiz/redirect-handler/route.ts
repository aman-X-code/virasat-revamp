import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Get all the parameters from PayU Biz
    const txnid = searchParams.get('txnid');
    const amount = searchParams.get('amount');
    const productinfo = searchParams.get('productinfo');
    const firstname = searchParams.get('firstname');
    const email = searchParams.get('email');
    const phone = searchParams.get('phone');
    const status = searchParams.get('status');
    const hash = searchParams.get('hash');
    const mihpayid = searchParams.get('mihpayid');
    const mode = searchParams.get('mode');
    
    console.log('PayU Biz redirect received:', {
      txnid,
      amount,
      status,
      mihpayid,
      mode
    });
    
    // Build the redirect URL with all parameters
    const redirectUrl = new URL('/donate/success', request.url);
    
    // Add all the parameters to the redirect URL
    if (txnid) redirectUrl.searchParams.set('txnid', txnid);
    if (amount) redirectUrl.searchParams.set('amount', amount);
    if (productinfo) redirectUrl.searchParams.set('productinfo', productinfo);
    if (firstname) redirectUrl.searchParams.set('firstname', firstname);
    if (email) redirectUrl.searchParams.set('email', email);
    if (phone) redirectUrl.searchParams.set('phone', phone);
    if (status) redirectUrl.searchParams.set('status', status);
    if (hash) redirectUrl.searchParams.set('hash', hash);
    if (mihpayid) redirectUrl.searchParams.set('mihpayid', mihpayid);
    if (mode) redirectUrl.searchParams.set('mode', mode);
    
    // Redirect to the success page
    return NextResponse.redirect(redirectUrl);
    
  } catch (error) {
    console.error('Redirect handler error:', error);
    return NextResponse.redirect(new URL('/donate/failure', request.url));
  }
}

export async function POST(request: NextRequest) {
  // Handle POST requests the same way as GET
  return GET(request);
}
