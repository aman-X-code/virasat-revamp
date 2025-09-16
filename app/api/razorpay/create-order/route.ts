import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { validateAmount, processFormData } from '@/lib/security';
import { checkRateLimit } from '@/lib/rate-limit';

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    const rateLimit = checkRateLimit(`create-order:${clientIP}`, 5, 60000); // 5 requests per minute
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString()
          }
        }
      );
    }

    // Check if Razorpay credentials are configured
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { error: 'Payment gateway not configured' },
        { status: 500 }
      );
    }

    const rawData = await request.json();
    const { amount, currency = 'INR', receipt, notes } = processFormData(rawData);

    // Validate amount using security utilities
    const amountValidation = validateAmount(amount);
    if (!amountValidation.isValid) {
      return NextResponse.json(
        { error: amountValidation.errors[0] },
        { status: 400 }
      );
    }

    // Additional validation for currency
    if (currency !== 'INR') {
      return NextResponse.json(
        { error: 'Only INR currency is supported' },
        { status: 400 }
      );
    }

    // Create order options
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      notes: {
        ...notes,
        source: 'virasat_donation',
        timestamp: new Date().toISOString(),
      },
    };

    // Create order
    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
