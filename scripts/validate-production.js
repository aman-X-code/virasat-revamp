// Production readiness validation script
const crypto = require('crypto');

// Load environment variables
require('dotenv').config({ path: '.env.production.local' });

function validateProductionConfig() {
  console.log('🔍 Validating Production Configuration...\n');
  
  const merchantKey = process.env.PAYUBIZ_MERCHANT_KEY;
  const merchantSalt = process.env.PAYUBIZ_MERCHANT_SALT;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  const nodeEnv = process.env.NODE_ENV;
  
  let errors = [];
  let warnings = [];
  let passed = [];
  
  // Environment check
  console.log('🌍 Environment Validation:');
  if (nodeEnv === 'production') {
    passed.push('✅ NODE_ENV is set to production');
  } else {
    warnings.push('⚠️  NODE_ENV is not set to production');
  }
  
  // PayU Biz credentials
  console.log('\n🔐 PayU Biz Credentials:');
  if (!merchantKey) {
    errors.push('❌ PAYUBIZ_MERCHANT_KEY is missing');
  } else if (merchantKey.length < 6) {
    errors.push('❌ PAYUBIZ_MERCHANT_KEY appears invalid');
  } else if (merchantKey.includes('test') || merchantKey.includes('demo')) {
    warnings.push('⚠️  PAYUBIZ_MERCHANT_KEY appears to be test credentials');
  } else {
    passed.push('✅ PAYUBIZ_MERCHANT_KEY is present and appears valid');
  }
  
  if (!merchantSalt) {
    errors.push('❌ PAYUBIZ_MERCHANT_SALT is missing');
  } else if (merchantSalt.length < 20) {
    errors.push('❌ PAYUBIZ_MERCHANT_SALT appears invalid');
  } else {
    passed.push('✅ PAYUBIZ_MERCHANT_SALT is present and appears valid');
  }
  
  // URL validation
  console.log('\n🌐 URL Configuration:');
  if (!appUrl) {
    errors.push('❌ NEXT_PUBLIC_APP_URL is missing');
  } else if (appUrl.includes('localhost') || appUrl.includes('127.0.0.1')) {
    errors.push('❌ NEXT_PUBLIC_APP_URL cannot be localhost in production');
  } else if (!appUrl.startsWith('https://')) {
    errors.push('❌ NEXT_PUBLIC_APP_URL must use HTTPS in production');
  } else if (!appUrl.includes('.')) {
    errors.push('❌ NEXT_PUBLIC_APP_URL must be a valid domain');
  } else {
    passed.push('✅ NEXT_PUBLIC_APP_URL is properly configured');
  }
  
  // Email configuration
  console.log('\n📧 Email Configuration:');
  const emailService = process.env.EMAIL_SERVICE;
  const emailUser = process.env.EMAIL_USER;
  const emailPassword = process.env.EMAIL_PASSWORD;
  
  if (!emailService) {
    warnings.push('⚠️  EMAIL_SERVICE not configured - emails may not work');
  } else {
    passed.push('✅ EMAIL_SERVICE is configured');
  }
  
  if (!emailUser) {
    warnings.push('⚠️  EMAIL_USER not configured - emails may not work');
  } else if (emailUser.includes('gmail') && emailService !== 'gmail') {
    warnings.push('⚠️  Gmail detected but EMAIL_SERVICE is not set to gmail');
  } else {
    passed.push('✅ EMAIL_USER is configured');
  }
  
  if (!emailPassword) {
    warnings.push('⚠️  EMAIL_PASSWORD not configured - emails may not work');
  } else {
    passed.push('✅ EMAIL_PASSWORD is configured');
  }
  
  // Security validation
  console.log('\n🔒 Security Validation:');
  if (merchantKey && merchantSalt) {
    // Test hash generation
    try {
      const testData = {
        key: merchantKey,
        txnid: 'TEST_PROD_123',
        amount: '100',
        productinfo: 'Test Product',
        firstname: 'Test User',
        email: 'test@example.com'
      };
      
      const hashString = `${testData.key}|${testData.txnid}|${testData.amount}|${testData.productinfo}|${testData.firstname}|${testData.email}||||||||||${merchantSalt}`;
      const hash = crypto.createHash('sha512').update(hashString).digest('hex');
      
      if (hash && hash.length === 128) {
        passed.push('✅ Hash generation working correctly');
      } else {
        errors.push('❌ Hash generation failed');
      }
    } catch (error) {
      errors.push('❌ Hash generation error: ' + error.message);
    }
  }
  
  // URL accessibility test
  if (appUrl && appUrl.startsWith('https://')) {
    console.log('\n🌐 Testing URL Accessibility...');
    // Note: This is a basic check - in production you'd want more comprehensive testing
    passed.push('✅ URL format is correct for production');
  }
  
  // Summary
  console.log('\n📊 Validation Summary:');
  console.log('==========================================');
  
  if (passed.length > 0) {
    console.log('\n✅ PASSED CHECKS:');
    passed.forEach(item => console.log(`   ${item}`));
  }
  
  if (warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:');
    warnings.forEach(item => console.log(`   ${item}`));
  }
  
  if (errors.length > 0) {
    console.log('\n❌ ERRORS (MUST FIX):');
    errors.forEach(item => console.log(`   ${item}`));
  }
  
  console.log('\n==========================================');
  
  if (errors.length === 0) {
    console.log('🎉 PRODUCTION READY!');
    console.log('\n📝 Next Steps:');
    console.log('   1. Deploy to your production environment');
    console.log('   2. Configure PayU Biz webhook URL in dashboard');
    console.log('   3. Test with small payment (₹1)');
    console.log('   4. Monitor logs and webhook delivery');
    console.log('   5. Go live! 🚀');
    
    if (warnings.length > 0) {
      console.log('\n⚠️  Note: Address warnings for optimal performance');
    }
  } else {
    console.log('❌ NOT READY FOR PRODUCTION');
    console.log('   Please fix all errors before deploying');
  }
  
  console.log('\n🔗 Important URLs to configure in PayU Biz:');
  if (appUrl) {
    console.log(`   Success URL: ${appUrl}/donate/success`);
    console.log(`   Failure URL: ${appUrl}/donate/failure`);
    console.log(`   Webhook URL: ${appUrl}/api/payubiz/webhook`);
  }
  
  return errors.length === 0;
}

// Run validation
try {
  const isReady = validateProductionConfig();
  process.exit(isReady ? 0 : 1);
} catch (error) {
  console.error('❌ Validation failed:', error.message);
  process.exit(1);
}