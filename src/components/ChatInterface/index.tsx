// src/components/ChatInterface/index.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { characters } from '@/data/character';
import type { ChatMessage, MessageContent } from '@/types/chat';

export function ChatInterface({ characterId = 'mei' }: { characterId?: string }) {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [happiness, setHappiness] = useState(62);
  const [input, setInput] = useState('');
  const [showOptions, setShowOptions] = useState(true);

  const character = characters[characterId];

  // Initialize messages
  useEffect(() => {
    if (character?.scenes[1]?.initial && messages.length === 0) {
      const initialMessage: ChatMessage = {
        role: 'assistant',
        content: character.scenes[1].initial
      };
      setMessages([initialMessage]);
    }
  }, [character, messages.length]);

  const handleOptionSelect = (option: MessageContent, response?: MessageContent) => {
    const newMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', content: option } as ChatMessage
    ];

    if (response) {
      newMessages.push({
        role: 'assistant',
        content: response
      } as ChatMessage);
    }

    setMessages(newMessages);
    setShowOptions(false);

    // Update happiness if points are available
    if ('points' in option) {
      setHappiness(prev => Math.min(100, prev + (option.points as number)));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#1e1e1e] text-white">
      {/* Top Bar */}
      <div className="flex items-center p-4 border-b border-gray-800">
        <button 
          onClick={() => router.push('/chat/chinese')}
          className="flex items-center gap-2 text-white"
        >
          <span className="text-xl">←</span>
          <span>Back</span>
        </button>
        
        <div className="flex-1 text-center">
          <h1 className="text-xl font-medium">Mei</h1>
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span>Happiness: {happiness}</span>
          </div>
        </div>
        
        <div className="w-20"></div>
      </div>

      {/* Character Image */}
      <div className="flex justify-center p-4">
        <img
          src={character?.image}
          alt={character?.name}
          className="w-[300px] h-[220px] object-cover rounded-lg"
        />
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 space-y-4">
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

            <div className={`relative max-w-[80%] rounded-lg p-4 ${
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
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-800 p-4">
        <div className="flex gap-2">
          <button 
            onClick={() => setShowOptions(!showOptions)}
            className="p-2 text-gray-400 hover:text-white rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or select a message..."
            className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 outline-none"
          />
          
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Send
          </button>
        </div>

        {/* Chat Options */}
        {showOptions && character?.scenes[1]?.options && (
          <div className="mt-4 grid grid-cols-1 gap-2">
            {character.scenes[1].options.map((option, index) => (
              <button
                key={index}
                className="text-left bg-gray-800 p-4 rounded-lg hover:bg-gray-700"
                onClick={() => handleOptionSelect(option, option.response)}
              >
                <p className="text-white">{option.chinese}</p>
                <p className="text-gray-400 text-sm mt-1">{option.pinyin}</p>
                <p className="text-gray-400 text-sm mt-1">{option.english}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatInterface;