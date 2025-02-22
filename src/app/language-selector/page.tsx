// src/app/language-selector/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const languages = [
  {
    id: 'chinese',
    name: 'Chinese',
    description: '中文',
    imageUrl: '/tutors/chinese.png'
  },
  {
    id: 'japanese',
    name: 'Japanese',
    description: '日本語',
    imageUrl: '/tutors/japanese.png'
  },
  {
    id: 'korean',
    name: 'Korean',
    description: '한국어',
    imageUrl: '/tutors/korean.png'
  },
  {
    id: 'spanish',
    name: 'Spanish',
    description: 'Español',
    imageUrl: '/tutors/spanish.png'
  }
];

export default function LanguageSelection() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const handleLanguageSelect = (languageId: string) => {
    setSelectedLanguage(languageId);
    router.push(`/chat/${languageId}`);
  };

  return (
    <div className="min-h-screen bg-[#bde9e9] flex flex-col items-center justify-center p-4 sm:p-8 relative">
      <div
        className="fixed top-0 left-0 h-full w-full bg-cover bg-no-repeat z-10 opacity-25 sm:opacity-50"
        style={{ backgroundImage: 'url(/tutors/Tree.png)' }}
        aria-hidden="true"
      />
      
      <h1 className="text-4xl sm:text-7xl font-bold text-white mb-6 sm:mb-12 text-center z-20">
        Pick a <br /><span className="text-5xl sm:text-8xl">Language</span>
      </h1>
      
      <div className="flex-grow overflow-y-auto w-full max-w-xl z-20">
        <div className="grid grid-cols-1 gap-6 sm:gap-8">
          {languages.map((language) => (
            <button
              key={language.id}
              onClick={() => handleLanguageSelect(language.id)}
              className="relative rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label={`Select ${language.name} language`}
            >
              <img 
                src={language.imageUrl} 
                alt={`${language.name} - ${language.description}`}
                className="w-full object-contain rounded-t-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4">
                <h2 className="text-xl font-bold">{language.name}</h2>
                <p className="text-lg opacity-90">{language.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}