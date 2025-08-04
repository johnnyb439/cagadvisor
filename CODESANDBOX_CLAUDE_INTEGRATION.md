# 🔗 Connecting CodeSandbox with Claude

## Option 1: VS Code + CodeSandbox (BEST METHOD)

### How It Works:
CodeSandbox projects can be opened directly in VS Code on your machine!

### Setup Steps:
1. **In CodeSandbox:**
   - Open your sandbox
   - Press `Shift + Alt + V` or click "Open in VS Code"
   - Or add `.vscode` to URL: `https://codesandbox.io/p/sandbox/xxxxx` → `https://xxxxx.vscode.codesandbox.io`

2. **In VS Code (Local):**
   - Install "CodeSandbox" extension
   - Sign in with your CodeSandbox account
   - Open Command Palette (`Ctrl+Shift+P`)
   - Run: "CodeSandbox: Open Sandbox"
   - Enter your sandbox ID

3. **Now Claude Can:**
   - Edit files in VS Code locally
   - Changes sync to CodeSandbox automatically
   - Your colleague sees updates in real-time
   - Preview stays live at the CodeSandbox URL

## Option 2: GitHub Sync (Automatic)

### Setup:
1. **In CodeSandbox:**
   - Click "GitHub" icon in sidebar
   - Connect to your repository
   - Enable "Auto-sync"

2. **Locally with Claude:**
   - Work in your local folder
   - Push changes to GitHub
   - CodeSandbox auto-pulls changes
   - Preview updates automatically

### Workflow:
```
Claude edits locally → Git push → GitHub → CodeSandbox syncs → Live preview updates
```

## Option 3: CodeSandbox CLI (Direct Sync)

### Install CLI:
```bash
npm install -g codesandbox
```

### Link Your Project:
```bash
# In your local project folder
codesandbox link

# Push changes to CodeSandbox
codesandbox push

# Pull changes from CodeSandbox
codesandbox pull
```

### Now Claude Can:
- Edit files locally
- Run `codesandbox push` to update
- Changes appear in CodeSandbox instantly

## Option 4: Browser + Local Folder Sync

### Using Syncthing:
1. Install Syncthing on Windows
2. Share project folder
3. Access from any device
4. Copy/paste code to CodeSandbox

### Using Git:
```bash
# Local changes with Claude
git add .
git commit -m "Claude updates"
git push

# In CodeSandbox terminal
git pull
```

## Option 5: Direct File Upload

### Quick Updates:
1. Claude edits files locally
2. In CodeSandbox: Click "Upload Files"
3. Drag updated files
4. Overwrites existing files

## 🎯 RECOMMENDED: VS Code + CodeSandbox Extension

### Why It's Best:
- ✅ Claude works in familiar VS Code
- ✅ Real-time sync to CodeSandbox
- ✅ Your colleague sees changes instantly
- ✅ No manual git commits needed
- ✅ Preview URL stays live

### Quick Setup:
1. **Install VS Code Extension:**
   ```
   code --install-extension CodeSandbox-io.codesandbox-projects
   ```

2. **Open Your Sandbox:**
   - Get sandbox ID from URL: `codesandbox.io/p/sandbox/[THIS-PART]`
   - In VS Code: `Ctrl+Shift+P` → "CodeSandbox: Open Sandbox"
   - Enter ID

3. **Start Coding:**
   - Claude edits in VS Code
   - Auto-syncs to CodeSandbox
   - Colleague sees changes
   - Preview updates live

## 🔄 Two-Way Workflow

### Your Setup:
```
Claude (VS Code) ←→ CodeSandbox ←→ Live Preview
                  ↑
                  ↓
            Your Colleague (Mac)
```

### What Happens:
1. Claude edits in VS Code locally
2. CodeSandbox extension syncs changes
3. Your colleague sees updates in browser
4. Their changes sync back to your VS Code
5. Claude can see and work with their changes

## 💡 Pro Tips:

### For Best Results:
1. Use VS Code with CodeSandbox extension
2. Keep CodeSandbox tab open in browser for preview
3. Your colleague works in CodeSandbox directly
4. Claude works in VS Code locally

### Avoid Conflicts:
- Work on different files
- Or use Live Share in VS Code
- Communicate via CodeSandbox chat

## 🚀 Start Now:

### Step 1: Open VS Code
```bash
code "C:\0_1_A_Dev\0_2_ClaudeCode_Live Project\cleared-advisory-group-website-local-backups\checkpoint_20250731_200444"
```

### Step 2: Install Extension
```bash
code --install-extension CodeSandbox-io.codesandbox-projects
```

### Step 3: Connect to Sandbox
- Press `Ctrl+Shift+P`
- Type: "CodeSandbox: Open Sandbox"
- Enter your sandbox ID

### Step 4: Start Coding!
Claude can now edit locally and changes appear in CodeSandbox!

## Need Help?
Let me know which option you want to set up and I'll walk you through it!