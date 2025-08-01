# Fix Authentication on Vercel

## The Problem
The spinning on sign-in/create account indicates that the authentication is failing. This is because:
1. Environment variables aren't set in Vercel
2. The local file-based user storage doesn't work in Vercel's serverless environment

## Solution Steps

### 1. Set Environment Variables in Vercel

Go to: https://vercel.com/johnny-bouphavongs-projects/cagadvisor/settings/environment-variables

Add these variables:
```
NEXTAUTH_URL=https://cagadvisor.vercel.app
NEXTAUTH_SECRET=your-production-secret-here-min-32-chars
AUTH_SECRET=your-production-secret-here-min-32-chars
```

To generate a secure secret, run:
```bash
openssl rand -base64 32
```

### 2. The File System Issue

The current authentication uses local JSON files (data/users.json) which won't work on Vercel because:
- Vercel's serverless functions don't have persistent file storage
- Each function invocation gets a fresh environment

### 3. Quick Fix Options

#### Option A: Disable Authentication (Temporary)
Create a demo mode that bypasses auth for testing.

#### Option B: Use Environment Variable Users (Quick Solution)
Store a few test users in environment variables.

#### Option C: Connect to a Database (Proper Solution)
Use Vercel KV, PostgreSQL, or another database service.

## Immediate Fix - Environment Variable Users

Add this to your Vercel environment variables:
```
TEST_USERS=[{"id":"user_1","email":"demo@cagadvisor.com","password":"$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u","name":"Demo User","clearanceLevel":"Secret"}]
```

This creates a demo user:
- Email: demo@cagadvisor.com
- Password: demo123

### 4. Deploy the Fix

After adding environment variables:
1. Go to your Vercel dashboard
2. Click "Redeploy" on the latest deployment
3. Choose "Redeploy with existing Build Cache"

## Testing After Fix

1. Visit https://cagadvisor.vercel.app/login
2. Use the demo credentials
3. Check browser console for any errors

## Long-term Solution

For production, you should:
1. Set up a proper database (Vercel Postgres, Supabase, etc.)
2. Update the auth.config.ts to use the database
3. Implement proper user registration with database storage