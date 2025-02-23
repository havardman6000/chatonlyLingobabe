import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { characters } from '@/data/character';
import { useChatStore } from '@/store/chatStore';
import type { ChatMessage, ChatOption } from '@/types/chat';
import { getLanguageContent, getPronunciationContent } from '@/utils/chatUtils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function ChatInterface() {
  const router = useRouter();
  const { selectedCharacter, messages, currentScene, actions } = useChatStore();
  const [happiness, setHappiness] = useState(50);

  const character = selectedCharacter ? characters[selectedCharacter] : null;
  const currentSceneData = character?.scenes?.[currentScene];

  useEffect(() => {
    if (currentSceneData?.initial && messages.length === 0) {
      actions.addMessage({
        role: 'assistant',
        content: currentSceneData.initial
      });
    }
  }, [currentScene, currentSceneData, messages.length, actions]);

  if (!character) return null;

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Background tree image */}
      <div 
        className="fixed top-[6%] left-[-13.5%] h-full w-[30%] bg-cover bg-no-repeat z-40"
        style={{ backgroundImage: 'url(/tutors/Tree.png)' }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-4 bg-background/80 backdrop-blur-sm border-b">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button 
            onClick={() => router.back()}
            variant="outline"
            className="flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </Button>

          <div className="text-center">
            <h1 className="text-xl font-semibold">{character.name}</h1>
            <div className="flex items-center justify-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
              <span className="text-sm text-muted-foreground">Happiness: {happiness}</span>
            </div>
          </div>

          <div className="w-[88px]" />
        </div>
      </header>

      {/* Character Image */}
      <Card className="fixed top-20 left-1/2 -translate-x-1/2 w-64 h-48 overflow-hidden z-30">
        <img 
          src={character.image}
          alt={character.name}
          className="w-full h-full object-cover"
        />
      </Card>

      {/* Messages */}
      <main className="pt-80 pb-32 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message, index) => (
            <div 
              key={index}
              className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <img 
                  src={character.image}
                  alt={character.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}

              <div 
                className={`relative max-w-[80%] rounded-lg p-4 ${
                  message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}
              >
                <p className="text-base">
                  {getLanguageContent(message.content, character.language)}
                </p>

                {getPronunciationContent(message.content, character.language) && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {getPronunciationContent(message.content, character.language)}
                  </p>
                )}

                <p className="text-sm text-muted-foreground mt-1">
                  {message.content.english}
                </p>

                {message.content.context && (
                  <p className="text-sm italic text-muted-foreground mt-2">
                    {message.content.context}
                  </p>
                )}

                {/* Play button */}
                <button className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {message.role === 'user' && (
                <img 
                  src="/tutors/user_avatar.jpg"
                  alt="You"
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Options */}
      {currentSceneData?.options && (
        <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t">
          <div className="max-w-4xl mx-auto p-4">
            <div className="flex gap-4 overflow-x-auto pb-2">
              {currentSceneData.options.map((option, index) => (
                <Card
                  key={option.id || index}
                  className="flex-none p-4 w-64 cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => {
                    actions.addMessage({
                      role: 'user',
                      content: option
                    });
                    if (option.response) {
                      actions.addMessage({
                        role: 'assistant',
                        content: option.response
                      });
                    }
                    if (option.points) {
                      setHappiness(h => Math.min(100, h + (option.points || 0)));
                    }
                  }}
                >
                  <p className="text-sm">
                    {getLanguageContent(option, character.language)}
                  </p>
                  {getPronunciationContent(option, character.language) && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {getPronunciationContent(option, character.language)}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {option.english}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}