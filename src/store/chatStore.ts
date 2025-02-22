import { create } from 'zustand';
import type { Character, ChatMessage } from '@/types/chat';

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

export const useChatStore = create<ChatState>((set: any) => ({
  selectedCharacter: null,
  messages: [],
  currentScene: 1,
  actions: {
    selectCharacter: (characterId: string) => set({ selectedCharacter: characterId }),
    addMessage: (message: ChatMessage) => set((state: ChatState) => ({ 
      messages: [...state.messages, message] 
    })),
    setScene: (sceneNumber: number) => set({ currentScene: sceneNumber }),
    reset: () => set({ messages: [], currentScene: 1 })
  }
}));
//src/store/chatStore.ts