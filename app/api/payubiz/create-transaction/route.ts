import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    // Check if PayU Biz credentials are configured
    if (!process.env.PAYUBIZ_MERCHANT_KEY || !process.env.PAYUBIZ_MERCHANT_SALT) {
      return NextResponse.json(
        { error: 'Payment gateway not configured' },
        { status: 500 }
      );
    }

    const { amount, currency = 'INR', firstName, email, phone, productInfo } = await request.json();

    // Simple validation
    if (!amount || amount < 1 || amount > 1000000) {
      return NextResponse.json(
        { error: 'Invalid amount. Must be between ₹1 and ₹10,00,000' },
        { status: 400 }
      );
    }

    if (!firstName || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required' },
        { status: 400 }
      );
    }

    // Generate transaction ID
    const txnid = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Create hash for PayU Biz - EXACT formula as per PayU documentation
    // sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT)
    const udf1 = '';
    const udf2 = '';
    const udf3 = '';
    const udf4 = '';
    const udf5 = '';
    
    const hashString = `${process.env.PAYUBIZ_MERCHANT_KEY}|${txnid}|${amount}|${productInfo || 'Donation'}|${firstName}|${email}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}||||||${process.env.PAYUBIZ_MERCHANT_SALT}`;
    const hash = crypto.createHash('sha512').update(hashString).digest('hex');

    // Get base URL - ensure it doesn't have trailing slashes or duplicate paths
    let baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash
    baseUrl = baseUrl.replace(/\/donate$/, ''); // Remove /donate if it exists
    
    const successUrl = `${baseUrl}/donate/success`;
    const failureUrl = `${baseUrl}/donate/failure`;
    
    const transactionData = {
      key: process.env.PAYUBIZ_MERCHANT_KEY,
      txnid,
      amount,
      productinfo: productInfo || 'Donation',
      firstname: firstName,
      email,
      phone,
      surl: successUrl,
      furl: failureUrl,
      hash,
      service_provider: 'payu_paisa'
    };

    return NextResponse.json({
      success: true,
      transactionData
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create transaction' },
      { status: 500 }
    );
  }
}
