# 🚀 CodeSandbox - How Live Preview Works

## Where You See Changes:

### 1. **Built-in Preview (Automatic!)**
- CodeSandbox gives you a **live URL** like: `https://xxxxx.csb.app`
- This URL works for EVERYONE - no localhost needed!
- Changes appear in 2-3 seconds after editing
- Both you and your colleague see the SAME preview

### 2. **Split Screen View**
```
┌─────────────────────┬─────────────────────┐
│                     │                     │
│    CODE EDITOR      │    LIVE PREVIEW     │
│                     │                     │
│  You edit here      │  See changes here   │
│                     │     instantly!      │
└─────────────────────┴─────────────────────┘
```

### 3. **Shareable Preview URL**
- Example: `https://cag-project-abc123.csb.app`
- Share this with ANYONE to show your work
- Works on phones, tablets, any device
- No need to deploy to Vercel!

## How to Set It Up:

### Step 1: Upload Your Project
1. Go to: https://codesandbox.io
2. Click "Create Sandbox" → "Import Project"
3. Either:
   - Drag your project folder onto the page
   - OR paste GitHub URL: `https://github.com/johnnyb439/cagadvisor`
   - OR upload as ZIP file

### Step 2: Wait for Setup (30 seconds)
- CodeSandbox automatically:
  - Installs dependencies
  - Starts the dev server
  - Creates preview URL

### Step 3: Share with Colleague
1. Click "Share" button (top right)
2. Toggle "Live Session" ON
3. Copy the editor link
4. Send to colleague

## What You Both Can Do:

### Real-Time Features:
- ✅ **See each other's cursors**
- ✅ **Edit same file simultaneously**
- ✅ **Preview updates for both instantly**
- ✅ **Chat in the sidebar**
- ✅ **See who's editing what**

### Preview Options:
1. **Internal Preview** - Built into CodeSandbox
2. **New Window** - Opens preview in separate tab
3. **Mobile View** - Test responsive design
4. **Share Preview Only** - Send preview URL to clients

## Example Workflow:

### You (Windows):
1. Upload project to CodeSandbox
2. Get editor link: `https://codesandbox.io/s/cag-project-abc123`
3. Get preview link: `https://abc123.csb.app`
4. Share editor link with colleague

### Your Colleague (Mac):
1. Opens editor link
2. Sees same code and preview
3. Makes changes
4. You see changes instantly!

### Both See:
- Same code
- Same preview
- Same URL: `https://abc123.csb.app`

## Advantages Over Local Development:

| Feature | Localhost | CodeSandbox |
|---------|-----------|-------------|
| Setup Required | Yes (npm install) | No |
| Share Preview | Need ngrok | Automatic URL |
| Live Collaboration | No | Yes |
| Works on Any Device | No | Yes |
| Deployment | Separate step | Already hosted |
| Environment Issues | Common | None |

## Quick Start Commands:

No commands needed! But if you want to run terminal commands:
1. Click "Terminal" tab in CodeSandbox
2. Run any command like:
   ```bash
   npm run build
   npm run dev
   ```

## Testing Your Site:

### Live Preview URL Examples:
- Homepage: `https://abc123.csb.app`
- Login: `https://abc123.csb.app/login`
- Dashboard: `https://abc123.csb.app/dashboard`

### Share with Others:
- Send preview URL to clients
- Works without CodeSandbox account
- They only see preview, not code

## Pro Tips:

1. **Fork Instead of Import**: If using GitHub URL, fork it to save changes
2. **Save Regularly**: CodeSandbox auto-saves but good to be sure
3. **Use Folders**: Organize sandboxes in folders
4. **Templates**: Save as template for future projects

## Limitations (Free Plan):

- Public sandboxes only (code visible to anyone with link)
- Limited to 20 files being edited simultaneously
- 500MB storage per sandbox
- Inactive sandboxes sleep after 1 hour

## To Start Now:

1. Go to: https://codesandbox.io
2. Create account (free)
3. Click "Import Repository"
4. Paste: `https://github.com/johnnyb439/cagadvisor`
5. Share the link with your colleague
6. Both edit and see changes live!

## Your Preview Will Be:
`https://[your-sandbox-id].csb.app`

This is your live website URL that updates automatically!