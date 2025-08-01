# Vercel Production Credentials

## Demo Users Available on Production

### User 1 - Demo User
- **Email**: demo@cagadvisor.com
- **Password**: demo123
- **Clearance**: Secret

### User 2 - Admin User
- **Email**: admin@cagadvisor.com
- **Password**: admin123
- **Clearance**: Top Secret

## Environment Variables for Vercel

Copy these exactly as shown:

```
NEXTAUTH_URL=https://cagadvisor.vercel.app
NEXTAUTH_SECRET=cag2025secureverceldeploymentkey
AUTH_SECRET=cag2025secureverceldeploymentkey
NODE_ENV=production
```

## How to Set in Vercel

1. Go to: https://vercel.com/johnny-bouphavongs-projects/cagadvisor/settings/environment-variables

2. Add each variable one by one:
   - Click "Add New"
   - Enter the Key and Value
   - Keep "Production" checked
   - Click "Save"

3. After adding all variables, redeploy:
   - Go to the Deployments tab
   - Click the three dots on the latest deployment
   - Select "Redeploy"

## Testing After Setup

1. Visit: https://cagadvisor.vercel.app/login
2. Use one of the demo credentials above
3. You should be able to log in successfully

## Note

The registration feature will work but won't persist new users in production (by design for demo).
For a full production setup, you would need to connect a database.