# 🔧 CodeSandbox Environment Setup

## ⚠️ IMPORTANT: Set Environment Variables in CodeSandbox

The authentication is spinning because CodeSandbox needs environment variables configured.

---

## 📝 Quick Setup Steps:

### 1. In CodeSandbox, click the **"⚙️ Settings"** icon (bottom left)

### 2. Click **"Environment Variables"** or **"Env"**

### 3. Add these variables:

| Key | Value |
|-----|-------|
| `NEXTAUTH_URL` | `https://dfv3s6-3000.csb.app` |
| `NEXTAUTH_SECRET` | `codesandbox_secret_key_123456789` |
| `AUTH_SECRET` | `codesandbox_secret_key_123456789` |
| `NODE_ENV` | `production` |

### 4. **Restart the server** (click restart in terminal or refresh preview)

---

## 🔐 Demo Accounts (After Setup):

Once environment variables are set, use these accounts:

### Regular User:
- **Email**: `demo@cagadvisor.com`
- **Password**: `demo123`

### Admin User:
- **Email**: `admin@cagadvisor.com`
- **Password**: `admin123`

---

## 🧪 Test the Setup:

1. **Check auth status**: https://dfv3s6-3000.csb.app/api/auth/test
2. **Try logging in**: https://dfv3s6-3000.csb.app/login

---

## 🛠️ Alternative: Use .env File

If the UI method doesn't work:

1. Create a file called `.env.local` in the root
2. Add:
```env
NEXTAUTH_URL=https://dfv3s6-3000.csb.app
NEXTAUTH_SECRET=codesandbox_secret_key_123456789
AUTH_SECRET=codesandbox_secret_key_123456789
NODE_ENV=production
```
3. Restart the server

---

## 🚨 Troubleshooting:

### Still spinning?
1. Hard refresh: `Ctrl+Shift+R`
2. Check browser console for errors
3. Verify the preview URL matches NEXTAUTH_URL
4. Try incognito/private mode

### Network errors?
- CodeSandbox might be blocking auth cookies
- Try: Settings → Privacy → Allow third-party cookies

---

## ✅ Success Indicators:

When it's working, you'll see:
- Login form submits without spinning
- Redirects to dashboard after login
- "Sign Out" button appears when logged in
- No console errors about authentication

---

## 📞 Need Help?

If still not working after these steps:
1. Check https://dfv3s6-3000.csb.app/api/auth/test
2. Share any error messages from browser console
3. We can switch to local development if needed