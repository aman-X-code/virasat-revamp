import { z } from 'zod';

// Environment variable schema validation
const envSchema = z.object({
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

// Generic payment gateway configuration validation
export function validatePaymentConfig(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Check if we're in server-side context
  if (typeof window !== 'undefined') {
    errors.push('Environment validation should only run on server-side');
    return { isValid: false, errors };
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

// Test payment configuration
export function testPaymentConfig(): void {
  const validation = validatePaymentConfig();
  
  if (!validation.isValid) {
    console.error('Payment Configuration Errors:');
    validation.errors.forEach(error => console.error(`- ${error}`));
    throw new Error('Payment configuration is invalid');
  }
  
  console.log('✅ Payment configuration is valid');
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