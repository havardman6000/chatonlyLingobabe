// src/store/chatStore.ts
import { create } from 'zustand';
import type { ChatMessage } from '@/types/chat';

interface ChatState {
  selectedCharacter: string | null;  // Changed from selectedTutor
  messages: ChatMessage[];
  currentScene: number;
  actions: {
    selectCharacter: (characterId: string) => void;  // Changed from selectTutor
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
    selectCharacter: (characterId: string) => set({ selectedCharacter: characterId }),
    addMessage: (message: ChatMessage) => 
      set((state) => ({ messages: [...state.messages, message] })),
    setScene: (sceneNumber: number) => set({ currentScene: sceneNumber }),
    reset: () => set({ messages: [], currentScene: 1 })
  }
}));