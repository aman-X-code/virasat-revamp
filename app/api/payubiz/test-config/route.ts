import { NextRequest, NextResponse } from 'next/server';
import { validatePayUBizConfig } from '@/lib/env-validation';

export async function GET(request: NextRequest) {
  try {
    // Only allow in development mode for security
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Endpoint not available in production' },
        { status: 404 }
      );
    }

    const validation = validatePayUBizConfig();
    
    return NextResponse.json({
      success: validation.isValid,
      errors: validation.errors,
      environment: process.env.NODE_ENV,
      hasKey: !!process.env.PAYUBIZ_MERCHANT_KEY,
      hasSalt: !!process.env.PAYUBIZ_MERCHANT_SALT,
      hasAppUrl: !!process.env.NEXT_PUBLIC_APP_URL,
      keyLength: process.env.PAYUBIZ_MERCHANT_KEY?.length || 0,
      saltLength: process.env.PAYUBIZ_MERCHANT_SALT?.length || 0
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Configuration test failed' },
      { status: 500 }
    );
  }
}