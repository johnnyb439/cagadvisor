# Cleared Advisory - Security Clearance Job Platform

A modern web platform connecting security-cleared professionals with global employment opportunities.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🚀 Features

### 🎯 NEW: Recruiter Dashboard (July 2025)
- **Clearance Verification Tool** - Instantly verify candidate clearance status (Active/Inactive/In-Scope)
- **Smart Resume Parser** - AI-powered resume analysis with automatic data extraction
- **Talent Radar** - Auto-match candidates to open positions based on clearance, skills, and location
- **Activity Tracker** - Timeline view of all candidate interactions and communications
- **Talent Pipelines** - Organize candidates into custom talent pools by clearance level and skills

### 🗺️ Interactive Global Job Heat Map
- Real-world map visualization using `react-simple-maps`
- Color-coded markers (Green: Qualified, Yellow: Close, Red: Need Higher Clearance)
- Real-time job data across USA, Europe, Middle East, and Asia-Pacific
- Click markers for detailed job information

### 🎥 Video Interview Platform
- Personalized mock interviews based on user role
- 5 difficulty levels (Entry to Expert)
- Auto-playing video questions
- Progress tracking and timed responses

### ✍️ Digital Interview Approval System
- Interactive signature reveal animation
- Hiring manager approval stamps
- Clearance verification confirmation

### 🔐 Clearance Management
- Support for all clearance levels (Public Trust to TS/SCI + Poly)
- Clearance expiration tracking
- Multi-level verification system

### 📊 Advanced Features
- Smart job matching algorithm
- One-click apply system
- Employer dashboard
- Real-time notifications
- Mobile responsive design

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Maps**: react-simple-maps, d3-geo
- **Icons**: Lucide React
- **State**: React Hooks

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cleared-advisory.git
cd cleared-advisory/cleared-advisory-nextjs
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 Key Routes

- `/` - Landing page with platform overview
- `/features` - Interactive demos (Heat Map, Video Interview, Approval System)
- `/jobs` - Browse job listings
- `/profile` - User profile and clearance management
- `/employer/dashboard` - Employer management interface
- `/auth/login` - User authentication
- `/auth/register` - New user registration

## 🚀 Deployment

### Deploy to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Deploy with one click

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/cleared-advisory)

## 📸 Screenshots

### Global Job Heat Map
Interactive world map showing cleared positions worldwide with real-time qualification status.

### Video Interview Platform
Personalized mock interviews with difficulty selection and progress tracking.

### Digital Approval System
Unique hiring manager approval stamps with animated signature reveals.

## 🔮 Future Enhancements

- [ ] NextAuth.js authentication
- [ ] PostgreSQL database with Prisma
- [ ] Real-time chat system
- [ ] Email notifications
- [ ] Payment integration
- [ ] Mobile app (React Native)
- [ ] AI-powered job matching
- [ ] Blockchain clearance verification

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with Next.js and React
- Map data from Natural Earth via d3-geo
- Icons by Lucide React

---

**Note**: This is a proof of concept. For production use, implement proper authentication, database integration, and security measures.