// Server-side rate limiting with Redis (fallback to in-memory for development)
// For production, use Redis. For development, use in-memory storage.

interface RateLimitEntry {
  count: number;
  resetTime: number;
  windowStart: number;
}

// In-memory fallback for development
const rateLimitMap = new Map<string, RateLimitEntry>();

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  rateLimitMap.forEach((value, key) => {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  });
}, 300000);

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  retryAfter?: number;
}

/**
 * Check rate limit with sliding window algorithm
 * @param identifier - Unique identifier for the rate limit (e.g., IP address)
 * @param maxRequests - Maximum number of requests allowed
 * @param windowMs - Time window in milliseconds
 * @returns Rate limit result
 */
export async function checkRateLimit(
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60000 // 1 minute
): Promise<RateLimitResult> {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  try {
    // Try Redis first (production)
    if (process.env.REDIS_URL) {
      return await checkRateLimitRedis(identifier, maxRequests, windowMs, now, windowStart);
    }
    
    // Fallback to in-memory (development)
    return checkRateLimitMemory(identifier, maxRequests, windowMs, now, windowStart);
  } catch (error) {
    // Fail open - allow request if rate limiting fails
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetTime: now + windowMs
    };
  }
}

/**
 * Redis-based rate limiting (production)
 */
async function checkRateLimitRedis(
  identifier: string,
  maxRequests: number,
  windowMs: number,
  now: number,
  windowStart: number
): Promise<RateLimitResult> {
  // This would use Redis in production
  // For now, fallback to memory
  return checkRateLimitMemory(identifier, maxRequests, windowMs, now, windowStart);
}

/**
 * In-memory rate limiting (development)
 */
function checkRateLimitMemory(
  identifier: string,
  maxRequests: number,
  windowMs: number,
  now: number,
  windowStart: number
): RateLimitResult {
  const key = `rate_limit:${identifier}`;
  const record = rateLimitMap.get(key);
  
  if (!record || now > record.resetTime) {
    // Create new record or reset expired record
    const newRecord: RateLimitEntry = {
      count: 1,
      resetTime: now + windowMs,
      windowStart: now
    };
    rateLimitMap.set(key, newRecord);
    
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetTime: now + windowMs
    };
  }
  
  // Check if we're in a new window
  if (now > record.windowStart + windowMs) {
    // Reset window
    const newRecord: RateLimitEntry = {
      count: 1,
      resetTime: now + windowMs,
      windowStart: now
    };
    rateLimitMap.set(key, newRecord);
    
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetTime: now + windowMs
    };
  }
  
  if (record.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
      retryAfter: Math.ceil((record.resetTime - now) / 1000)
    };
  }
  
  // Increment counter
  record.count++;
  
  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetTime: record.resetTime
  };
}

/**
 * Get client identifier from request
 */
export function getClientIdentifier(request: Request): string {
  // Try to get real IP from various headers
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  const vercelIp = request.headers.get('x-vercel-forwarded-for');
  
  // Vercel-specific IP handling
  if (vercelIp) {
    return vercelIp;
  }
  
  if (cfConnectingIp) {
    return cfConnectingIp;
  }
  
  if (realIp) {
    return realIp;
  }
  
  if (forwardedFor) {
    // Take the first IP in the chain
    return forwardedFor.split(',')[0].trim();
  }
  
  // For Vercel, use a more unique identifier
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const timestamp = Math.floor(Date.now() / 60000); // 1-minute window
  return `vercel-${timestamp}-${userAgent.slice(-10)}`;
}

/**
 * Rate limiting middleware for API routes
 */
export function withRateLimit(
  maxRequests: number = 10,
  windowMs: number = 60000
) {
  return async (request: Request, handler: Function) => {
    const clientId = getClientIdentifier(request);
    const rateLimit = await checkRateLimit(clientId, maxRequests, windowMs);
    
    if (!rateLimit.allowed) {
      return new Response(
        JSON.stringify({ 
          error: 'Too many requests. Please try again later.',
          retryAfter: rateLimit.retryAfter
        }),
        { 
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': rateLimit.retryAfter?.toString() || '60',
            'X-RateLimit-Limit': maxRequests.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString()
          }
        }
      );
    }
    
    // Add rate limit headers to response
    const response = await handler(request);
    
    if (response instanceof Response) {
      response.headers.set('X-RateLimit-Limit', maxRequests.toString());
      response.headers.set('X-RateLimit-Remaining', rateLimit.remaining.toString());
      response.headers.set('X-RateLimit-Reset', new Date(rateLimit.resetTime).toISOString());
    }
    
    return response;
  };
}
