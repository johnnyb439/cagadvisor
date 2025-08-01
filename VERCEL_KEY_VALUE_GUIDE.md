# Vercel Environment Variables - KEY and VALUE Guide

When you click "Add New" in Vercel, you'll see two boxes:
- **Key** = The name of the variable (left side)
- **Value** = The actual value (right side)

## Variable 1
- **Key**: `NEXTAUTH_URL`
- **Value**: `https://cagadvisor.vercel.app`

## Variable 2
- **Key**: `NEXTAUTH_SECRET`
- **Value**: `cag2025secureverceldeploymentkey`

## Variable 3
- **Key**: `AUTH_SECRET`
- **Value**: `cag2025secureverceldeploymentkey`

## Variable 4
- **Key**: `NODE_ENV`
- **Value**: `production`

---

## Visual Example:
```
┌─────────────────────────┬─────────────────────────────────────────┐
│ Key                     │ Value                                   │
├─────────────────────────┼─────────────────────────────────────────┤
│ NEXTAUTH_URL            │ https://cagadvisor.vercel.app           │
│ NEXTAUTH_SECRET         │ cag2025secureverceldeploymentkey        │
│ AUTH_SECRET             │ cag2025secureverceldeploymentkey        │
│ NODE_ENV                │ production                              │
└─────────────────────────┴─────────────────────────────────────────┘
```

## Step by Step:
1. Click "Add New"
2. In the "Key" field, type: `NEXTAUTH_URL`
3. In the "Value" field, type: `https://cagadvisor.vercel.app`
4. Click "Save"
5. Repeat for the other 3 variables

Remember: Don't include quotes or backticks when typing these in Vercel!