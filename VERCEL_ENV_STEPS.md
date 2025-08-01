# Step-by-Step: Add Environment Variables to Vercel

## Quick Copy-Paste Guide

### Step 1: Open Vercel Settings
Click this link: https://vercel.com/johnny-bouphavongs-projects/cagadvisor/settings/environment-variables

### Step 2: Add Each Variable
Click **"Add New"** and add these one by one:

#### Variable 1:
- **Key**: `NEXTAUTH_URL`
- **Value**: `https://cagadvisor.vercel.app`
- Click **Save**

#### Variable 2:
- **Key**: `NEXTAUTH_SECRET`
- **Value**: `cag2025secureverceldeploymentkey`
- Click **Save**

#### Variable 3:
- **Key**: `AUTH_SECRET`
- **Value**: `cag2025secureverceldeploymentkey`
- Click **Save**

#### Variable 4:
- **Key**: `NODE_ENV`
- **Value**: `production`
- Click **Save**

### Step 3: Redeploy
1. Go to: https://vercel.com/johnny-bouphavongs-projects/cagadvisor/deployments
2. Click the **three dots (...)** on the top deployment
3. Click **"Redeploy"**
4. Confirm by clicking **"Redeploy"** again

### That's it! 
After redeployment completes (about 1-2 minutes), you can login with:
- Email: `demo@cagadvisor.com` Password: `demo123`
- Email: `admin@cagadvisor.com` Password: `admin123`

## All Variables in One Block (for copy-paste):
```
NEXTAUTH_URL=https://cagadvisor.vercel.app
NEXTAUTH_SECRET=cag2025secureverceldeploymentkey
AUTH_SECRET=cag2025secureverceldeploymentkey
NODE_ENV=production
```