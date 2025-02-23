// src/components/BackButton.tsx
'use client';

import { useRouter } from 'next/navigation';

export function BackButton() {
  const router = useRouter();
  
  return (
    <button 
      onClick={() => router.back()}
      className="flex items-center gap-2 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
      aria-label="Go back"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      <span>Back</span>
    </button>
  );
}