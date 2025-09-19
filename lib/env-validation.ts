import { z } from 'zod';

// Environment variable schema validation
const envSchema = z.object({
  // PayU Biz Configuration (Server-side only)
  PAYUBIZ_MERCHANT_KEY: z.string().min(6, 'PAYUBIZ_MERCHANT_KEY must be at least 6 characters'),
  PAYUBIZ_MERCHANT_SALT: z.string().min(20, 'PAYUBIZ_MERCHANT_SALT must be at least 20 characters'),
  
  // App Configuration
  NEXT_PUBLIC_APP_URL: z.string().url('NEXT_PUBLIC_APP_URL must be a valid URL'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // Optional Redis Configuration
  REDIS_URL: z.string().url().optional(),
  
  // Email Configuration (if using email features)
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  
  // Security Configuration
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters').optional(),
  ENCRYPTION_KEY: z.string().min(32, 'ENCRYPTION_KEY must be at least 32 characters').optional(),
});

export type EnvConfig = z.infer<typeof envSchema>;

// Validate environment variables
export function validateEnvironment(): { isValid: boolean; errors: string[]; config?: EnvConfig } {
  try {
    const config = envSchema.parse(process.env);
    return {
      isValid: true,
      errors: [],
      config
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
      return {
        isValid: false,
        errors
      };
    }
    
    return {
      isValid: false,
      errors: ['Unknown environment validation error']
    };
  }
}

// Environment variable validation for PayU Biz
export function validatePayUBizConfig(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Check if we're in server-side context
  if (typeof window !== 'undefined') {
    errors.push('Environment validation should only run on server-side');
    return { isValid: false, errors };
  }
  
  if (!process.env.PAYUBIZ_MERCHANT_KEY) {
    errors.push('PAYUBIZ_MERCHANT_KEY is required');
  } else if (process.env.PAYUBIZ_MERCHANT_KEY.length < 6) {
    errors.push('PAYUBIZ_MERCHANT_KEY appears to be invalid');
  }
  
  if (!process.env.PAYUBIZ_MERCHANT_SALT) {
    errors.push('PAYUBIZ_MERCHANT_SALT is required');
  } else if (process.env.PAYUBIZ_MERCHANT_SALT.length < 20) {
    errors.push('PAYUBIZ_MERCHANT_SALT appears to be invalid');
  }
  
  if (!process.env.NEXT_PUBLIC_APP_URL) {
    errors.push('NEXT_PUBLIC_APP_URL is required for payment callbacks');
  } else {
    try {
      new URL(process.env.NEXT_PUBLIC_APP_URL);
    } catch {
      errors.push('NEXT_PUBLIC_APP_URL must be a valid URL');
    }
  }
  
  // Validate URL security in production
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.NEXT_PUBLIC_APP_URL?.startsWith('https://')) {
      errors.push('Production URLs must use HTTPS');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Test PayU Biz configuration
export function testPayUBizConfig(): void {
  const validation = validatePayUBizConfig();
  
  if (!validation.isValid) {
    console.error('PayU Biz Configuration Errors:');
    validation.errors.forEach(error => console.error(`- ${error}`));
    throw new Error('PayU Biz configuration is invalid');
  }
  
  console.log('✅ PayU Biz configuration is valid');
}

// Secure environment variable getter
export function getSecureEnvVar(key: string, defaultValue?: string): string {
  // Only allow access to safe environment variables on client-side
  const clientSafeVars = ['NEXT_PUBLIC_APP_URL', 'NODE_ENV'];
  
  if (typeof window !== 'undefined' && !clientSafeVars.includes(key)) {
    throw new Error(`Environment variable ${key} is not accessible on client-side`);
  }
  
  const value = process.env[key];
  
  if (!value && defaultValue === undefined) {
    throw new Error(`Required environment variable ${key} is not set`);
  }
  
  return value || defaultValue || '';
}

// Validate environment on startup
export function validateEnvironmentOnStartup(): void {
  const validation = validateEnvironment();
  
  if (!validation.isValid) {
    console.error('❌ Environment validation failed:');
    validation.errors.forEach(error => console.error(`  - ${error}`));
    
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Environment validation failed in production');
    } else {
      console.warn('⚠️  Environment validation failed in development - continuing with warnings');
    }
  } else {
    console.log('✅ Environment validation passed');
  }
}