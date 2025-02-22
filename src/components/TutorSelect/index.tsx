// src/components/TutorSelect/index.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import type { SupportedLanguage } from '@/types/chat';
import { characters } from '@/data/character';

interface TutorSelectProps {
  language: SupportedLanguage;
  disabledTutors?: string[];
}

export function TutorSelect({ language, disabledTutors = [] }: TutorSelectProps) {
  const router = useRouter();
  
  // Filter tutors by language
  const tutors = Object.values(characters).filter(
    tutor => tutor.language === language
  );

  const handleTutorSelect = (tutorId: string) => {
    if (!disabledTutors.includes(tutorId)) {
      router.push(`/chat/${language}/${tutorId}`);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {tutors.map((tutor) => (
        <Card 
          key={tutor.id}
          className={`overflow-hidden transition-all duration-300 ${
            disabledTutors.includes(tutor.id)
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:shadow-xl cursor-pointer transform hover:scale-105'
          }`}
        >
          <div 
            className="relative"
            onClick={() => handleTutorSelect(tutor.id)}
          >
            <div className="aspect-[3/4] relative">
              <img 
                src={tutor.image} 
                alt={tutor.name}
                className="w-full h-full object-cover"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

              {/* Tutor info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">{tutor.name}</h2>
                <p className="text-sm opacity-90">{tutor.description}</p>
                
                {/* Native name */}
                <p className="text-lg mt-2">
                  {language === 'chinese' && tutor.chineseName}
                  {language === 'japanese' && tutor.japaneseName}
                  {language === 'korean' && tutor.koreanName}
                  {language === 'spanish' && tutor.spanishName}
                </p>
              </div>

              {/* Coming soon badge for disabled tutors */}
              {disabledTutors.includes(tutor.id) && (
                <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  Coming Soon
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}