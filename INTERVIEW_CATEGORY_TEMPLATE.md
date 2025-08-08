# Mock Interview Category Addition Template

## Process for Adding New Interview Categories

### Step 1: Add Questions to interview-data.ts
Location: `/app/mock-interview/interview-data.ts`

1. Add new category to the `interviewQuestions` object
2. Format: 
```typescript
categoryname: [
  {
    question: "Scenario-based question text",
    answer: "Comprehensive answer with specific steps and tools"
  },
  // ... more questions
]
```

### Step 2: Update Available Roles
Location: `/app/mock-interview/page.tsx`

1. Find line with `const availableRoles = ['helpdesk']`
2. Add new category: `const availableRoles = ['helpdesk', 'categoryname']`

### Step 3: Update Conditional Logic
Location: `/app/mock-interview/page.tsx`

Find and update these sections:
1. Line ~56-63: `startInterview()` function
2. Line ~68-79: `generateQuestion()` function  
3. Line ~208-216: Role selection auto-start

Add conditions for new category:
```typescript
if (role.id === 'categoryname') {
  const questions = interviewQuestions.categoryname || [];
  const shuffled = shuffleArray(questions);
  // ... rest of logic
}
```

### Question Structure Requirements
Each question must have:
- **Scenario-based format**: Real-world problem presentation
- **Comprehensive answer**: Step-by-step troubleshooting approach
- **Technical specifics**: Commands, tools, procedures
- **Systematic approach**: From basic to advanced steps

### Categories Status:
- [x] helpdesk (questions added, difficulty adjusted - IN PROGRESS)
- [x] isp (questions added, difficulty adjusted - COMPLETED) 
- [x] osp (questions added, needs difficulty adjustment)
- [x] fiber (questions added, needs difficulty adjustment)
- [ ] network (Tier 2 - NO QUESTIONS YET)
- [ ] systems (Tier 2 - NO QUESTIONS YET)

### Difficulty Progression Status:
- ISP: ✅ Easy questions first, hard at end
- Helpdesk: 🔄 Currently adjusting (5 easy done, need to continue)
- OSP: ❌ Needs reordering
- Fiber: ❌ Needs reordering
- Network Admin: ❌ Not created yet
- Systems Admin: ❌ Not created yet

### Testing Checklist:
- [ ] Questions display when category selected
- [ ] Questions shuffle on each interview start
- [ ] 16 questions cycle properly
- [ ] Example answers show after submission
- [ ] Next question button works
- [ ] Interview completion at 16 questions

## Current Implementation Status
- ISP: Adding 15+ comprehensive network technician questions
- Focus: Layer 1-3 networking, physical infrastructure, ISP tools