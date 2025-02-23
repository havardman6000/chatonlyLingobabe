// src/app/language-selector/page.tsx
'use client';

import { useRouter } from 'next/navigation';

const languages = [
  {
    id: 'chinese',
    name: 'CHINESE',
    imageUrl: '/tutors/chinese.jpg',
    backgroundColor: 'bg-green-50',
  },
  {
    id: 'japanese',
    name: 'JAPANESE',
    imageUrl: '/tutors/japanese.jpg',
    backgroundColor: 'bg-red-50',
  },
  {
    id: 'korean',
    name: 'KOREAN',
    imageUrl: '/tutors/korean.jpg',
    backgroundColor: 'bg-blue-50',
  },
  {
    id: 'spanish',
    name: 'SPANISH',
    imageUrl: '/tutors/spanish.jpg',
    backgroundColor: 'bg-yellow-50',
  }
];

export default function LanguageSelector() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#bde9e9] relative">
      <div className="fixed tree-background opacity-20" />
      
      <div className="px-4 py-6">
        <h1 className="text-7xl font-bold text-white text-center mb-12">
          Pick a<br />Language
        </h1>
        
        <div className="max-w-4xl mx-auto space-y-6">
          {languages.map((language) => (
            <button
              key={language.id}
              onClick={() => router.push(`/chat/${language.id}`)}
              className="w-full overflow-hidden rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 relative"
            >
              <div className="relative aspect-[16/7]">
                <img 
                  src={language.imageUrl} 
                  alt={language.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
                <h2 className="absolute text-6xl font-bold text-white left-8 top-1/2 -translate-y-1/2">
                  {language.name}
                </h2>
              </div>
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .tree-background {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url('/tutors/Tree.png');
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          z-index: 0;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}