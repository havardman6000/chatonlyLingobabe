// src/components/ChatInterface/ChatHeader.tsx
import { useRouter } from 'next/navigation';

interface ChatHeaderProps {
  characterName: string;
  characterId: string;
}

export function ChatHeader({ characterName, characterId }: ChatHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    const language = characterId.substring(0, 2) === 'me' ? 'chinese' : 
                    characterId.substring(0, 2) === 'ao' ? 'japanese' :
                    characterId.substring(0, 2) === 'ji' ? 'korean' : 'spanish';
    
    router.push(`/chat/${language}`);
  };

  return (
    <div className="bg-gray-800 border-b border-gray-700 p-4">
      <div className="max-w-2xl mx-auto flex items-center">
        <button
          onClick={handleBack}
          className="text-gray-400 hover:text-white mr-4"
          aria-label="Go back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
        
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-white text-center">
            {characterName}
          </h1>
        </div>
      </div>
    </div>
  );
}