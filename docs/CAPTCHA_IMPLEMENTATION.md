# CAPTCHA Implementation Guide

## Overview
Google reCAPTCHA v3 has been implemented for the login and register forms with a feature flag for easy enable/disable.

## Current Status
- ✅ reCAPTCHA v3 package installed
- ✅ RecaptchaProvider component created
- ✅ useRecaptcha custom hook implemented
- ✅ Server-side verification API route created
- ✅ Login page integrated with CAPTCHA
- ✅ Register page integrated with CAPTCHA
- ✅ Feature flag for enable/disable

## Configuration

### Environment Variables
Add these to your `.env.local` file:

```env
# Enable/Disable CAPTCHA (true/false)
NEXT_PUBLIC_ENABLE_CAPTCHA=false

# Google reCAPTCHA keys (get from https://www.google.com/recaptcha/admin)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

### Getting reCAPTCHA Keys
1. Go to https://www.google.com/recaptcha/admin
2. Create a new site
3. Choose reCAPTCHA v3
4. Add your domains (localhost for development)
5. Copy the Site Key and Secret Key

## Testing

### To Enable CAPTCHA:
1. Set `NEXT_PUBLIC_ENABLE_CAPTCHA=true` in `.env.local`
2. Add your reCAPTCHA keys
3. Restart the development server
4. You should see "Protected by reCAPTCHA v3" on login/register pages

### To Disable CAPTCHA:
1. Set `NEXT_PUBLIC_ENABLE_CAPTCHA=false` in `.env.local`
2. Restart the development server
3. Forms will work without CAPTCHA verification

## How It Works

### Client Side:
1. `RecaptchaProvider` wraps the entire app when enabled
2. `useRecaptcha` hook provides `executeRecaptcha` function
3. On form submit, token is generated and sent to server

### Server Side:
1. `/api/auth/verify-captcha` endpoint verifies the token
2. Checks score threshold (default: 0.5)
3. Validates action matches (login/register)
4. Returns success/failure

## Score Threshold
- Default threshold: 0.5
- Scores range from 0.0 to 1.0
- Higher scores = more likely human
- Adjust in `/app/api/auth/verify-captcha/route.ts` line 47

## Troubleshooting

### "reCAPTCHA not yet loaded"
- Check internet connection
- Verify Site Key is correct
- Check browser console for errors

### "Security verification failed"
- Check Secret Key is correct
- Verify domain is added to reCAPTCHA settings
- Check score threshold

### CAPTCHA not appearing
- Verify `NEXT_PUBLIC_ENABLE_CAPTCHA=true`
- Check Site Key is set
- Restart development server

## Future Enhancements
- Add CAPTCHA to other forms (contact, forgot password)
- Implement custom threshold per action
- Add analytics for bot detection
- Create admin panel for CAPTCHA settings

## Security Notes
- Never expose `RECAPTCHA_SECRET_KEY` to client
- Always verify tokens server-side
- Consider different thresholds for different actions
- Monitor scores to adjust thresholds