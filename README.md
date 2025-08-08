# CAG Advisory Platform

Professional career development platform specializing in IT certification preparation and placement services for cleared professionals.

## 🚀 Features

### Mock Interview System
- **270+ Technical Questions** across 6 specialized categories
- **Progressive Difficulty** - Easy, Medium, and Hard levels
- **Categories**: Helpdesk, ISP, OSP, Fiber Optics, Network, Systems
- **Structured Answers** with industry best practices

### Career Services
- **Job Board** - Curated IT positions for cleared professionals
- **Resume Builder** - ATS-optimized templates
- **Resource Library** - Certification guides and templates
- **User Dashboard** - Track applications and progress
- ⚡ Fast performance with server-side rendering
- 🔒 Security-focused for cleared professionals

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd "C:\Users\JohnnyBeast\OneDrive - Miysis Alliance\AI Consulting\cleared-advisory-group-website"
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
cleared-advisory-group-website/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── globals.css        # Global styles
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── mock-interview/    # AI Mock Interview tool
│   ├── services/          # Services page
│   └── resources/         # Resources page
├── components/            # React components
│   ├── Hero.tsx          # Hero section
│   ├── Navbar.tsx        # Navigation
│   ├── Footer.tsx        # Footer
│   └── ...               # Other components
├── public/               # Static assets
│   └── images/           # Image files
├── lib/                  # Utility functions
└── package.json          # Dependencies
```

## Key Features

### AI Mock Interview Tool
- Tier 1: Help Desk, OSP, ISP, Fiber Optics
- Tier 2: Network Admin, Systems Admin
- Real-time feedback and practice questions

### Target Audience
- National Guard members
- Reservists
- Veterans
- Transitioning military
- Cleared professionals

## Deployment

### Option 1: Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy with one click

### Option 2: Netlify
1. Build the project: `npm run build`
2. Deploy the `.next` folder

### Option 3: Traditional Hosting
1. Build: `npm run build`
2. Start: `npm start`
3. Use PM2 or similar for production

## Next Steps

1. **Add Backend API**
   - Set up database for contact form submissions
   - Integrate OpenAI API for mock interviews
   - Add user authentication for saved progress

2. **Content Management**
   - Add blog/resources section
   - Create admin panel for content updates
   - Add more interview scenarios

3. **Analytics**
   - Add Google Analytics
   - Track user interactions
   - Monitor conversion rates

4. **SEO Optimization**
   - Add sitemap.xml
   - Implement structured data
   - Optimize meta tags

## Brand Guidelines

- **Primary Colors**: 
  - Clearance Purple (#8B5CF6)
  - Mission Magenta (#EC4899)
  - Cyber Cyan (#06B6D4)
  - Opportunity Orange (#F97316)
  - Service Teal (#10B981)

- **Typography**:
  - Headers: Montserrat
  - Body: Inter

## Support

For questions or assistance:
- Email: info@clearedadvisorygroup.com
- Phone: 1-800-CLEARED

---

© 2025 Cleared Advisory Group - Your Gateway to Opportunities