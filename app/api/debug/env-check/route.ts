import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Only allow in development or for debugging
  const isDev = process.env.NODE_ENV === 'development';
  const isDebug = request.nextUrl.searchParams.get('debug') === 'true';
  
  if (!isDev && !isDebug) {
    return NextResponse.json(
      { error: 'Not available' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    environment: process.env.NODE_ENV,
    hasPayUKey: !!process.env.PAYUBIZ_MERCHANT_KEY,
    hasPayUSalt: !!process.env.PAYUBIZ_MERCHANT_SALT,
    hasAppUrl: !!process.env.NEXT_PUBLIC_APP_URL,
    appUrl: process.env.NEXT_PUBLIC_APP_URL,
    payuKeyLength: process.env.PAYUBIZ_MERCHANT_KEY?.length || 0,
    payuSaltLength: process.env.PAYUBIZ_MERCHANT_SALT?.length || 0,
    // Don't expose actual values for security
    payuKeyPreview: process.env.PAYUBIZ_MERCHANT_KEY?.substring(0, 4) + '...',
  });
}