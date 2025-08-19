# Collaboration Workflow - CAG Advisory Platform

## Branch Strategy

### Main Branches:
- **`master`** - Production branch (connected to Vercel deployment)
  - Your friend works here for backend/database/AWS setup
  - Only stable, tested code should be merged here
  - Automatically deploys to production

- **`tone-development`** - Your personal development branch
  - Safe space for frontend changes and experiments
  - Won't affect production deployment
  - You can push changes here without breaking anything

## Your Workflow (Tone)

### Daily Development:
```bash
# 1. Always start by getting latest changes
git checkout tone-development
git pull origin tone-development

# 2. Make your changes to files
# (edit components, pages, styles, etc.)

# 3. Commit and push to YOUR branch
git add .
git commit -m "Describe your changes"
git push origin tone-development
```

### When Ready to Deploy:
```bash
# 1. Create a Pull Request on GitHub
# Go to: https://github.com/johnnyb439/cagadvisor/pull/new/tone-development

# 2. Your friend reviews and merges to master when ready
# This keeps production stable while you develop freely
```

## Your Friend's Workflow

### Backend Development:
```bash
# Works directly on master for:
# - Database setup
# - AWS configuration  
# - Backend API changes
# - Production deployments
```

## Benefits of This Setup

✅ **No More Conflicts**: Your changes won't interfere with backend work
✅ **Safe Development**: You can experiment without breaking production
✅ **Clean History**: Organized development with clear separation
✅ **Easy Reviews**: Your friend can review changes before they go live

## Current Setup Status

- ✅ Your development branch created: `tone-development`
- ✅ Branch is pushed to GitHub
- ✅ Local development server runs on your branch
- ✅ All your files are preserved

## Quick Commands Reference

```bash
# Check which branch you're on
git branch

# Switch to your development branch
git checkout tone-development

# Get latest changes (run this daily)
git pull origin tone-development

# Your standard workflow
git add .
git commit -m "Your change description"
git push origin tone-development
```

## Emergency: Need to Switch Back to Master?

```bash
git checkout master
git pull origin master
```

But remember: make changes on `tone-development` to avoid conflicts!