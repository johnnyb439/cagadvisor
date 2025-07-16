# Cleared Advisory - Next.js Proof of Concept

A modern web platform connecting security-cleared professionals with employment opportunities.

## Features Implemented

### 1. **Quick Registration System**
- Dual registration paths for job seekers and employers
- OAuth integration placeholders (LinkedIn, Google, GitHub)
- Progressive profiling with clearance level selection

### 2. **Clearance Profile System**
- Comprehensive clearance information management
- Multi-level verification system (Bronze to Platinum)
- Support for all clearance types (Public Trust to TS/SCI + Poly)
- Expiration tracking and status indicators

### 3. **Smart Job Matching**
- Advanced search with filters (clearance, location, skills)
- Match percentage display
- Real-time filtering
- One-click apply functionality

### 4. **Employer Dashboard**
- Candidate pipeline management
- Job posting overview
- Application statistics
- Real-time metrics

### 5. **Security & Design**
- Professional UI with Tailwind CSS
- Responsive design for all devices
- Clearance-specific color coding
- Modern, clean interface

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
cleared-advisory-nextjs/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Home page
│   │   ├── layout.tsx            # Root layout
│   │   ├── globals.css           # Global styles
│   │   ├── jobs/page.tsx         # Job listings
│   │   ├── profile/page.tsx      # User profile & clearance
│   │   ├── employer/
│   │   │   └── dashboard/page.tsx # Employer dashboard
│   │   └── auth/
│   │       ├── login/page.tsx    # Login page
│   │       └── register/page.tsx # Registration page
│   └── components/
│       ├── Header.tsx            # Navigation header
│       ├── Footer.tsx            # Site footer
│       ├── Hero.tsx              # Landing hero section
│       ├── Features.tsx          # Feature showcase
│       ├── Stats.tsx             # Statistics display
│       ├── JobsPreview.tsx       # Featured jobs
│       └── CTA.tsx               # Call-to-action section
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Key Routes

- `/` - Landing page with overview
- `/jobs` - Browse and search job listings
- `/profile` - User profile and clearance management
- `/employer/dashboard` - Employer management interface
- `/auth/login` - User authentication
- `/auth/register` - New user registration

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Lucide Icons** - Modern icon set

## Next Steps

To make this production-ready:

1. Add backend API integration
2. Implement authentication (NextAuth.js)
3. Connect to a database (PostgreSQL/MongoDB)
4. Add real payment processing
5. Implement email notifications
6. Add mobile app development
7. Set up deployment (Vercel/AWS)

## Development Notes

This is a proof of concept demonstrating all major features from the FEATURE_DETAILS.md specification. The application uses mock data and focuses on UI/UX implementation.