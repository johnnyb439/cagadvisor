# 📁 OneDrive Sharing - Quick Steps

## Your Project Location:
`C:\Users\JohnnyBeast\OneDrive\CAG_Shared_Project`

## Step 1: Share the Folder (Windows)

### Method A: File Explorer
1. Press `Win + E` to open File Explorer
2. Navigate to: `C:\Users\JohnnyBeast\OneDrive\CAG_Shared_Project`
3. Right-click on `CAG_Shared_Project` folder
4. Select **"Share"**
5. Choose **"Anyone with the link can edit"**
6. Click **"Copy link"**
7. Send the link to your colleague

### Method B: OneDrive Website
1. Go to: https://onedrive.live.com
2. Find `CAG_Shared_Project` folder
3. Click the share icon (person with +)
4. Set to "Anyone with the link can edit"
5. Copy and send the link

## Step 2: Your Colleague's Setup (Mac)

Send them this message:
```
Hey! I've shared our project on OneDrive. Here's what you need to do:

1. Install OneDrive for Mac:
   https://apps.apple.com/app/onedrive/id823766827

2. Click this link: [PASTE YOUR ONEDRIVE LINK HERE]

3. Sign in to OneDrive (create free account if needed)

4. Click "Add to my OneDrive" 

5. Let it sync to your Mac

6. Open Terminal and run:
   cd ~/OneDrive/CAG_Shared_Project
   npm install
   npm run dev

That's it! Any changes you make will sync to me automatically.
```

## Step 3: Working Together

### For You (Windows):
- Edit files in: `C:\Users\JohnnyBeast\OneDrive\CAG_Shared_Project`
- Run locally: 
  ```powershell
  cd C:\Users\JohnnyBeast\OneDrive\CAG_Shared_Project
  npm run dev
  ```

### For Your Colleague (Mac):
- Edit files in: `~/OneDrive/CAG_Shared_Project`
- Run locally:
  ```bash
  cd ~/OneDrive/CAG_Shared_Project
  npm run dev
  ```

## Important Tips:

1. **Avoid Conflicts**: Don't edit the same file at the same time
2. **Check Sync Status**: Look for the OneDrive icon in system tray
3. **Exclude node_modules**: Already excluded from sync
4. **Regular Commits**: Still push to GitHub as backup

## Testing the Sync:

1. You: Create a file called `test-sync.txt`
2. Wait 30 seconds
3. Colleague: Should see the file appear
4. Colleague: Edit the file
5. You: Should see the changes

## Deployment:

Since GitHub is giving you issues, deploy directly:
- **Netlify**: Run `.\quick-netlify-deploy.ps1`
- **Vercel**: Use the web interface to import from folder
- **Surge**: `surge . --domain yourproject.surge.sh`

## Troubleshooting:

### OneDrive Not Syncing?
- Check OneDrive icon in system tray
- Right-click → "Resume syncing"
- Make sure you have internet

### Merge Conflicts?
- OneDrive creates conflict copies
- Compare and merge manually
- Delete the conflict copy when done

### Need Real-time Editing?
- Use VS Code Live Share instead
- Or switch to CodeSandbox