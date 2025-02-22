// src/components/ChatInterface/index.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChatMessageComponent } from './ChatMessage';
import { ChatOptions } from './ChatOption';
import { ChatHeader } from './ChatHeader';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useChatStore } from '@/store/chatStore';
import { characters } from '@/data/character';
import type { Character } from '@/types/chat';

export function ChatInterface() {
  const { selectedCharacter, messages, currentScene, actions } = useChatStore();
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [currentVideo, setCurrentVideo] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [transitionText, setTransitionText] = useState('');

  const character = selectedCharacter ? characters[selectedCharacter] as Character : null;
  const currentSceneData = character?.scenes[currentScene];
  const currentSceneOptions = currentSceneData?.options || [];

  useEffect(() => {
    if (currentSceneData?.initial && messages.length === 0) {
      actions.addMessage({
        role: 'assistant',
        content: currentSceneData.initial,
        timestamp: Date.now()
      });
      if (currentSceneData.initial.video) {
        setCurrentVideo(currentSceneData.initial.video);
      }
    }
  }, [currentScene, currentSceneData, messages.length, actions]);

  useEffect(() => {
    if (currentSceneData?.transition) {
      setTransitionText(currentSceneData.transition);
      setShowTransition(true);
      setTimeout(() => setShowTransition(false), 5000);
    }
  }, [currentScene, currentSceneData]);

  const handleOptionSelect = async (text: string) => {
    const selectedOption = currentSceneOptions.find(opt => {
      const primaryText = opt.chinese || opt.japanese || opt.korean || opt.spanish || opt.english;
      return primaryText === text;
    });

    if (!selectedOption) return;

    try {
      actions.addMessage({
        role: 'user',
        content: selectedOption,
        timestamp: Date.now()
      });

      if (selectedOption.response) {
        setTimeout(() => {
          actions.addMessage({
            role: 'assistant',
            content: selectedOption.response!,
            timestamp: Date.now()
          });

          if (selectedOption.response?.video) {
            setCurrentVideo(selectedOption.response.video);
          }
        }, 1000);
      }

      if (currentScene < Object.keys(character?.scenes || {}).length) {
        setIsTransitioning(true);
        setTimeout(() => {
          actions.setScene(currentScene + 1);
          setIsTransitioning(false);
        }, 2000);
      }

    } catch (error) {
      console.error('Error handling option:', error);
      setError('Failed to process response');
    }
  };

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="flex flex-col h-screen bg-gray-900">
      <ChatHeader
        characterName={character.name}
        characterId={character.id}
      />

      {error && (
        <Alert variant="destructive" className="m-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        {currentVideo && (
          <div className="w-full max-w-2xl mx-auto p-4">
            <video
              src={currentVideo}
              autoPlay
              loop
              muted
              className="w-full rounded-lg"
            />
          </div>
        )}

        {showTransition && (
          <div className="bg-black/50 text-white p-4 text-center my-2">
            {transitionText}
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-4">
          <div className="max-w-2xl mx-auto space-y-4 py-4">
            {messages.map((message, i) => (
              <ChatMessageComponent
                key={i}
                message={message}
                avatarSrc={character.image}
              />
            ))}
          </div>
        </div>

        <div className="p-4 bg-gray-800">
          <div className="max-w-2xl mx-auto">
            <ChatOptions
              options={currentSceneOptions}
              onSelectOption={handleOptionSelect}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
//src/components/ChatInterface/index.tsx    