// src/components/ChatInterface/index.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { characters } from '@/data/character';
import type { ChatMessage } from '@/types/chat';

export function ChatInterface({ characterId = 'mei' }: { characterId?: string }) {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [happiness, setHappiness] = useState(62);
  const [input, setInput] = useState('');

  const character = characters[characterId];

  // Initialize with first message
  useEffect(() => {
    const initialScene = character?.scenes[1]?.initial;
    if (initialScene && messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: initialScene
      }]);
    }
  }, [character, messages.length]);

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#1e1e1e] border-b border-gray-800">
        <div className="p-4">
          <div className="flex items-center">
            <button 
              onClick={() => router.back()}
              className="text-white flex items-center space-x-2"
            >
              ← <span>Back</span>
            </button>
            
            <div className="flex-1 text-center">
              <h1 className="text-xl font-medium">{character?.name}</h1>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>Happiness: {happiness}</span>
              </div>
            </div>
            
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="p-4">
        {/* Character Image */}
        <div className="mb-4 flex justify-center">
          <img
            src={character?.image}
            alt={character?.name}
            className="w-[300px] h-[220px] object-cover rounded-lg"
          />
        </div>

        {/* Messages */}
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} items-start gap-2`}
            >
              {message.role === 'assistant' && (
                <img 
                  src={character?.image}
                  alt={character?.name}
                  className="w-8 h-8 rounded-full"
                />
              )}

              <div className={`max-w-[80%] rounded-lg p-4 ${
                message.role === 'user' ? 'bg-green-600' : 'bg-gray-800'
              }`}>
                <p className="text-white">
                  {message.content[character?.language || 'english']}
                </p>
                {message.content.pinyin && (
                  <p className="text-gray-400 text-sm mt-1">
                    {message.content.pinyin}
                  </p>
                )}
                <p className="text-gray-400 text-sm mt-1">
                  {message.content.english}
                </p>
                {message.content.context && (
                  <p className="text-gray-500 text-sm mt-2 italic">
                    {message.content.context}
                  </p>
                )}
                
                <button 
                  className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  aria-label="Play audio"
                >
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1e1e1e] border-t border-gray-800 p-4">
        <div className="flex space-x-2">
          <button className="p-2 text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or select a message..."
            className="flex-1 bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;