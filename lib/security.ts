// Security utilities for form validation and protection
import crypto from 'crypto';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Enhanced input sanitization
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/data:/gi, '') // Remove data: protocol
    .replace(/vbscript:/gi, '') // Remove vbscript: protocol
    .replace(/file:/gi, '') // Remove file: protocol
    .replace(/ftp:/gi, '') // Remove ftp: protocol
    .replace(/[^\x20-\x7E]/g, '') // Remove non-ASCII characters
    .substring(0, 1000); // Limit length
}

// Advanced XSS protection
export function sanitizeForXSS(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }
  
  const dangerousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
    /<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi,
    /<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi,
    /<link\b[^<]*>/gi,
    /<meta\b[^<]*>/gi,
    /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi,
    /javascript:/gi,
    /vbscript:/gi,
    /on\w+\s*=/gi,
    /expression\s*\(/gi,
    /url\s*\(/gi,
  ];
  
  let sanitized = input;
  dangerousPatterns.forEach(pattern => {
    sanitized = sanitized.replace(pattern, '');
  });
  
  return sanitized;
}

// SQL injection protection (basic)
export function sanitizeForSQL(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }
  
  return input
    .replace(/['"]/g, '') // Remove quotes
    .replace(/;/g, '') // Remove semicolons
    .replace(/--/g, '') // Remove SQL comments
    .replace(/\/\*/g, '') // Remove block comment start
    .replace(/\*\//g, '') // Remove block comment end
    .replace(/\b(union|select|insert|update|delete|drop|create|alter|exec|execute)\b/gi, ''); // Remove SQL keywords
}

// Enhanced email validation
export function validateEmail(email: string): ValidationResult {
  const errors: string[] = [];
  
  if (!email) {
    errors.push('Email is required');
  } else {
    // Sanitize email first
    const sanitizedEmail = sanitizeInput(email);
    
    if (sanitizedEmail !== email) {
      errors.push('Email contains invalid characters');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('Please enter a valid email address');
    } else if (email.length > 254) {
      errors.push('Email is too long');
    } else if (email.length < 5) {
      errors.push('Email is too short');
    }
    
    // Check for common email injection patterns
    const injectionPatterns = [
      /bcc:/i,
      /cc:/i,
      /to:/i,
      /from:/i,
      /subject:/i,
      /content-type:/i,
      /mime-version:/i,
      /multipart/i,
    ];
    
    if (injectionPatterns.some(pattern => pattern.test(email))) {
      errors.push('Email contains potentially malicious content');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Enhanced phone validation
export function validatePhone(phone: string): ValidationResult {
  const errors: string[] = [];
  
  if (!phone) {
    errors.push('Phone number is required');
  } else {
    // Sanitize phone first
    const sanitizedPhone = sanitizeInput(phone);
    
    if (sanitizedPhone !== phone) {
      errors.push('Phone number contains invalid characters');
    } else {
      // Remove common formatting characters
      const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
      
      // Check for valid phone number patterns
      if (!/^[\+]?[1-9][\d]{7,15}$/.test(cleanPhone)) {
        errors.push('Please enter a valid phone number');
      } else if (cleanPhone.length < 8) {
        errors.push('Phone number is too short');
      } else if (cleanPhone.length > 16) {
        errors.push('Phone number is too long');
      }
      
      // Check for suspicious patterns
      if (/^(\d)\1{7,}$/.test(cleanPhone)) {
        errors.push('Phone number appears to be invalid');
      }
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Enhanced name validation
export function validateName(name: string): ValidationResult {
  const errors: string[] = [];
  
  if (!name) {
    errors.push('Name is required');
  } else {
    // Sanitize name first
    const sanitizedName = sanitizeInput(name);
    
    if (sanitizedName !== name) {
      errors.push('Name contains invalid characters');
    } else if (name.length < 2) {
      errors.push('Name must be at least 2 characters long');
    } else if (name.length > 100) {
      errors.push('Name is too long');
    } else if (!/^[a-zA-Z\s\-'\.]+$/.test(name)) {
      errors.push('Name contains invalid characters');
    }
    
    // Check for suspicious patterns
    if (/^[a-zA-Z]{1}\s*$/.test(name)) {
      errors.push('Name appears to be too short');
    }
    
    // Check for repeated characters
    if (/(.)\1{4,}/.test(name)) {
      errors.push('Name contains too many repeated characters');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Enhanced amount validation for donations
export function validateAmount(amount: number): ValidationResult {
  const errors: string[] = [];
  
  if (!amount || amount <= 0) {
    errors.push('Amount must be greater than 0');
  } else if (amount > 100000) {
    errors.push('Maximum donation amount is ₹1,00,000 (1 Lakh)');
  } else if (!Number.isInteger(amount)) {
    errors.push('Amount must be a whole number');
  } else if (amount < 1) {
    errors.push('Amount must be at least ₹1');
  } else if (isNaN(amount)) {
    errors.push('Amount must be a valid number');
  } else if (!isFinite(amount)) {
    errors.push('Amount must be a finite number');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// CSRF token generation (simple implementation)
export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Rate limiting (client-side basic implementation)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(identifier: string, maxRequests: number = 5, windowMs: number = 60000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (record.count >= maxRequests) {
    return false;
  }
  
  record.count++;
  return true;
}

// XSS protection
export function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Enhanced secure form data processing
export function processFormData(data: Record<string, any>): Record<string, any> {
  const processed: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      // Apply multiple layers of sanitization
      let sanitized = sanitizeInput(value);
      sanitized = sanitizeForXSS(sanitized);
      sanitized = sanitizeForSQL(sanitized);
      processed[key] = sanitized;
    } else if (typeof value === 'number') {
      // Validate numbers
      if (isNaN(value) || !isFinite(value)) {
        processed[key] = 0;
      } else {
        processed[key] = value;
      }
    } else if (typeof value === 'boolean') {
      processed[key] = Boolean(value);
    } else if (Array.isArray(value)) {
      // Sanitize arrays
      processed[key] = value.map(item => 
        typeof item === 'string' ? sanitizeInput(sanitizeForXSS(sanitizeForSQL(item))) : item
      );
    } else if (typeof value === 'object' && value !== null) {
      // Recursively sanitize objects
      processed[key] = processFormData(value);
    } else {
      processed[key] = value;
    }
  }
  
  return processed;
}

// Additional security utilities
export function generateSecureId(): string {
  return crypto.randomBytes(16).toString('hex');
}

export function hashSensitiveData(data: string): string {
  return crypto.createHash('sha256').update(data).digest('hex');
}

export function validateRequestOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  const host = request.headers.get('host');
  
  // In production, validate against allowed origins
  if (process.env.NODE_ENV === 'production') {
    const allowedOrigins = [
      process.env.NEXT_PUBLIC_APP_URL
    ].filter(Boolean);
    
    if (origin && !allowedOrigins.includes(origin)) {
      return false;
    }
  }
  
  return true;
}
