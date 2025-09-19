import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { processFormData } from '@/lib/security';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting - Always enabled for security
    const clientIP = request.ip || request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const rateLimit = checkRateLimit(`verify-payment:${clientIP}`, 25, 60000); // 25 requests per minute
    
    if (!rateLimit.allowed) {
      console.warn('Verification rate limit exceeded:', {
        clientIP,
        timestamp: new Date().toISOString()
      });
      
      return NextResponse.json(
        { error: 'Too many verification requests. Please wait before trying again.' },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString()
          }
        }
      );
    }

    // Check if PayU Biz credentials are configured
    if (!process.env.PAYUBIZ_MERCHANT_KEY || !process.env.PAYUBIZ_MERCHANT_SALT) {
      return NextResponse.json(
        { error: 'Payment verification not configured' },
        { status: 500 }
      );
    }

    const rawData = await request.json();
    const { 
      txnid, 
      amount, 
      productinfo, 
      firstname, 
      email, 
      status, 
      hash,
      mihpayid,
      mode,
      phone
    } = processFormData(rawData);

    // Validate required fields
    if (!txnid || !amount || !status || !hash) {
      return NextResponse.json(
        { error: 'Missing payment verification data' },
        { status: 400 }
      );
    }

    // Create hash for verification using CORRECT PayU Biz formula
    // sha512(SALT|status|||||||||||email|firstname|productinfo|amount|txnid|key)
    const hashString = `${process.env.PAYUBIZ_MERCHANT_SALT}|${status}|||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${process.env.PAYUBIZ_MERCHANT_KEY}`;
    const calculatedHash = crypto.createHash('sha512').update(hashString).digest('hex');

    // Verify hash
    const isAuthentic = calculatedHash === hash;

    if (isAuthentic && status === 'success') {
      // Payment is authentic and successful
      return NextResponse.json({
        success: true,
        message: 'Payment verified successfully',
        payment_id: mihpayid,
        transaction_id: txnid,
        amount: amount,
        status: status,
        mode: mode,
        customer_details: {
          name: firstname,
          email: email,
          phone: phone
        }
      });
    } else if (isAuthentic && status === 'failure') {
      // Payment failed but hash is authentic
      return NextResponse.json({
        success: false,
        message: 'Payment failed',
        transaction_id: txnid,
        status: status,
        error: 'Payment was not successful'
      });
    } else {
      // Hash verification failed
      return NextResponse.json(
        { error: 'Payment verification failed - Invalid hash' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('PayU Biz payment verification error:', error);
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    );
  }
}
