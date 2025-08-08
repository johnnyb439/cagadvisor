# Where to Paste Generated Questions from Gemini

## File Location
`/app/mock-interview/interview-data.ts`

## Current Structure
The file currently has this structure with 15 questions per category:
```typescript
export const interviewQuestions = {
  helpdesk: [
    // 15 questions currently here
  ],
  isp: [
    // 15 questions currently here
  ],
  osp: [
    // 15 questions currently here
  ],
  network: [
    // 15 questions currently here
  ],
  systems: [
    // 15 questions currently here
  ],
  fiber: [
    // 15 questions currently here
  ]
};
```

## How to Update with 50 Questions

### Option 1: REPLACE Existing Questions
Replace the entire array for each category:

```typescript
export const interviewQuestions = {
  helpdesk: [
    // DELETE all existing questions
    // PASTE all 50 new questions from Gemini here
    {
      question: "Question 1 from Gemini...",
      answer: "Answer 1 from Gemini..."
    },
    {
      question: "Question 2 from Gemini...",
      answer: "Answer 2 from Gemini..."
    },
    // ... continue through question 50
  ],
  isp: [
    // Same process for ISP category
  ],
  // etc...
};
```

### Option 2: KEEP Existing + ADD New (Total 65 questions)
Keep your existing 15 questions and add 50 more:

```typescript
export const interviewQuestions = {
  helpdesk: [
    // ============= EXISTING QUESTIONS (1-15) =============
    // Keep your current 15 questions here
    
    // ============= ENTRY LEVEL (16-30) =============
    // Paste Entry Level questions from Gemini
    
    // ============= MID LEVEL (31-45) =============
    // Paste Mid Level questions from Gemini
    
    // ============= SENIOR LEVEL (46-55) =============
    // Paste Senior Level questions from Gemini
    
    // ============= EXPERT LEVEL (56-65) =============
    // Paste Expert Level questions from Gemini
  ],
  // Repeat for other categories
};
```

## Step-by-Step Process

1. **Generate questions in Gemini** using the prompt template
2. **Copy the output** from Gemini (should be in the correct format)
3. **Open** `/app/mock-interview/interview-data.ts` in your editor
4. **Find the category** (helpdesk, isp, osp, network, systems, or fiber)
5. **Select the existing array content** between the square brackets `[ ]`
6. **Paste** the new questions from Gemini
7. **Save** the file
8. **Test** in the browser at http://localhost:3000/mock-interview

## Format Check
Make sure each question follows this format:
```typescript
{
  question: "Your question text here",
  answer: "Your answer text here"
},
```

Note the comma after each closing brace except the last one!

## Testing After Update
1. Run `npm run dev` if not already running
2. Go to http://localhost:3000/mock-interview
3. Select the updated category
4. Click through questions to verify they load correctly

## Troubleshooting

### If you get syntax errors:
- Check for missing commas between questions
- Ensure all quotes are properly closed
- Make sure curly braces match
- Remove comma after the last question in each array

### If questions don't show up:
- Verify the category name matches exactly (lowercase)
- Check that the array brackets are properly closed
- Make sure you saved the file
- Refresh the browser with Ctrl+F5 (hard refresh)

## Quick Validation
After pasting, you can check if the syntax is correct:
```bash
npx tsc --noEmit
```
This will show any TypeScript errors without compiling.