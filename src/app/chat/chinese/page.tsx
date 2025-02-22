// src/app/chat/chinese/page.tsx
'use client';

import { BackButton } from '@/components/BackButton';
import { useRouter } from 'next/navigation';

export default function ChinesePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-r from-pink-50 to-rose-100 py-12">
      <div className="fixed top-4 left-4 z-50">
        <BackButton />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Choose Your Chinese Tutor
          </h1>
          <p className="text-2xl text-gray-600">
            Select a tutor to begin your Chinese learning journey
          </p>
        </div>

        {/* Mei Character Card */}
        <div className="max-w-2xl mx-auto">
          <div 
            className="cursor-pointer relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            onClick={() => router.push('/chat/chinese/mei')}
          >
            <img 
              src="/tutors/mei_chinese.jpg" 
              alt="Mei" 
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-6 text-white">
              <h2 className="text-2xl font-bold">Fine Dining</h2>
              <p className="text-lg">Mei (美)</p>
              <p className="mt-2 text-gray-200">
                Practice Chinese in an elegant restaurant setting
              </p>
            </div>
          </div>

          {/* Other tutors shown as coming soon */}
          <div className="grid grid-cols-2 gap-6 mt-8">
            {['Ting', 'Xue'].map((name) => (
              <div key={name} className="relative rounded-xl overflow-hidden shadow-lg opacity-50">
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                  <div className="text-white text-center">
                    <p className="text-xl font-bold">Coming Soon</p>
                  </div>
                </div>
                <div className="h-[300px] bg-gray-200"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}