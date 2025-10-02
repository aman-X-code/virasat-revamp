#!/usr/bin/env node

/**
 * Development Setup Script
 * 
 * This script helps set up the development environment for PayU integration
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up development environment...\n');

// Check if .env.local exists
const envLocalPath = path.join(process.cwd(), '.env.local');
const envExamplePath = path.join(process.cwd(), '.env.local.example');

if (!fs.existsSync(envLocalPath)) {
  if (fs.existsSync(envExamplePath)) {
    // Copy example file
    fs.copyFileSync(envExamplePath, envLocalPath);
    console.log('✅ Created .env.local from .env.local.example');
  } else {
    // Create basic .env.local
    const basicEnv = `# PayU Biz Configuration (DEVELOPMENT)
# Replace with your actual PayU credentials for testing
PAYUBIZ_MERCHANT_KEY=your_merchant_key_here
PAYUBIZ_MERCHANT_SALT=your_merchant_salt_here

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Email Configuration (optional for development)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_APP_PASSWORD=your_app_password

# Admin email
ADMIN_EMAIL=admin@localhost
`;
    
    fs.writeFileSync(envLocalPath, basicEnv);
    console.log('✅ Created basic .env.local file');
  }
} else {
  console.log('ℹ️  .env.local already exists');
}

console.log('\n📝 Next Steps:');
console.log('1. Edit .env.local and add your PayU credentials');
console.log('2. Get PayU credentials from: https://onboarding.payu.in/');
console.log('3. Run: npm run test-payu (to test configuration)');
console.log('4. Run: npm run dev (to start development server)');

console.log('\n📚 Documentation:');
console.log('- Setup Guide: PAYU_SETUP.md');
console.log('- Environment Example: .env.example');

console.log('\n⚠️  Important:');
console.log('- Never commit .env.local to version control');
console.log('- Use test credentials for development');
console.log('- Use live credentials only in production');

console.log('\n🎉 Development environment setup complete!');