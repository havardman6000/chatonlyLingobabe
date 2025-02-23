import React from 'react';
import { useRouter } from 'next/navigation';

interface TutorSelectProps {
  language: string;
  disabledTutors?: string[];
}

const TutorSelect = ({ language, disabledTutors = [] }: TutorSelectProps) => {
  const router = useRouter();

  const getTutorInfo = (language: string) => {
    switch (language) {
      case 'chinese':
        return {
          active: { id: 'mei', name: 'Mei', localName: '美', scene: 'Fine Dining' },
          disabled: ['Ting', 'Xue']
        };
      case 'japanese':
        return {
          active: { id: 'aoi', name: 'Aoi', localName: '葵', scene: 'Tea House' },
          disabled: ['Aya', 'Misa']
        };
      case 'korean':
        return {
          active: { id: 'ji', name: 'Ji', localName: '지', scene: 'Modern Cafe' },
          disabled: ['Min', 'Sua']
        };
      case 'spanish':
        return {
          active: { id: 'isabella', name: 'Isabella', localName: '', scene: 'Vibrant Cafe' },
          disabled: ['Sofia', 'Valentina']
        };
      default:
        return { active: null, disabled: [] };
    }
  };

  const tutorInfo = getTutorInfo(language);

  return (
    <main className="min-h-screen bg-gradient-to-r from-pink-50 to-rose-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Choose Your {language.charAt(0).toUpperCase() + language.slice(1)} Tutor
          </h1>
          <p className="text-2xl text-gray-600">
            Select a tutor to begin your {language} learning journey
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Active Tutor Card */}
          {tutorInfo.active && (
            <div
              className="cursor-pointer relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => router.push(`/chat/${language}/${tutorInfo.active?.id}`)}
            >
              <img
                src={`/tutors/${tutorInfo.active.id}_${language}.jpg`}
                alt={tutorInfo.active.name}
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-6 text-white">
                <h2 className="text-2xl font-bold">{tutorInfo.active.scene}</h2>
                <p className="text-lg">
                  {tutorInfo.active.name}
                  {tutorInfo.active.localName && ` (${tutorInfo.active.localName})`}
                </p>
                <p className="mt-2 text-gray-200">
                  Practice {language} in an immersive setting
                </p>
              </div>
            </div>
          )}

          {/* Disabled Tutors Grid */}
          <div className="grid grid-cols-2 gap-6 mt-8">
            {tutorInfo.disabled.map((name) => (
              <div key={name} className="relative rounded-xl overflow-hidden shadow-lg opacity-50">
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                  <div className="text-white text-center">
                    <p className="text-xl font-bold">Coming Soon</p>
                  </div>
                </div>
                <div className="h-[300px] bg-gray-200"></div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4">
                  <h3 className="text-lg text-white">{name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default TutorSelect;