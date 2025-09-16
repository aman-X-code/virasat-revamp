# Formspree Integration Setup Guide

## Overview
Your contact page has been updated to integrate with Formspree. The forms are now ready to submit to Formspree endpoints, but you need to set up your Formspree account and get the form IDs.

## Steps to Complete Setup

### 1. Create Formspree Account
1. Go to [formspree.io](https://formspree.io)
2. Sign up for a free account (50 submissions per month)
3. Verify your email address

### 2. Create Forms in Formspree
You need to create 4 separate forms in Formspree for each contact type:

#### Form 1: Artist Registration
- Form name: "Artist Registration"
- Email to receive submissions: `your-test-email@example.com`
- Create the form and copy the form ID (e.g., `xqkzqkzq`)

#### Form 2: Volunteer Signup
- Form name: "Volunteer Signup" 
- Email to receive submissions: `your-test-email@example.com`
- Create the form and copy the form ID

#### Form 3: Sponsor Partnership
- Form name: "Sponsor Partnership"
- Email to receive submissions: `your-test-email@example.com`
- Create the form and copy the form ID

#### Form 4: General Inquiry
- Form name: "General Inquiry"
- Email to receive submissions: `your-test-email@example.com`
- Create the form and copy the form ID

### 3. Update Form IDs in Code
Once you have all 4 form IDs, update the `FORMSPREE_ENDPOINTS` object in `virasat/app/contact/page.tsx`:

```typescript
const FORMSPREE_ENDPOINTS = {
  artist: 'https://formspree.io/f/YOUR_ARTIST_FORM_ID',
  volunteer: 'https://formspree.io/f/YOUR_VOLUNTEER_FORM_ID', 
  sponsor: 'https://formspree.io/f/YOUR_SPONSOR_FORM_ID',
  general: 'https://formspree.io/f/YOUR_GENERAL_FORM_ID'
};
```

Replace `YOUR_ARTIST_FORM_ID`, `YOUR_VOLUNTEER_FORM_ID`, etc. with your actual form IDs.

### 4. Test the Integration
1. Start your development server: `npm run dev`
2. Navigate to `/contact`
3. Try submitting each form type
4. Check your email for the form submissions
5. Verify that the success message appears after submission

## Form Field Mapping

The forms have been configured with proper field names that Formspree will recognize:

### Artist Form Fields:
- `name` - Full Name
- `email` - Email Address
- `phone` - Phone Number
- `art_form` - Art Form Selection
- `experience` - Experience Level (radio buttons)
- `portfolio_url` - Portfolio/Website URL
- `portfolio_drive_link` - Google Drive Link for Portfolio/Work Samples
- `artistic_journey` - Artistic Journey Description
- `form_type` - Automatically set to "artist"

### Volunteer Form Fields:
- `name` - Full Name
- `email` - Email Address
- `phone` - Phone Number
- `age` - Age
- `skills` - Skills & Interests (checkboxes)
- `availability` - Availability (checkboxes)
- `previous_experience` - Previous Volunteer Experience
- `motivation` - Motivation for Volunteering
- `form_type` - Automatically set to "volunteer"

### Sponsor Form Fields:
- `company_name` - Company/Organization Name
- `contact_person` - Contact Person
- `email` - Email Address
- `phone` - Phone Number
- `partnership_type` - Partnership Type (checkboxes)
- `budget_range` - Budget Range
- `company_website` - Company Website
- `organization_description` - Organization Description
- `support_mission` - How to Support Mission
- `form_type` - Automatically set to "sponsor"

### General Form Fields:
- `name` - Name
- `email` - Email Address
- `subject` - Subject/Topic
- `message` - Message
- `form_type` - Automatically set to "general"

## Error Handling
The forms include proper error handling:
- Network errors are displayed to users
- Formspree validation errors are shown
- Success messages appear after successful submission
- Forms reset after successful submission

## Production Considerations
1. **Email Limits**: Free tier allows 50 submissions per month per form
2. **Custom Domain**: Consider upgrading to Business plan for custom email domains
3. **Spam Protection**: Formspree includes built-in spam protection
4. **File Uploads**: File uploads are not available on free tier, so we use Google Drive links instead

## Troubleshooting
- If forms don't submit, check browser console for errors
- Verify form IDs are correct in the code
- Ensure Formspree forms are active and not paused
- Check email spam folder for submissions
- Verify network connectivity

## Next Steps
Once testing is complete with your test email:
1. Create new Formspree forms with your company email
2. Update the form IDs in the code
3. Test with the production email
4. Consider upgrading to a paid plan if you expect high volume
