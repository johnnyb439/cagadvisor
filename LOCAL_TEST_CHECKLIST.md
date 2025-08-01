# Local Testing Checklist

## 🚀 Server Information
- **URL**: http://localhost:3003
- **NEXTAUTH_URL**: Updated to match port 3003

## ⚠️ IMPORTANT: Restart the server
1. Stop the current server (Ctrl+C)
2. Run: `npm run dev`
3. Wait for "Ready" message

## 🧪 Test Accounts
```
Email: test@test.com
Password: test

Email: testtest@test.com
Password: testtest12
```

## ✅ Testing Checklist

### 1. Homepage Test
- [ ] Visit http://localhost:3003
- [ ] Check that the page loads without errors
- [ ] Verify navigation menu works
- [ ] Check responsive design

### 2. Registration Test
- [ ] Go to http://localhost:3003/register
- [ ] Fill in all fields:
  - Name: Test User
  - Email: newtest@test.com
  - Password: testpassword123
  - Confirm Password: testpassword123
  - Clearance Level: Secret
  - ✓ Agree to terms
- [ ] Click "Create Account"
- [ ] Should redirect to login or dashboard

### 3. Login Test
- [ ] Go to http://localhost:3003/login
- [ ] Enter credentials:
  - Email: test@test.com
  - Password: test
- [ ] Click "Sign In"
- [ ] Should redirect to dashboard

### 4. Dashboard Test
- [ ] Access http://localhost:3003/dashboard
- [ ] Should see welcome message with user name
- [ ] Check Quick Actions work
- [ ] Test navigation to different sections

### 5. Authentication Flow Test
- [ ] Click "Log Out" in dashboard
- [ ] Should redirect to login page
- [ ] Try accessing http://localhost:3003/dashboard directly
- [ ] Should redirect to login if not authenticated

## 🔍 What to Look For
- No console errors in browser DevTools
- Smooth navigation between pages
- Proper redirects after login/logout
- Session persistence (refresh page while logged in)

## 🐛 Common Issues & Fixes

### "Something went wrong" error
- Check browser console for specific errors
- Verify .env.local has correct NEXTAUTH_URL
- Ensure server was restarted after env changes

### Can't login
- Check data/users.json exists and has test users
- Verify password is correct (case sensitive)
- Clear browser cookies for localhost

### Dashboard not loading
- Ensure you're logged in first
- Check session is being maintained
- Verify middleware.ts is working correctly