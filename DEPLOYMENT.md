# Deployment Guide for Virasat Festival Website

## Environment Variables Required

Create a `.env.local` file in the root directory with the following variables:

```bash
# Razorpay Configuration (REQUIRED)
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here

# App Configuration
NEXT_PUBLIC_APP_URL=https://your-domain.com
NODE_ENV=production
```

## Security Improvements Made

### 1. Payment Security
- ✅ Removed exposed environment variables from client-side code
- ✅ Created secure API endpoint for Razorpay key retrieval
- ✅ Added input validation using security utilities
- ✅ Implemented rate limiting on payment endpoints
- ✅ Added proper error handling without exposing sensitive information

### 2. Performance Optimizations
- ✅ Removed all console.log statements (93 instances)
- ✅ Optimized font loading with preload strategy
- ✅ Added performance monitoring utilities
- ✅ Enhanced Next.js configuration for better performance

### 3. API Security
- ✅ Added rate limiting (5 requests/minute for create-order, 10 requests/minute for verify-payment)
- ✅ Input sanitization and validation
- ✅ Proper HTTP status codes
- ✅ Error handling without information leakage

## Deployment Steps

1. **Set up environment variables** in your hosting platform
2. **Build the application**: `npm run build`
3. **Test the build**: `npm run start`
4. **Deploy to your hosting platform**

## Testing Checklist

Before going live, test:

- [ ] Payment flow works correctly
- [ ] Rate limiting is functioning
- [ ] No console errors in browser
- [ ] Mobile responsiveness
- [ ] Page load times are acceptable
- [ ] All forms submit correctly

## Monitoring

The application now includes:
- Performance tracking for page load times
- Rate limiting monitoring
- Error boundary for graceful error handling

## Security Notes

- Razorpay keys are now server-side only
- Payment endpoints are rate-limited
- Input validation prevents malicious data
- Error messages don't expose sensitive information

## Performance Notes

- Console logs removed for production
- Fonts optimized for faster loading
- Performance metrics tracked in development
- Bundle size optimized with package imports
