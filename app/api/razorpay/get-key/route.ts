import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Check if Razorpay key is configured
    if (!process.env.RAZORPAY_KEY_ID) {
      return NextResponse.json(
        { error: 'Payment gateway not configured' },
        { status: 500 }
      );
    }

    // Return only the public key (safe to expose)
    return NextResponse.json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get payment key' },
      { status: 500 }
    );
  }
}
