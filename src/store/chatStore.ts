// src/store/chatStore.ts
import { create } from 'zustand';
import type { ChatMessage } from '@/types/chat';
import { characters } from '@/data/character';

interface ChatState {
  selectedCharacter: string | null;
  messages: ChatMessage[];
  currentScene: number;
  actions: {
    selectCharacter: (characterId: string) => void;
    addMessage: (message: ChatMessage) => void;
    setScene: (sceneNumber: number) => void;
    reset: () => void;
  };
}

export const useChatStore = create<ChatState>((set) => ({
  selectedCharacter: null,
  messages: [],
  currentScene: 1,
  actions: {
    selectCharacter: (characterId: string) => {
      if (characters[characterId]) {
        set({ 
          selectedCharacter: characterId,
          messages: [],
          currentScene: 1
        });
      }
    },
    addMessage: (message: ChatMessage) => 
      set((state) => ({ messages: [...state.messages, message] })),
    setScene: (sceneNumber: number) => set({ currentScene: sceneNumber }),
    reset: () => set({ messages: [], currentScene: 1 })
  }
}));