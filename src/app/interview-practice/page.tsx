
'use client';

import InterviewController from '@/components/interview/InterviewController';

export default function InterviewPracticePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">AI Interview Practice</h1>
      <p className="text-lg text-gray-600 mb-8">Select a difficulty and start your mock interview.</p>
      <InterviewController />
    </div>
  );
}
