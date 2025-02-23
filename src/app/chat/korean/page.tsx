// src/app/chat/korean/page.tsx
'use client';

import { BackButton } from '@/components/BackButton';
import { useRouter } from 'next/navigation';

export default function KoreanPage() {
  const router = useRouter();
  
  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="sticky top-0 bg-white/50 backdrop-blur-sm z-50 p-4">
        <BackButton />
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8 pb-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Choose Your Korean Tutor
          </h1>
          <p className="text-xl text-gray-600 mt-2">
            Select a tutor to begin your Korean learning journey
          </p>
        </div>

        <div className="max-w-4xl mx-auto mt-4">
          <div className="text-sm text-gray-600 mb-6 flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
              <path d="M13 9h-2V7h2m0 10h-2v-6h2m-1-9A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2z"/>
            </svg>
            Each tutor requires a payment of 10 LBAI
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Ji - Active Tutor */}
            <div 
              className="relative rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => router.push('/chat/korean/ji')}
            >
              <img 
                src="/tutors/ji_korean.jpg"
                alt="Ji"
                className="w-full aspect-[3/4] object-cover"
              />
              <div className="absolute top-3 right-3 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
                10 LBAI
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-black/60 p-4 text-white">
                <h3 className="text-lg font-semibold">Ji (지)</h3>
                <p className="text-sm uppercase tracking-wide mt-1">Lifestyle Curator</p>
              </div>
            </div>

            {/* Disabled Tutors */}
            {['Min', 'Sua'].map((name) => (
              <div key={name} className="relative rounded-xl overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                  <p className="text-white font-semibold">Still in the works</p>
                </div>
                <div className="absolute top-3 right-3 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
                  10 LBAI
                </div>
                <div className="w-full aspect-[3/4] bg-gray-200" />
                <div className="absolute bottom-0 inset-x-0 bg-black/60 p-4 text-white">
                  <h3 className="text-lg font-semibold">{name}</h3>
                  <p className="text-sm uppercase tracking-wide mt-1">Coming Soon</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}