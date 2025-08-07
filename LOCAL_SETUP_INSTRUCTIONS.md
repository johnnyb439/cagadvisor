# Local Setup Instructions for CAG Advisor Website

## Prerequisites
- Node.js 18+ (Download from https://nodejs.org/)
- Git (Download from https://git-scm.com/)
- Code editor (VS Code recommended: https://code.visualstudio.com/)

## Step 1: Clone the Repository
```bash
git clone https://github.com/johnnyb439/caglive.git
cd caglive
```

Or if you already have the project:
```bash
cd /Users/tone/Desktop/CAG-Official-2025/cagadvisor-1
git pull
```

## Step 2: Install Dependencies
```bash
npm install
```

## Step 3: Set Up Environment Variables
Create a `.env.local` file in the root directory:
```bash
touch .env.local
```

Add these environment variables:
```env
# Authentication Secret (generate a random string)
AUTH_SECRET=your-secret-key-here-use-openssl-rand-hex-32

# Next Auth URL (for local development)
NEXTAUTH_URL=http://localhost:3000

# OpenAI API Key (optional - for mock interview feature)
OPENAI_API_KEY=your-openai-api-key-here
```

To generate a secure AUTH_SECRET:
```bash
openssl rand -hex 32
```

## Step 4: Run the Development Server
```bash
npm run dev
```

The site will be available at: http://localhost:3000

## Step 5: Test the Application

### Key Pages to Test:
- Homepage: http://localhost:3000
- About: http://localhost:3000/about
- Services: http://localhost:3000/services
- Resources: http://localhost:3000/resources
- Jobs: http://localhost:3000/jobs
- Mock Interview: http://localhost:3000/mock-interview
- Contact: http://localhost:3000/contact
- Login: http://localhost:3000/login
- Register: http://localhost:3000/register

### Test Authentication:
1. Register a new account at /register
2. Login with the created account at /login
3. Access the dashboard at /dashboard

## Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Export static site
npm run export
```

## Project Structure
```
cagadvisor-1/
├── app/                 # Next.js app directory (pages and routes)
│   ├── api/            # API routes
│   ├── dashboard/      # Dashboard pages
│   ├── jobs/           # Job board pages
│   ├── login/          # Authentication pages
│   └── mock-interview/ # Mock interview tool
├── components/         # Reusable React components
├── public/            # Static assets
│   ├── downloads/     # Downloadable resources
│   └── images/        # Image assets
├── lib/               # Utility functions
├── types/             # TypeScript type definitions
└── data/              # Data files (users, rate limits)
```

## Troubleshooting

### Port Already in Use
If port 3000 is already in use:
```bash
# On Mac/Linux:
lsof -i :3000
kill -9 <PID>

# Or use a different port:
PORT=3001 npm run dev
```

### Module Not Found Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Authentication Issues
1. Ensure AUTH_SECRET is set in .env.local
2. Check that NEXTAUTH_URL matches your local URL
3. Clear browser cookies and try again

## Making Changes

1. Always pull latest changes before starting:
```bash
git pull
```

2. Create a new branch for features:
```bash
git checkout -b feature/your-feature-name
```

3. Make your changes and test locally

4. Commit and push:
```bash
git add .
git commit -m "Description of changes"
git push origin feature/your-feature-name
```

## Live Deployment

The site automatically deploys to Vercel when changes are pushed to the main branch:
- Live URL: https://caglive.vercel.app
- GitHub: https://github.com/johnnyb439/caglive

## Support

For issues or questions:
- Check existing documentation in the project
- Review the README.md file
- Contact the development team

## Quick Commands Reference

```bash
# Start development
npm run dev

# Build and test production build
npm run build && npm start

# Check for issues
npm run lint

# Pull latest changes
git pull

# View current branch
git branch

# Switch to main branch
git checkout master
```