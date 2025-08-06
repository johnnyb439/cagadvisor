# Claude Project Resume Guide
## How to Continue Where You Left Off

### Current Project Status (August 6, 2025 - 8:05 PM)

## 🚀 Quick Resume Commands
If Claude closes, just run these to get back up and running:
```bash
cd /Users/tone/cagadvisor
git status
npm run dev
```
Then tell Claude: "I'm working on the cagadvisor project on the suspicious-murdock branch"

## 📍 Current Setup
- **Local Directory**: `/Users/tone/cagadvisor`
- **Active Branch**: `suspicious-murdock`
- **GitHub Repo**: https://github.com/johnnyb439/cagadvisor
- **CodeSandbox**: https://codesandbox.io/p/github/johnnyb439/cagadvisor/draft/suspicious-murdock

## 🟢 Green Banner Status
- **Added**: Green banner with today's date at top of all pages
- **Location**: `/app/layout.tsx` (lines 30-33)
- **Text**: "🚀 LIVE UPDATE: Today is [date] - Branch: suspicious-murdock 🚀"
- **Style**: Inline styles with z-index: 99999 for maximum visibility

## 🔄 Sync Workflow Commands

### Pull updates from colleague:
```bash
git pull origin suspicious-murdock
```

### Push your changes to CodeSandbox:
```bash
git add .
git commit -m "your message"
git push origin suspicious-murdock
```

### Start local development server:
```bash
npm run dev
# Opens at http://localhost:3000
```

### Open in browser:
```bash
# Open local development
open -a "Google Chrome" http://localhost:3000

# Open CodeSandbox
open -a "Google Chrome" "https://codesandbox.io/p/github/johnnyb439/cagadvisor/draft/suspicious-murdock"
```

## 📝 What to Tell Claude When Resuming

Copy and paste this to Claude:

```
I'm resuming work on the cagadvisor project. Here's my setup:
- Directory: /Users/tone/cagadvisor
- Branch: suspicious-murdock (synced with CodeSandbox)
- I was working on a Next.js app with a green banner showing today's date
- The project syncs with my colleague via CodeSandbox
- Local server runs on port 3000
```

## 🛠️ Recent Changes Made
1. Created and switched to `suspicious-murdock` branch
2. Added green banner with date to layout.tsx
3. Set up sync between local terminal and CodeSandbox
4. Force pushed updates with inline styles for visibility
5. Triggered new deployment for fresh preview link

## ⚠️ Important Notes
- Always pull before making changes: `git pull`
- The project is a Next.js app (v15.1.0)
- Dependencies are already installed
- Server auto-refreshes on file changes
- CodeSandbox auto-syncs when you push to GitHub

## 🔍 Troubleshooting

### If server won't start:
```bash
# Kill existing process
lsof -ti:3000 | xargs kill -9
# Restart
npm run dev
```

### If changes don't appear in CodeSandbox:
1. Check git status: `git status`
2. Make sure you pushed: `git push origin suspicious-murdock`
3. Wait 10-30 seconds for CodeSandbox to rebuild
4. Hard refresh the preview (Cmd+Shift+R on Mac)

### If you're on wrong branch:
```bash
git checkout suspicious-murdock
git pull origin suspicious-murdock
```

## 🎯 Project Goals
- Maintain sync between local development and CodeSandbox
- Collaborate in real-time with colleague
- Test changes locally before pushing
- Keep the green banner visible as proof of sync

## 📞 Key URLs
- **Local Dev**: http://localhost:3000
- **Network**: http://192.168.18.86:3000
- **CodeSandbox Project**: https://codesandbox.io/p/github/johnnyb439/cagadvisor/draft/suspicious-murdock
- **GitHub Repo**: https://github.com/johnnyb439/cagadvisor

## Last Updated
August 6, 2025 at 8:05 PM - Terminal verified and synced with suspicious-murdock branch

---
Save this file and you'll always know how to resume your work!