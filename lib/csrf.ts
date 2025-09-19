import crypto from 'crypto';

// CSRF token storage (in production, use Redis or database)
const csrfTokens = new Map<string, { token: string; expires: number }>();

// Clean up expired tokens every 5 minutes
setInterval(() => {
  const now = Date.now();
  csrfTokens.forEach((value, key) => {
    if (now > value.expires) {
      csrfTokens.delete(key);
    }
  });
}, 300000);

export interface CSRFToken {
  token: string;
  expires: number;
}

/**
 * Generate a secure CSRF token
 */
export function generateCSRFToken(sessionId: string): CSRFToken {
  const token = crypto.randomBytes(32).toString('hex');
  const expires = Date.now() + (30 * 60 * 1000); // 30 minutes
  
  csrfTokens.set(sessionId, { token, expires });
  
  return { token, expires };
}

/**
 * Verify CSRF token
 */
export function verifyCSRFToken(sessionId: string, token: string): boolean {
  const stored = csrfTokens.get(sessionId);
  
  if (!stored) {
    return false;
  }
  
  if (Date.now() > stored.expires) {
    csrfTokens.delete(sessionId);
    return false;
  }
  
  return crypto.timingSafeEqual(
    Buffer.from(token, 'hex'),
    Buffer.from(stored.token, 'hex')
  );
}

/**
 * Invalidate CSRF token (use after successful request)
 */
export function invalidateCSRFToken(sessionId: string): void {
  csrfTokens.delete(sessionId);
}

/**
 * Check if CSRF token exists without invalidating it
 */
export function checkCSRFTokenExists(sessionId: string): boolean {
  const record = csrfTokens.get(sessionId);
  return record !== undefined && Date.now() <= record.expires;
}

/**
 * Get session ID from request headers
 */
export function getSessionId(request: Request): string {
  // Try to get session ID from various sources
  const cookieHeader = request.headers.get('cookie');
  const sessionId = request.headers.get('x-session-id');
  
  if (sessionId) {
    return sessionId;
  }
  
  if (cookieHeader) {
    const sessionMatch = cookieHeader.match(/sessionId=([^;]+)/);
    if (sessionMatch) {
      return sessionMatch[1];
    }
  }
  
  // Generate a new session ID if none exists
  return crypto.randomBytes(16).toString('hex');
}

/**
 * Middleware to add CSRF protection to API routes
 */
export function withCSRFProtection(handler: Function) {
  return async (request: Request, context?: any) => {
    // Skip CSRF for GET requests
    if (request.method === 'GET') {
      return handler(request, context);
    }
    
    const sessionId = getSessionId(request);
    const csrfToken = request.headers.get('x-csrf-token');
    
    if (!csrfToken) {
      return new Response(
        JSON.stringify({ error: 'CSRF token required' }),
        { 
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    if (!verifyCSRFToken(sessionId, csrfToken)) {
      return new Response(
        JSON.stringify({ error: 'Invalid CSRF token' }),
        { 
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    // Invalidate token after successful verification
    invalidateCSRFToken(sessionId);
    
    return handler(request, context);
  };
}
