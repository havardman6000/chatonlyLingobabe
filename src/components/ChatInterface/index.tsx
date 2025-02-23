// src/components/ChatInterface/index.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { characters } from '@/data/character';
import { useChatStore } from '@/store/chatStore';
import { BackButton } from '@/components/BackButton';
import { ChatOptions } from './ChatOption';

export function ChatInterface() {
  const { selectedCharacter, messages, currentScene, actions } = useChatStore();
  const [happiness, setHappiness] = useState(50);
  
  const character = selectedCharacter ? characters[selectedCharacter] : null;
  const currentSceneData = character?.scenes?.[currentScene];
  const options = currentSceneData?.options || [];

  return (
    <div className="min-h-screen bg-[#131316] flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 bg-[#131316]">
        <div>
          <BackButton />
        </div>
        <div className="flex-1 text-center">
          <h1 className="text-2xl font-semibold text-white">{character?.name}</h1>
        </div>
        <div className="flex items-center gap-2 bg-[#1A1A1D] rounded-full px-3 py-1">
          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
          <span className="text-white text-sm">Happiness: {happiness}</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-2">
        {/* Display messages in a vertical list */}
        <div className="space-y-3">
          {messages.map((message, index) => (
            <div key={index}>
              <p className="text-white">{message.content.chinese}</p>
              <p className="text-gray-400">{message.content.pinyin}</p>
              <p className="text-gray-400">{message.content.english}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Options Area */}
      <div className="p-4">
        <ChatOptions 
          options={options}
          onSelectOption={(text) => {
            // Handle option selection
          }}
        />
      </div>
    </div>
  );
}