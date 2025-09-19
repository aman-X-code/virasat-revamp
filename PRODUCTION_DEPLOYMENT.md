# 🚀 Production Deployment Checklist

## 📋 Pre-Deployment Requirements

### **1. PayU Biz Production Setup**
- [ ] **Get Production Credentials**
  - Log into PayU Biz merchant dashboard
  - Navigate to Settings → API Keys → Production
  - Copy Merchant Key and Merchant Salt
  - Save securely (never commit to code)

- [ ] **Configure Webhook URL**
  - In PayU Biz dashboard: Settings → Webhook
  - Set webhook URL: `https://yourdomain.com/api/payubiz/webhook`
  - Test webhook connectivity
  - Enable webhook notifications

- [ ] **Verify Account Status**
  - Ensure merchant account is approved for live transactions
  - Check transaction limits and fees
  - Verify supported payment methods

### **2. Domain & SSL Setup**
- [ ] **Domain Configuration**
  - Purchase and configure your domain
  - Set up DNS records
  - Ensure domain points to your hosting provider

- [ ] **SSL Certificate**
  - Install valid SSL certificate (Let's Encrypt or commercial)
  - Verify HTTPS works: `https://yourdomain.com`
  - Test SSL rating: https://www.ssllabs.com/ssltest/

### **3. Environment Configuration**
- [ ] **Production Environment Variables**
  ```bash
  # Required for production
  PAYUBIZ_MERCHANT_KEY=your_production_key
  PAYUBIZ_MERCHANT_SALT=your_production_salt
  NEXT_PUBLIC_APP_URL=https://yourdomain.com
  NODE_ENV=production
  
  # Email configuration
  EMAIL_SERVICE=smtp
  EMAIL_HOST=mail.reachvirasat.org
  EMAIL_USER=noreply@reachvirasat.org
  EMAIL_PASSWORD=secure_password
  ADMIN_EMAIL=admin@reachvirasat.org
  ```

- [ ] **Security Validation**
  - Never use test credentials in production
  - Ensure all secrets are properly secured
  - Verify environment variables are loaded correctly

## 🔒 Security Checklist

### **Application Security**
- [x] Rate limiting enabled (15 requests/minute for payments)
- [x] Input validation and sanitization
- [x] Hash verification for all PayU Biz communications
- [x] HTTPS enforcement
- [x] Security headers configured
- [x] XSS protection enabled
- [x] CSRF protection through hash verification

### **PayU Biz Security**
- [ ] **Webhook Security**
  - Hash verification implemented ✅
  - Webhook URL uses HTTPS
  - Webhook endpoint is publicly accessible
  - No authentication required for webhook (PayU Biz limitation)

- [ ] **Transaction Security**
  - Amount validation (₹1 to ₹10,00,000)
  - Email and phone validation
  - Transaction ID uniqueness
  - Hash verification on both creation and verification

### **Infrastructure Security**
- [ ] **Server Security**
  - Keep server OS and packages updated
  - Configure firewall (allow 80, 443, SSH only)
  - Disable unnecessary services
  - Set up fail2ban or similar intrusion prevention

- [ ] **Database Security** (if applicable)
  - Use strong database passwords
  - Enable SSL for database connections
  - Regular backups with encryption
  - Limit database access to application only

## 📊 Monitoring & Logging

### **Application Monitoring**
- [ ] **Error Tracking**
  - Set up error monitoring (Sentry, LogRocket, etc.)
  - Monitor API response times
  - Track payment success/failure rates
  - Set up alerts for critical errors

- [ ] **Payment Monitoring**
  - Monitor webhook delivery success
  - Track payment completion rates
  - Set up alerts for failed payments
  - Monitor for suspicious payment patterns

### **Server Monitoring**
- [ ] **Performance Monitoring**
  - CPU and memory usage
  - Disk space monitoring
  - Network traffic monitoring
  - SSL certificate expiry alerts

- [ ] **Security Monitoring**
  - Failed login attempts
  - Unusual traffic patterns
  - Rate limit violations
  - Webhook delivery failures

## 🧪 Testing Checklist

### **Pre-Production Testing**
- [ ] **Payment Flow Testing**
  - Test with small amounts (₹1, ₹10)
  - Test different payment methods (cards, UPI, net banking)
  - Test payment failures and cancellations
  - Verify email receipts are sent correctly

- [ ] **Security Testing**
  - Test rate limiting functionality
  - Verify hash validation works
  - Test with invalid payment data
  - Check HTTPS enforcement

- [ ] **Integration Testing**
  - Test webhook delivery
  - Verify PayU Biz dashboard shows transactions
  - Test email delivery to different providers
  - Check PDF receipt generation

### **Post-Deployment Testing**
- [ ] **Smoke Tests**
  - Complete one successful payment
  - Verify webhook is received
  - Check email is sent
  - Confirm transaction appears in PayU dashboard

- [ ] **Load Testing** (if expecting high traffic)
  - Test concurrent payment requests
  - Verify rate limiting under load
  - Check server performance under stress

## 🚀 Deployment Steps

### **1. Build and Deploy**
```bash
# Build for production
npm run build

# Deploy to your hosting provider
# (Vercel, Netlify, AWS, DigitalOcean, etc.)
```

### **2. Environment Setup**
```bash
# Set production environment variables
# Method depends on your hosting provider

# Vercel example:
vercel env add PAYUBIZ_MERCHANT_KEY
vercel env add PAYUBIZ_MERCHANT_SALT
vercel env add NEXT_PUBLIC_APP_URL

# Or use .env.production.local file
```

### **3. DNS Configuration**
```bash
# Point your domain to hosting provider
# Example DNS records:
A     @     your.server.ip.address
CNAME www   yourdomain.com
```

### **4. SSL Setup**
```bash
# Most hosting providers auto-provision SSL
# Verify SSL is working:
curl -I https://yourdomain.com
```

## ✅ Go-Live Checklist

### **Final Verification**
- [ ] Domain resolves correctly
- [ ] HTTPS certificate is valid
- [ ] PayU Biz webhook URL is configured
- [ ] Production credentials are active
- [ ] Email delivery is working
- [ ] All environment variables are set
- [ ] Error monitoring is active

### **Launch**
- [ ] **Soft Launch**
  - Test with internal team first
  - Process a few small donations
  - Monitor for any issues
  - Verify all systems working

- [ ] **Full Launch**
  - Announce to users
  - Monitor closely for first 24 hours
  - Be ready to rollback if needed
  - Document any issues for future reference

## 🆘 Rollback Plan

### **If Issues Occur**
1. **Immediate Actions**
   - Switch PayU Biz back to test mode
   - Display maintenance message
   - Stop processing new payments

2. **Investigation**
   - Check server logs
   - Verify PayU Biz dashboard
   - Test webhook delivery
   - Check email delivery

3. **Resolution**
   - Fix identified issues
   - Test thoroughly in staging
   - Redeploy with fixes
   - Resume normal operations

## 📞 Support Contacts

- **PayU Biz Support**: https://www.payu.in/merchant-support
- **Technical Documentation**: https://docs.payu.in/
- **Emergency Contact**: Keep PayU support number handy

---

**Status**: Ready for Production Deployment
**Last Updated**: January 2025
**Next Review**: After successful deployment