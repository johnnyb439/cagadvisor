# 🔧 Fix CodeSandbox Authentication Error

## Error: "ClientFetchError: There was a problem with the server configuration"

This error occurs when environment variables are not properly set in CodeSandbox.

---

## ✅ Quick Fix (3 Steps):

### Step 1: Open CodeSandbox Settings
1. In CodeSandbox, click **⚙️** icon (bottom left)
2. Click **"Environment Variables"** or **"Env"** tab

### Step 2: Add ALL These Variables
Copy and paste each line EXACTLY:

| Variable | Value |
|----------|-------|
| `AUTH_SECRET` | `codesandbox-secret-key-123456789` |
| `NEXTAUTH_SECRET` | `codesandbox-secret-key-123456789` |
| `NEXTAUTH_URL` | `https://dfv3s6-3000.csb.app` |
| `NODE_ENV` | `production` |

⚠️ **IMPORTANT**: Make sure the URL matches YOUR preview URL!

### Step 3: Restart Server
1. Go to Terminal tab in CodeSandbox
2. Press `Ctrl+C` to stop server
3. It will auto-restart, or type `npm run dev`

---

## 🔐 Test Authentication:

### Test Accounts:
```
Email: demo@cagadvisor.com
Password: demo123
```

```
Email: admin@cagadvisor.com  
Password: admin123
```

### Test Links:
1. Check config: https://dfv3s6-3000.csb.app/api/auth/test
2. Login page: https://dfv3s6-3000.csb.app/login

---

## 🛠️ Still Not Working?

### Option 1: Clear Browser Data
1. Open DevTools (`F12`)
2. Go to Application tab
3. Clear Storage → Clear site data
4. Refresh page

### Option 2: Use .env.local File
1. Create new file `.env.local` in root
2. Add:
```env
AUTH_SECRET=codesandbox-secret-key-123456789
NEXTAUTH_SECRET=codesandbox-secret-key-123456789
NEXTAUTH_URL=https://dfv3s6-3000.csb.app
NODE_ENV=production
```
3. Save and restart server

### Option 3: Fork the Sandbox
1. Click "Fork" button (top right)
2. Creates fresh copy
3. Add environment variables to new fork

---

## 📝 Verification Checklist:

- [ ] All 4 environment variables added
- [ ] NEXTAUTH_URL matches your preview URL
- [ ] Server restarted after adding variables
- [ ] Browser cache cleared
- [ ] Using correct demo credentials

---

## 🎯 Expected Result:

When working correctly:
- Login form submits without errors
- Redirects to /dashboard after login
- No console errors
- "Sign Out" button visible when logged in

---

## 💡 Why This Happens:

CodeSandbox runs in a containerized environment that:
- Can't access local file system
- Requires explicit environment variables
- Needs AUTH_SECRET for JWT signing
- Must have matching NEXTAUTH_URL for CSRF protection

---

## Need More Help?

Check the browser console for specific error messages and share them!