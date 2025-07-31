# Developer A - Safety Guide for Backend & Security Implementation

## Critical Safety Measures Before Starting

### 1. Pre-Implementation Checklist
```bash
# ALWAYS run these before starting any task:
git pull origin master                    # Get latest code
powershell ./backup-checkpoint.ps1        # Create safety backup
git checkout -b feature/a-[task-id]       # Create feature branch
npm run dev                               # Verify site works before changes
```

### 2. Environment File Backup
```bash
# Backup your working .env.local
cp .env.local .env.local.backup
cp .env.local .env.local.working

# Create template for team
cp .env.local .env.local.example
# Remove sensitive values from .env.local.example before committing
```

## Task-Specific Safety Measures

### Task A-sec-1: CAPTCHA Implementation
**Risk Level: Medium** - Could break login/register forms

**Before Starting:**
```bash
# Test current auth flow
# Document working login credentials
# Screenshot current login/register pages
```

**Safety Implementation:**
```javascript
// Add feature flag in .env.local
NEXT_PUBLIC_ENABLE_CAPTCHA=false

// In your login/register components:
const isCaptchaEnabled = process.env.NEXT_PUBLIC_ENABLE_CAPTCHA === 'true';

if (isCaptchaEnabled) {
  // New CAPTCHA code
} else {
  // Keep existing flow
}
```

**Rollback Plan:**
- Set `NEXT_PUBLIC_ENABLE_CAPTCHA=false` to instantly disable
- No code removal needed

### Task A-sec-2: NextAuth.js Implementation
**Risk Level: HIGH** - Could break entire authentication system

**Phased Approach:**
```bash
# Phase 1: Install alongside existing auth
npm install next-auth @auth/prisma-adapter

# Create parallel auth system
/app/api/auth-new/[...nextauth]/route.ts  # New auth
/app/api/auth/[...nextauth]/route.ts      # Keep old auth
```

**Dual Auth Strategy:**
```javascript
// middleware.ts
export function middleware(request: NextRequest) {
  const useNewAuth = process.env.USE_NEW_AUTH === 'true';
  
  if (useNewAuth) {
    // NextAuth logic
  } else {
    // Existing localStorage logic
  }
}
```

**Testing Checklist:**
- [ ] Login works
- [ ] Register works
- [ ] Session persists on refresh
- [ ] Logout works
- [ ] Protected routes work

### Task A-sec-3 & A-sec-4: Password Hashing & Secure Cookies
**Risk Level: HIGH** - Could lock out all users

**Migration Strategy:**
```javascript
// Create migration utility
// lib/auth/migration.ts
export async function migrateUser(email: string, plainPassword: string) {
  // 1. Verify against old system
  const isValidOldAuth = checkOldAuth(email, plainPassword);
  
  if (isValidOldAuth) {
    // 2. Hash password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    
    // 3. Save to new system
    await saveToNewAuth(email, hashedPassword);
    
    // 4. Mark as migrated
    await markUserMigrated(email);
  }
}
```

### Task A-func-1: Database Integration
**Risk Level: HIGH** - Could lose all mock data

**Parallel Database Strategy:**
```javascript
// lib/db/jobService.ts
export async function getJobs() {
  const useRealDB = process.env.USE_REAL_DATABASE === 'true';
  
  if (useRealDB) {
    // Fetch from Supabase/PostgreSQL
    return await prisma.job.findMany();
  } else {
    // Return mock data
    return mockJobs;
  }
}
```

**Data Preservation:**
```bash
# Export mock data to JSON before migration
node scripts/export-mock-data.js

# Import to real database
node scripts/import-to-database.js
```

## Emergency Rollback Procedures

### 1. Instant Rollback (< 30 seconds)
```bash
# If site breaks immediately:
git stash                          # Save current work
git checkout master                # Return to stable
npm install                        # Ensure dependencies match
npm run dev                        # Verify it works
```

### 2. Full Restoration (< 5 minutes)
```bash
# If changes corrupted the project:
powershell ./restore-checkpoint.ps1
npm install
npm run dev
```

### 3. Environment Rollback
```bash
# If environment issues:
cp .env.local.backup .env.local
npm run dev
```

## Safe Testing Procedures

### 1. Local Testing Checklist
Before pushing ANY security changes:
- [ ] Login with existing account works
- [ ] Create new account works  
- [ ] Access protected routes works
- [ ] Logout works
- [ ] Data persistence works
- [ ] No console errors
- [ ] No TypeScript errors: `npx tsc --noEmit`

### 2. Feature Branch Testing
```bash
# Let colleague test your branch
git push origin feature/a-sec-2-nextauth

# Colleague runs:
git fetch origin
git checkout feature/a-sec-2-nextauth
npm install
npm run dev
# Tests functionality
```

### 3. Staging Environment
Create a test deployment:
```bash
# Deploy feature branch to Vercel preview
git push origin feature/your-branch
# Vercel creates preview URL automatically
```

## Critical Files to Monitor

### Never Break These Files:
1. `/app/layout.tsx` - Breaking this breaks entire site
2. `/app/page.tsx` - Breaking this breaks homepage
3. `/package.json` - Wrong dependencies break everything
4. `/next.config.js` - Wrong config breaks build

### Always Test After Modifying:
1. `/app/api/*` - All API routes
2. `/middleware.ts` - Affects all routes
3. `/lib/auth/*` - Authentication logic
4. `/.env.local` - Environment variables

## Communication Protocol

### Before Major Changes:
```markdown
# Slack/Discord message to colleague:
@colleague - About to implement NextAuth.js
- Feature branch: feature/a-sec-2-nextauth  
- Backup created: checkpoint_20250731_170000
- ETA: 2 hours
- Risk: Authentication might break
- Rollback plan: Set USE_NEW_AUTH=false
```

### If Something Breaks:
```markdown
# IMMEDIATE message:
@colleague - ISSUE DETECTED
- What broke: Login returns 500 error
- When: After NextAuth implementation
- Rollback: In progress
- ETA to fix: 10 minutes
```

## Progressive Enhancement Strategy

### Week 1: Foundation (Low Risk)
- Set up environment variables
- Install dependencies  
- Create parallel systems
- Add feature flags

### Week 2: Implementation (Medium Risk)
- Implement new features behind flags
- Test with small user group
- Monitor for issues

### Week 3: Migration (High Risk)
- Gradually enable for all users
- Monitor closely
- Be ready to rollback

### Week 4: Cleanup (Low Risk)
- Remove old code
- Update documentation
- Final testing

## Quick Reference Card

```bash
# BEFORE ANY TASK:
git pull && powershell ./backup-checkpoint.ps1

# IF SITE BREAKS:
git checkout master && npm install && npm run dev

# IF TOTALLY BROKEN:
powershell ./restore-checkpoint.ps1

# TEST COMMANDS:
npm run lint
npm run build
npx tsc --noEmit

# SAFE COMMIT:
git add .
git commit -m "feat: [description] - with rollback flag"
git push origin feature/branch
```

## Your High-Priority Tasks Risk Assessment

1. **A-sec-1 CAPTCHA** - Medium Risk - Use feature flag
2. **A-sec-2 NextAuth** - HIGH RISK - Use parallel system
3. **A-sec-3 Password Hash** - HIGH RISK - Gradual migration
4. **A-sec-4 Secure Cookies** - HIGH RISK - Test thoroughly
5. **A-sec-5 Rate Limiting** - Low Risk - Easy to disable
6. **A-func-1 Database** - HIGH RISK - Keep mock data option
7. **A-func-2 File Storage** - Medium Risk - Keep local option

Remember: It's better to implement slowly and safely than to break production. Always have a rollback plan!