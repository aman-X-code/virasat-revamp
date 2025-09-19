import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Check if PayU Biz key is configured
    if (!process.env.PAYUBIZ_MERCHANT_KEY) {
      return NextResponse.json(
        { error: 'Payment gateway not configured' },
        { status: 500 }
      );
    }

    // Return only the public key (safe to expose)
    return NextResponse.json({
      success: true,
      key: process.env.PAYUBIZ_MERCHANT_KEY,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get payment key' },
      { status: 500 }
    );
  }
}


