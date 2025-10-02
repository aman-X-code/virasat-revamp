import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Handle PayU POST callbacks that come to /donate/success or /donate/failure
  // But ONLY if they are direct requests, not redirects from our API
  if (request.method === 'POST' && !request.headers.get('x-redirect-from-api')) {
    if (request.nextUrl.pathname === '/donate/success') {
      if (process.env.NODE_ENV === 'development') {
        console.log('🚀 Middleware: Redirecting PayU POST from /donate/success to /api/donate/success');
      }
      
      // Create new URL for the API endpoint
      const apiUrl = new URL('/api/donate/success', request.url);
      
      // Forward the POST request to the API endpoint
      return NextResponse.rewrite(apiUrl);
    }
    
    if (request.nextUrl.pathname === '/donate/failure') {
      if (process.env.NODE_ENV === 'development') {
        console.log('🚀 Middleware: Redirecting PayU POST from /donate/failure to /api/donate/failure');
      }
      
      // Create new URL for the API endpoint
      const apiUrl = new URL('/api/donate/failure', request.url);
      
      // Forward the POST request to the API endpoint
      return NextResponse.rewrite(apiUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/donate/success',
    '/donate/failure'
  ]
};