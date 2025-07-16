# 🚀 How to Run Cleared Advisory Locally

## Step-by-Step Instructions

### 1️⃣ Open Terminal
Open a new terminal window on your Mac (Command + Space, type "Terminal")

### 2️⃣ Navigate to the Project
```bash
cd /Users/tone/cleared-advisory/cleared-advisory-nextjs
```

### 3️⃣ Install Dependencies (if not already done)
```bash
npm install
```

### 4️⃣ Start the Development Server
```bash
npm run dev
```

### 5️⃣ What You Should See
After running `npm run dev`, you should see:
```
> cleared-advisory@0.1.0 dev
> next dev

   ▲ Next.js 14.1.0
   - Local:        http://localhost:3000

 ✓ Ready in X.Xs
```

**Important:** Keep this terminal window open! The server needs to stay running.

### 6️⃣ Open Your Browser
Open Chrome, Safari, or your preferred browser and go to:
```
http://localhost:3000
```

## 🔧 Troubleshooting

### If you see "Port 3000 already in use"
1. Find what's using port 3000:
   ```bash
   lsof -i :3000
   ```

2. Kill the process (replace PID with the number from step 1):
   ```bash
   kill -9 PID
   ```

3. Try `npm run dev` again

### If you see other errors
1. Make sure you're in the right directory:
   ```bash
   pwd
   # Should show: /Users/tone/cleared-advisory/cleared-advisory-nextjs
   ```

2. Try reinstalling dependencies:
   ```bash
   rm -rf node_modules
   npm install
   ```

3. Run the dev server again:
   ```bash
   npm run dev
   ```

## 📱 What You'll See

Once running, you can navigate to:
- **Home**: http://localhost:3000
- **Jobs**: http://localhost:3000/jobs
- **Profile**: http://localhost:3000/profile
- **Employer Dashboard**: http://localhost:3000/employer/dashboard
- **Login**: http://localhost:3000/auth/login
- **Register**: http://localhost:3000/auth/register

## 🛑 To Stop the Server
Press `Ctrl + C` in the terminal window where the server is running.

---

Need help? The server runs locally on YOUR machine, not in Claude's environment. Follow these steps in your own terminal!