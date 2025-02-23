// src/components/ChatInterface/ChatOption.tsx
import type { ChatOption } from '@/types/chat';

interface ChatOptionsProps {
  options: ChatOption[];
  onSelectOption: (text: string) => void;
}

export function ChatOptions({ options, onSelectOption }: ChatOptionsProps) {
  return (
    <div className="flex items-center gap-4 max-w-2xl mx-auto">
      {options.map((option, index) => {
        const mainText = option.chinese || 
                        option.japanese || 
                        option.korean || 
                        option.spanish || 
                        option.english;
                        
        const pronunciation = option.pinyin || 
                            option.romaji || 
                            option.romanized;

        return (
          <div
            key={index}
            className="flex flex-col flex-1"
          >
            <div className="text-sm text-white mb-2">
              <p>{mainText}</p>
              {pronunciation && (
                <p className="text-gray-400">{pronunciation}</p>
              )}
              {option.english && (
                <p className="text-gray-400">{option.english}</p>
              )}
            </div>
            <button
              onClick={() => onSelectOption(mainText)}
              className="w-full aspect-square bg-black hover:bg-gray-900 rounded-full flex items-center justify-center transition-colors"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-12 w-12" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                color="white"
              >
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
          </div>
        );
      })}
    </div>
  );
}