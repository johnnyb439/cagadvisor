# Setup Guide for Your Mac Colleague

## 🍎 Mac-Specific Setup Instructions

### Option 1: Simplest - Cloud Sync (No Git)

#### Using OneDrive
1. **You (Windows)**:
   - Share your project folder via OneDrive
   - Right-click folder → "Share" → Send link

2. **Colleague (Mac)**:
   ```bash
   # Install OneDrive for Mac
   # Download from: https://apps.apple.com/app/onedrive/id823766827
   
   # After syncing, navigate to project
   cd ~/OneDrive/path/to/project
   
   # Install dependencies
   npm install
   
   # Run locally
   npm run dev
   ```

### Option 2: CodeSandbox (Zero Setup!)

1. **You**: Go to https://codesandbox.io/p/github/johnnyb439/cagadvisor
2. **Share** the link with colleague
3. **Both** can edit in browser - no installation needed!

### Option 3: Git with GUI (No Command Line)

#### For Your Colleague's Mac:
1. Download **GitHub Desktop**: https://desktop.github.com
2. Or **SourceTree**: https://www.sourcetreeapp.com
3. Clone with one click!

### Option 4: VS Code Live Share

1. **Both**: Install VS Code
2. **Both**: Install "Live Share" extension
3. **You**: Click "Share" button in VS Code
4. **Colleague**: Joins with link
5. **Both**: Edit together in real-time!

## 🚀 Quick Deployment Options

### For Instant Sharing:

#### 1. Deploy to Netlify (Free)
```bash
# On Mac or Windows
npm install -g netlify-cli
netlify deploy --prod
```

#### 2. Deploy to Railway (Simple)
```bash
# On Mac
brew install railway
railway login
railway up
```

#### 3. Use Vercel (You already have it)
```bash
# On Mac
npm i -g vercel
vercel
```

## 📱 Live Preview Sharing

### Share Your Local Dev Server:

#### Using ngrok (Mac & Windows)
```bash
# Mac install
brew install ngrok

# Windows (you)
# Run the share-with-ngrok.ps1 script

# Both platforms
ngrok http 3004
# Share the URL it gives you!
```

### Using VS Code Ports
1. In VS Code, go to "Ports" tab
2. Forward port 3004
3. Set visibility to "Public"
4. Share the URL!

## 🔄 Syncing Changes

### Without Git:
1. **OneDrive/Dropbox/Google Drive** folder sync
2. Changes appear on both computers automatically

### With Git (Simple Commands):
```bash
# Your colleague pulls your changes
git pull

# Your colleague pushes their changes
git add .
git commit -m "Mac updates"
git push
```

## 💻 Mac-Specific Tips

### Installing Node.js on Mac:
```bash
# Using Homebrew
brew install node

# Or download from nodejs.org
```

### Recommended Mac Tools:
- **Warp**: Modern terminal (https://warp.dev)
- **Raycast**: Productivity tool with snippets
- **TablePlus**: Database GUI
- **Proxyman**: API debugging

## 🎯 Recommended Workflow

### For Non-Technical Collaboration:
1. **Share**: OneDrive folder
2. **Edit**: VS Code with Live Share
3. **Deploy**: Netlify (one command)
4. **Preview**: Share Netlify URL

### For Technical Collaboration:
1. **Version Control**: Git with GitHub Desktop
2. **Edit**: VS Code with Live Share  
3. **Deploy**: Multiple platforms (Vercel, Netlify)
4. **Preview**: ngrok for instant sharing

## 📋 Quick Reference for Your Colleague

```bash
# Clone project (if using Git)
git clone https://github.com/johnnyb439/cagadvisor.git
cd cagadvisor

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to Netlify
netlify deploy --prod

# Share local server
ngrok http 3004
```

## 🆘 Troubleshooting

### Common Mac Issues:

1. **Permission errors**: 
   ```bash
   sudo npm install -g netlify-cli
   ```

2. **Port already in use**:
   ```bash
   lsof -ti:3004 | xargs kill
   ```

3. **Node version issues**:
   ```bash
   brew install nvm
   nvm install 18
   nvm use 18
   ```

## 🤝 Let's Get Started!

1. **Easiest Start**: Share CodeSandbox link
2. **Best for Files**: OneDrive sync
3. **Best for Coding**: VS Code Live Share
4. **Best for Deploy**: Netlify (works immediately)

Send this guide to your colleague and choose the option that works best for both of you!