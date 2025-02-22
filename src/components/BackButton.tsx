// src/components/BackButton.tsx
import { useRouter } from 'next/navigation';

export function BackButton() {
  const router = useRouter();
  
  return (
    <button 
      onClick={() => router.push('/language-selector')}
      className="flex items-center gap-2 bg-gradient-to-r from-blue-500/90 to-indigo-600/90 hover:from-blue-600/90 hover:to-indigo-700/90 text-white rounded-full pl-3 pr-5 py-2.5 shadow-lg transition-all duration-300 backdrop-blur-sm"
      aria-label="Go back"
    >
      <div className="rounded-full bg-white/20 p-1">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
      </div>
      <span className="font-medium">Back</span>
    </button>
  );
}