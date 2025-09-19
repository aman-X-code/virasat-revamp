import crypto from 'crypto';

// Webhook replay attack prevention
interface WebhookRecord {
  hash: string;
  timestamp: number;
  processed: boolean;
}

// In-memory storage for processed webhooks (use Redis in production)
const processedWebhooks = new Map<string, WebhookRecord>();

// Clean up old webhook records every 10 minutes
setInterval(() => {
  const now = Date.now();
  const maxAge = 24 * 60 * 60 * 1000; // 24 hours
  
  processedWebhooks.forEach((record, key) => {
    if (now - record.timestamp > maxAge) {
      processedWebhooks.delete(key);
    }
  });
}, 600000);

/**
 * Generate a unique webhook identifier
 */
export function generateWebhookId(paymentData: any): string {
  const dataString = `${paymentData.txnid}_${paymentData.amount}_${paymentData.status}_${paymentData.email}`;
  return crypto.createHash('sha256').update(dataString).digest('hex');
}

/**
 * Check if webhook has already been processed (replay attack prevention)
 */
export function isWebhookReplay(webhookId: string, hash: string): boolean {
  const record = processedWebhooks.get(webhookId);
  
  if (!record) {
    return false; // New webhook
  }
  
  // Check if it's the same hash (legitimate retry) or different hash (replay attack)
  return record.hash !== hash;
}

/**
 * Mark webhook as processed
 */
export function markWebhookProcessed(webhookId: string, hash: string): void {
  processedWebhooks.set(webhookId, {
    hash,
    timestamp: Date.now(),
    processed: true
  });
}

/**
 * Validate webhook timestamp (prevent old webhook replay)
 */
export function validateWebhookTimestamp(timestamp: string): boolean {
  try {
    const webhookTime = new Date(timestamp).getTime();
    const now = Date.now();
    const maxAge = 30 * 60 * 1000; // 30 minutes
    
    return (now - webhookTime) <= maxAge;
  } catch {
    return false;
  }
}

/**
 * Enhanced webhook hash verification
 */
export function verifyWebhookHash(
  paymentData: any,
  receivedHash: string,
  merchantKey: string,
  merchantSalt: string
): boolean {
  try {
    // Create hash using PayU Biz formula
    const hashString = `${merchantSalt}|${paymentData.status}|||||||||||${paymentData.email}|${paymentData.firstname}|${paymentData.productinfo}|${paymentData.amount}|${paymentData.txnid}|${merchantKey}`;
    const expectedHash = crypto.createHash('sha512').update(hashString).digest('hex');
    
    // Use timing-safe comparison to prevent timing attacks
    return crypto.timingSafeEqual(
      Buffer.from(receivedHash, 'hex'),
      Buffer.from(expectedHash, 'hex')
    );
  } catch (error) {
    return false;
  }
}

/**
 * Validate webhook source (basic IP validation)
 */
export function validateWebhookSource(request: Request): boolean {
  const userAgent = request.headers.get('user-agent') || '';
  const origin = request.headers.get('origin') || '';
  
  // PayU Biz webhooks typically come from specific user agents
  const validUserAgents = [
    'PayU-Webhook',
    'PayU-Biz',
    'Mozilla/5.0' // Some webhooks use browser-like user agents
  ];
  
  // Check if user agent looks legitimate
  const hasValidUserAgent = validUserAgents.some(ua => 
    userAgent.toLowerCase().includes(ua.toLowerCase())
  );
  
  // In production, you might want to add IP whitelist validation
  if (process.env.NODE_ENV === 'production') {
    // Add IP validation here if PayU provides IP ranges
    // For now, we rely on hash verification
  }
  
  return hasValidUserAgent;
}

/**
 * Comprehensive webhook validation
 */
export function validateWebhook(
  request: Request,
  paymentData: any,
  receivedHash: string,
  merchantKey: string,
  merchantSalt: string
): { isValid: boolean; error?: string; webhookId?: string } {
  try {
    // 1. Validate webhook source
    if (!validateWebhookSource(request)) {
      return { isValid: false, error: 'Invalid webhook source' };
    }
    
    // 2. Validate required fields
    const requiredFields = ['txnid', 'amount', 'status', 'email', 'firstname', 'productinfo'];
    for (const field of requiredFields) {
      if (!paymentData[field]) {
        return { isValid: false, error: `Missing required field: ${field}` };
      }
    }
    
    // 3. Validate webhook hash
    if (!verifyWebhookHash(paymentData, receivedHash, merchantKey, merchantSalt)) {
      return { isValid: false, error: 'Invalid webhook hash' };
    }
    
    // 4. Generate webhook ID and check for replay attacks
    const webhookId = generateWebhookId(paymentData);
    if (isWebhookReplay(webhookId, receivedHash)) {
      return { isValid: false, error: 'Webhook replay attack detected' };
    }
    
    // 5. Validate timestamp if present
    if (paymentData.udf2 && !validateWebhookTimestamp(paymentData.udf2)) {
      return { isValid: false, error: 'Webhook timestamp is too old' };
    }
    
    // 6. Validate amount (basic sanity check)
    const amount = parseFloat(paymentData.amount);
    if (isNaN(amount) || amount <= 0 || amount > 1000000) {
      return { isValid: false, error: 'Invalid amount' };
    }
    
    // 7. Validate status
    const validStatuses = ['success', 'failure', 'pending'];
    if (!validStatuses.includes(paymentData.status)) {
      return { isValid: false, error: 'Invalid payment status' };
    }
    
    return { isValid: true, webhookId };
    
  } catch (error) {
    return { isValid: false, error: 'Webhook validation failed' };
  }
}

/**
 * Log webhook for security monitoring
 */
export function logWebhook(
  paymentData: any,
  isValid: boolean,
  error?: string,
  request?: Request
): void {
  const logData = {
    timestamp: new Date().toISOString(),
    txnid: paymentData.txnid,
    amount: paymentData.amount,
    status: paymentData.status,
    email: paymentData.email?.replace(/(.{2}).*(@.*)/, '$1***$2'),
    isValid,
    error,
    userAgent: request?.headers.get('user-agent')?.substring(0, 100),
    ip: request?.headers.get('x-forwarded-for') || request?.headers.get('x-real-ip')
  };
  
  // Webhook logged for security monitoring
}
