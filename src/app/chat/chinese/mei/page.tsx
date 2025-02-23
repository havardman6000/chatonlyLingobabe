// src/app/chat/chinese/mei/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function MeiPage() {
  const router = useRouter();
  const [happiness, setHappiness] = useState(62);

  return (
    <div className="min-h-screen bg-[#1f2937]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#1f2937] p-4">
        <div className="flex items-center">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          
          <div className="flex-1 text-center">
            <h1 className="text-white text-xl">Mei</h1>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-gray-300">Happiness: {happiness}</span>
            </div>
          </div>
          
          <div className="w-20"></div>
        </div>
      </div>

      {/* Character Image */}
      <div className="flex justify-center p-4">
        <div className="w-[400px] h-[300px] rounded-lg overflow-hidden">
          <img 
            src="/tutors/mei_chinese.jpg" 
            alt="Mei"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Chat Content */}
      <div className="p-4 space-y-4">
        {/* Initial Message */}
        <div className="flex items-start gap-3">
          <img 
            src="/tutors/mei_chinese.jpg" 
            alt="Mei" 
            className="w-8 h-8 rounded-full"
          />
          <div className="bg-gray-800 rounded-lg p-4 max-w-[80%]">
            <p className="text-white">刚刚好，我正欣赏着这里的氛围——看来你的品味不错。</p>
            <p className="text-gray-400 text-sm mt-1">Gānggāng hǎo, wǒ zhèng xīnshǎng zhe zhèlǐ de fēnwéi——kànlái nǐ de pǐnwèi búcuò.</p>
            <p className="text-gray-400 text-sm mt-1">Perfect timing. I was just admiring the ambiance—seems like you have good taste.</p>
            <p className="text-gray-500 italic text-sm mt-2">Seated at a beautifully set table, she gracefully looks up as you arrive.</p>
          </div>
        </div>

        {/* Response Options at Bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#1f2937] border-t border-gray-800 p-4">
          <div className="flex gap-2 mb-4">
            <button className="p-2 text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
            
            <input
              type="text"
              placeholder="Type or select a message..."
              className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 outline-none"
            />
            
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}