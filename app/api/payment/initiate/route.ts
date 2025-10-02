import { NextRequest, NextResponse } from 'next/server';
import { createPayUPaymentData, validatePayUConfig } from '@/lib/payu';
import { rateLimit } from '@/lib/rate-limit';
import { validateAmount } from '@/lib/security';

export async function POST(request: NextRequest) {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('Payment initiation request received');
      console.log('Environment:', process.env.NODE_ENV);
      console.log('Request URL:', request.url);
    }
    
    // Validate PayU configuration first
    const configValidation = validatePayUConfig();
    if (process.env.NODE_ENV === 'development') {
      console.log('Config validation result:', configValidation);
    }
    
    if (!configValidation.isValid) {
      if (process.env.NODE_ENV === 'development') {
        console.error('PayU configuration errors:', configValidation.errors);
      }
      
      // In development, provide helpful error message
      const isDevelopment = process.env.NODE_ENV === 'development';
      const errorMessage = isDevelopment 
        ? `PayU Configuration Missing: ${configValidation.errors.join(', ')}. Please check your .env.local file.`
        : 'Payment system configuration error. Please contact support.';
        
      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      );
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.log('PayU configuration validated successfully');
    }

    // Rate limiting - temporarily disabled for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('Skipping rate limiting for debugging');
    }
    // const rateLimitResult = await rateLimit(request);
    // if (!rateLimitResult.success) {
    //   return NextResponse.json(
    //     { error: 'Too many requests. Please try again later.' },
    //     { status: 429 }
    //   );
    // }

    const body = await request.json();
    if (process.env.NODE_ENV === 'development') {
      console.log('Request body received:', body);
    }
    const { amount, name, email, phone } = body;

    // Validate required fields
    if (!amount || !name || !email || !phone) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Missing required fields:', { amount, name, email, phone });
      }
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate amount
    const donationAmount = parseFloat(amount);
    const amountValidation = validateAmount(donationAmount);
    if (!amountValidation.isValid) {
      return NextResponse.json(
        { error: amountValidation.errors[0] },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create PayU payment data
    if (process.env.NODE_ENV === 'development') {
      console.log('Creating PayU payment data for amount:', donationAmount);
      console.log('Donor details:', { name: name.trim(), email: email.trim(), phone: phone.trim() });
    }
    
    const paymentData = createPayUPaymentData(
      donationAmount,
      name.trim(),
      email.trim(),
      phone.trim()
    );

    if (process.env.NODE_ENV === 'development') {
      console.log('Payment data created successfully:', {
        txnid: paymentData.txnid,
        amount: paymentData.amount,
        email: paymentData.email,
        hash: paymentData.hash.substring(0, 8) + '...',
        payuUrl: 'https://secure.payu.in/_payment',
        curl: paymentData.curl,
        surl: paymentData.surl,
        furl: paymentData.furl
      });
    }

    return NextResponse.json({
      success: true,
      paymentData,
      payuUrl: 'https://secure.payu.in/_payment'
    });

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Payment initiation error:', error);
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}