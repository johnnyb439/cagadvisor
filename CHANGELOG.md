# Changelog
All notable changes to the CAG Advisor project will be documented in this file.

## [Latest] - 2025-08-08

### Added
#### Enhanced Company Dashboard
- 📊 5 Interactive data visualization charts (Recharts)
- 📈 Real-time animated statistics cards
- 🎨 Professional gradient color schemes
- ⚡ Period selector (Week/Month/Quarter/Year)
- 🔔 Live activity feed with color-coded events
- 🎯 Skills match radar chart
- 📉 Department performance metrics
- ⭐ Top matched candidates section
- 🚨 Job urgency indicators
- 💼 Professional indigo/slate color palette (replaced purple)

#### Dual Account System
- 🎯 Account type selection page (/register/select-type)
- 🏢 Company registration flow with business-specific fields
- 📊 Company dashboard with job management features
- 🔀 Role-based navigation and automatic redirects
- 📈 Company analytics (active jobs, applications, response rates)
- 👥 Candidate pipeline view for companies
- ✨ Visual distinction between account types (cyan vs green themes)

### Added
#### Resources Page Enhancements
- ✨ Multi-format download support (PDF, DOCX, RTF, TXT)
- 🎨 New ResourceCard component with format selection dropdown
- 🔧 API route `/api/download/route.ts` for file generation
- 📱 Improved responsive grid layout (1-4 columns)
- 🖼️ Visual format icons and descriptions
- ⏬ Download animation feedback

#### Mobile Improvements
- 📱 MobileBottomNav component with auto-hide on scroll
- 👆 SwipeableJobCards with gesture support
- 🎯 Optimized touch targets (minimum 44px)
- 🔄 View toggle (List/Swipe) on jobs page
- 📐 Safe area padding for modern phones

#### UI/UX Features
- 🎨 Simplified Hero section with gradient background
- 🎠 FeaturedJobs carousel component
- 📝 SkillsAssessment interactive quiz
- 💰 Salary calculator page
- ❓ FAQ page with accordion

### Changed
- 📦 Updated resources page to use ResourceCard component consistently
- 🎨 Improved visual hierarchy across all pages
- 📱 Enhanced mobile responsiveness
- 🔧 Better file organization and component structure

### Fixed
- ✅ Resource card alignment issues
- ✅ Inconsistent card heights in grid layouts
- ✅ Mobile navigation overlapping content
- ✅ Touch target sizes on mobile devices

## [Previous] - 2025-08-07

### Added
- Initial project setup from GitHub repository
- Basic cleared IT job board functionality
- Mock interview feature
- Resources section
- Contact form

### Notes
- Project migrated from colleague's GitHub updates
- Cleaned up repository (removed 99 unnecessary files)
- Enhanced mock interview with 1373+ lines of questions

## File Formats Supported
| Format | Extension | Description | Compatibility |
|--------|-----------|-------------|---------------|
| PDF | .pdf | Portable Document Format | Universal |
| Word | .docx | Microsoft Word | Windows, Mac (with Office) |
| RTF | .rtf | Rich Text Format | Mac native, Windows |
| Text | .txt | Plain text | All platforms |

## Commits
- `09ba929` - Improve resources page with enhanced download functionality
- `4851e16` - Add comprehensive mobile improvements
- Previous commits available in git history

## Contributors
- JohnnyBeast (Project Owner)
- Colleague (Initial cleanup and mock interview enhancement)
- Claude AI Assistant (Development support)