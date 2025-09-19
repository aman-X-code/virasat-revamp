# 📧 Name.com Email Configuration Guide

## Overview

This guide helps you configure your custom email purchased from name.com with the Virasat Foundation donation system.

## Step 1: Get SMTP Settings from Name.com

1. **Login to Name.com**

   - Go to https://www.name.com
   - Login to your account
   - Navigate to "Email" or "Email Hosting" section

2. **Find SMTP Settings**
   - Look for "Email Settings" or "SMTP Configuration"
   - Common name.com SMTP settings:
     - **SMTP Server**: `mail.yourdomain.com` or `smtp.yourdomain.com`
     - **Port**: `587` (STARTTLS) or `465` (SSL)
     - **Security**: STARTTLS or SSL/TLS
     - **Username**: Your full email address (e.g., `info@yourdomain.com`)
     - **Password**: Your email account password

## Step 2: Update Environment Variables

### For Local Development (.env.local)

```bash
# Email Configuration - Custom SMTP (name.com)
EMAIL_SERVICE=smtp
EMAIL_HOST=mail.yourdomain.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=info@yourdomain.com
EMAIL_PASSWORD=your_email_password
```

### For Production (Vercel/Hosting Provider)

Set these environment variables in your hosting provider:

```bash
EMAIL_SERVICE=smtp
EMAIL_HOST=mail.yourdomain.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=info@yourdomain.com
EMAIL_PASSWORD=your_email_password
```

## Step 3: Common Name.com SMTP Configurations

### Configuration Option 1 (Most Common)

```bash
EMAIL_SERVICE=smtp
EMAIL_HOST=mail.yourdomain.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=info@yourdomain.com
EMAIL_PASSWORD=your_password
```

### Configuration Option 2 (SSL)

```bash
EMAIL_SERVICE=smtp
EMAIL_HOST=mail.yourdomain.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=info@yourdomain.com
EMAIL_PASSWORD=your_password
```

### Configuration Option 3 (Alternative Host)

```bash
EMAIL_SERVICE=smtp
EMAIL_HOST=smtp.yourdomain.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=info@yourdomain.com
EMAIL_PASSWORD=your_password
```

## Step 4: Test Email Configuration

1. **Start your development server**:

   ```bash
   npm run dev
   ```

2. **Test a donation** to trigger email sending

3. **Check console logs** for email sending status

4. **Verify email delivery** in recipient inbox

## Step 5: Troubleshooting

### Common Issues and Solutions

#### Issue: "Connection refused" or "ECONNREFUSED"

**Solution**: Check if the SMTP host and port are correct

```bash
# Try different host formats:
EMAIL_HOST=mail.yourdomain.com
# or
EMAIL_HOST=smtp.yourdomain.com
# or
EMAIL_HOST=yourdomain.com
```

#### Issue: "Authentication failed"

**Solution**: Verify username and password

- Username should be the full email address
- Password should be the email account password (not domain password)
- Some providers require app-specific passwords

#### Issue: "Certificate error" or SSL issues

**Solution**: Adjust security settings

```bash
# For port 587 (STARTTLS)
EMAIL_PORT=587
EMAIL_SECURE=false

# For port 465 (SSL)
EMAIL_PORT=465
EMAIL_SECURE=true
```

#### Issue: Emails not being delivered

**Solution**: Check spam folder and email logs

- Check recipient's spam/junk folder
- Verify sender email is properly configured
- Check if domain has proper SPF/DKIM records

## Step 6: DNS Configuration (Optional but Recommended)

To improve email deliverability, configure these DNS records:

### SPF Record

```
Type: TXT
Name: @
Value: v=spf1 include:_spf.name.com ~all
```

### DKIM Record

```
Type: TXT
Name: default._domainkey
Value: (provided by name.com)
```

### DMARC Record

```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com
```

## Step 7: Production Deployment

1. **Update production environment variables** with the same SMTP settings
2. **Test email delivery** in production environment
3. **Monitor email logs** for any delivery issues
4. **Set up email monitoring** to track delivery success rates

## Example Complete Configuration

For Virasat Foundation with reachvirasat.org domain:

```bash
# .env.local or production environment
EMAIL_SERVICE=smtp
EMAIL_HOST=mail.reachvirasat.org
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=noreply@reachvirasat.org
EMAIL_PASSWORD=your_actual_password

# Admin email for notifications
ADMIN_EMAIL=admin@reachvirasat.org
```

## Support

If you encounter issues:

1. **Check name.com documentation** for their specific SMTP settings
2. **Contact name.com support** for email configuration help
3. **Test with a simple email client** (like Thunderbird) to verify settings work
4. **Check server logs** for detailed error messages

---

**Note**: Always test email configuration in development before deploying to production.
