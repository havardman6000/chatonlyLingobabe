import React from 'react';

interface ChatOption {
  chinese: string;
  pinyin: string;
  english: string;
}

interface ChatOptionsProps {
  options: ChatOption[];
  onSelect: (option: ChatOption) => void;
}

export default function ChatOptions({ options, onSelect }: ChatOptionsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {options.map((option, index) => (
        <div 
          key={index}
          className="flex flex-col items-center gap-2"
        >
          <div className="text-center mb-2">
            <p className="text-white text-sm">{option.chinese}</p>
            <p className="text-gray-400 text-xs">{option.pinyin}</p>
            <p className="text-gray-400 text-xs">{option.english}</p>
          </div>
          
          <button
            onClick={() => onSelect(option)}
            className="w-16 h-16 rounded-full bg-black hover:bg-gray-900 flex items-center justify-center transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}