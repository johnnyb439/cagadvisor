# Claude Code Project Guide

## Quick Start
```bash
git pull
npm run dev
```

## Making Changes
1. Always pull latest: `git pull`
2. Make your changes
3. Test locally: `npm run dev`
4. Commit and push:
   ```bash
   git add .
   git commit -m "Describe your changes"
   git push
   ```

## Important Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Check code quality

## Live URLs
- GitHub: https://github.com/johnnyb439/caglive
- Live Site: https://caglive.vercel.app

## Key Features to Test
- Mock Interview tool (Helpdesk and ISP questions now available)
- Job board functionality
- Resource downloads
- Responsive design

## Adding New Interview Categories
1. Add questions to `/app/mock-interview/interview-data.ts`
2. Update `availableRoles` array in `/app/mock-interview/page.tsx`
3. Update conditional logic for new role (search for 'helpdesk' references)
4. See `INTERVIEW_CATEGORY_TEMPLATE.md` for detailed process

## Project Structure
- `/app` - Next.js pages and routes
- `/components` - Reusable React components
- `/public` - Static assets and downloads

## Collaboration Rules
1. Always pull before starting work
2. Test changes locally before pushing
3. Write clear commit messages
4. Check live site after deployment