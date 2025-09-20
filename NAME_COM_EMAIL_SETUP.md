# 📧 Name.com Email Configuration Guide

## 🚨 URGENT: DNS Records Required

If you're seeing "Action required for reachvirasat.org: To send and receive emails, you need to set your domain's MX & SPF records correctly", **jump to Step 6** immediately to configure DNS records.

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

### Configuration Option 1 (Titan Email - Most Common)

```bash
EMAIL_SERVICE=smtp
EMAIL_HOST=smtp.titan.email
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=noreply@reachvirasat.org
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

#### Issue: "Action required for reachvirasat.org: To send and receive emails, you need to set your domain's MX & SPF records correctly"

**Solution**: Configure DNS records immediately

1. **Add MX Records** (see Step 6 above)
2. **Add SPF Record** (see Step 6 above)
3. **Wait for DNS propagation** (up to 48 hours)
4. **Test email delivery** after DNS changes take effect

**How to verify DNS records are working:**

```bash
# Check MX records
nslookup -type=MX reachvirasat.org

# Check SPF record
nslookup -type=TXT reachvirasat.org
```

Or use online tools like:
- https://mxtoolbox.com/
- https://dnschecker.org/

## Step 6: DNS Configuration (REQUIRED for Name.com Email)

⚠️ **CRITICAL**: These DNS records are REQUIRED for Name.com email to work properly.

### MX Records (Mail Exchange) - REQUIRED

For **Titan Email** (Name.com's email service), configure these MX records:

```
Type: MX
Name: @
Priority: 10
Value: mx1.titan.email

Type: MX
Name: @
Priority: 20
Value: mx2.titan.email
```

**IMPORTANT**: Delete the existing `mail.reachvirasat.org` MX record and replace with the Titan MX records above.

### SPF Record - REQUIRED

For **Titan Email**, use this SPF record:

```
Type: TXT
Name: @
Value: v=spf1 include:_spf.titan.email ~all
```

**IMPORTANT**: Update the existing SPF record to use `_spf.titan.email` instead of `spf.name.com`.

### DKIM Record - RECOMMENDED

```
Type: TXT
Name: default._domainkey
Value: (provided by name.com - check your email dashboard)
```

### DMARC Record - RECOMMENDED

```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=quarantine; rua=mailto:dmarc@reachvirasat.org
```

## How to Configure DNS Records

### If DNS is managed by Name.com:

1. Login to your Name.com account
2. Go to "My Domains" → Select your domain
3. Click "DNS Records" or "Manage DNS"
4. Add the MX and TXT records listed above

### If DNS is managed elsewhere (Cloudflare, etc.):

1. Login to your DNS provider
2. Navigate to DNS management for reachvirasat.org
3. Add the MX and TXT records listed above
4. Wait 24-48 hours for DNS propagation

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
