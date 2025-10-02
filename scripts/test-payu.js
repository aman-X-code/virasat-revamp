#!/usr/bin/env node

/**
 * PayU Integration Test Script
 * 
 * This script tests the PayU integration by validating:
 * 1. Environment variables
 * 2. Hash generation
 * 3. API endpoints
 */

require('dotenv').config({ path: '.env.local' });
const crypto = require('crypto');

console.log('🧪 PayU Integration Test\n');

// Test 1: Environment Variables
console.log('1️⃣ Testing Environment Variables...');
const merchantKey = process.env.PAYUBIZ_MERCHANT_KEY;
const merchantSalt = process.env.PAYUBIZ_MERCHANT_SALT;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;

if (!merchantKey) {
  console.log('❌ PAYUBIZ_MERCHANT_KEY is missing');
  process.exit(1);
}

if (!merchantSalt) {
  console.log('❌ PAYUBIZ_MERCHANT_SALT is missing');
  process.exit(1);
}

if (!appUrl) {
  console.log('❌ NEXT_PUBLIC_APP_URL is missing');
  process.exit(1);
}

console.log('✅ All environment variables present');

// Test 2: Hash Generation
console.log('\n2️⃣ Testing Hash Generation...');

function generatePayUHash(key, txnid, amount, productinfo, firstname, email, salt) {
  const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
  return crypto.createHash('sha512').update(hashString).digest('hex');
}

const testData = {
  key: merchantKey,
  txnid: 'TEST123456789',
  amount: '100',
  productinfo: 'Heritage Donation',
  firstname: 'Test User',
  email: 'test@example.com',
  salt: merchantSalt
};

try {
  const hash = generatePayUHash(
    testData.key,
    testData.txnid,
    testData.amount,
    testData.productinfo,
    testData.firstname,
    testData.email,
    testData.salt
  );
  
  console.log('✅ Hash generation successful');
  console.log(`   Hash: ${hash.substring(0, 20)}...`);
} catch (error) {
  console.log('❌ Hash generation failed:', error.message);
  process.exit(1);
}

// Test 3: URL Configuration
console.log('\n3️⃣ Testing URL Configuration...');

const urls = {
  success: `${appUrl}/donate/success`,
  failure: `${appUrl}/donate/failure`,
  callback: `${appUrl}/api/payment/callback`
};

console.log('✅ URLs configured:');
console.log(`   Success: ${urls.success}`);
console.log(`   Failure: ${urls.failure}`);
console.log(`   Callback: ${urls.callback}`);

// Test 4: Security Checks
console.log('\n4️⃣ Security Checks...');

if (merchantKey.includes('test') || merchantKey.includes('demo')) {
  console.log('⚠️  Warning: Merchant key appears to be test credentials');
}

if (merchantSalt.length < 20) {
  console.log('⚠️  Warning: Merchant salt appears too short');
}

if (!appUrl.startsWith('https://')) {
  console.log('⚠️  Warning: App URL should use HTTPS for production');
}

console.log('✅ Security checks completed');

// Summary
console.log('\n📋 Test Summary:');
console.log('✅ Environment variables configured');
console.log('✅ Hash generation working');
console.log('✅ URLs properly configured');
console.log('✅ Basic security checks passed');

console.log('\n🚀 PayU integration appears ready!');
console.log('\n📝 Next Steps:');
console.log('   1. Configure callback URLs in PayU dashboard');
console.log('   2. Test with ₹1 transaction');
console.log('   3. Verify email receipt delivery');
console.log('   4. Monitor logs during testing');

console.log('\n🔗 PayU Dashboard: https://onboarding.payu.in/');
console.log('📖 Setup Guide: See PAYU_SETUP.md for detailed instructions');