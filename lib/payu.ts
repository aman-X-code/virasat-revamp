import crypto from 'crypto';

// PayU configuration
export const PAYU_CONFIG = {
  // Use production URLs for live mode
  BASE_URL: 'https://secure.payu.in/_payment',
  MERCHANT_KEY: process.env.PAYUBIZ_MERCHANT_KEY || '',
  MERCHANT_SALT: process.env.PAYUBIZ_MERCHANT_SALT || '',
  SUCCESS_URL: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/payment/success`,
  FAILURE_URL: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/payment/failure`,
  CANCEL_URL: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/payment/failure`,
};

// Validate PayU configuration
export function validatePayUConfig(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!PAYU_CONFIG.MERCHANT_KEY) {
    errors.push('PAYUBIZ_MERCHANT_KEY environment variable is missing');
  }
  
  if (!PAYU_CONFIG.MERCHANT_SALT) {
    errors.push('PAYUBIZ_MERCHANT_SALT environment variable is missing');
  }
  
  if (!process.env.NEXT_PUBLIC_APP_URL) {
    errors.push('NEXT_PUBLIC_APP_URL environment variable is missing');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Generate hash for PayU - Following official PayU documentation
export function generatePayUHash(
  key: string,
  txnid: string,
  amount: string,
  productinfo: string,
  firstname: string,
  email: string,
  salt: string
): string {
  // PayU hash string format: key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||salt
  const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
  return crypto.createHash('sha512').update(hashString).digest('hex');
}

// Verify hash from PayU response
export function verifyPayUHash(
  key: string,
  txnid: string,
  amount: string,
  productinfo: string,
  firstname: string,
  email: string,
  status: string,
  salt: string,
  receivedHash: string
): boolean {
  const hashString = `${salt}|${status}|||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;
  const calculatedHash = crypto.createHash('sha512').update(hashString).digest('hex');
  return calculatedHash === receivedHash;
}

// Generate unique transaction ID
export function generateTransactionId(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `TXN${timestamp}${random}`;
}

// PayU payment data interface - Following official PayU documentation
export interface PayUPaymentData {
  key: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  phone: string;
  surl: string;
  furl: string;
  hash: string;
  service_provider: string;
  // Additional required parameters
  lastname?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  country?: string;
  zipcode?: string;
  curl?: string;
}

// Create PayU payment data - Following official PayU documentation
export function createPayUPaymentData(
  amount: number,
  donorName: string,
  donorEmail: string,
  donorPhone: string
): PayUPaymentData {
  const txnid = generateTransactionId();
  const productinfo = 'Heritage Donation';
  
  // Generate hash with correct format
  const hash = generatePayUHash(
    PAYU_CONFIG.MERCHANT_KEY,
    txnid,
    amount.toString(),
    productinfo,
    donorName,
    donorEmail,
    PAYU_CONFIG.MERCHANT_SALT
  );

  return {
    key: PAYU_CONFIG.MERCHANT_KEY,
    txnid,
    amount: amount.toString(),
    productinfo,
    firstname: donorName,
    email: donorEmail,
    phone: donorPhone,
    surl: PAYU_CONFIG.SUCCESS_URL,
    furl: PAYU_CONFIG.FAILURE_URL,
    hash,
    service_provider: 'payu_paisa',
    // Additional parameters for better compatibility
    lastname: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    country: 'India',
    zipcode: '',
    curl: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/callback`,
  };
}