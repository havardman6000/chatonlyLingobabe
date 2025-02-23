// src/app/chat/chinese/mei/page.tsx
'use client';

import { useEffect } from 'react';
import { useChatStore } from '@/store/chatStore';
import { ChatInterface } from '@/components/ChatInterface';

export default function MeiPage() {
  const { selectedCharacter, actions } = useChatStore();
  const tutorId = 'mei';

  useEffect(() => {
    // Only initialize if not already selected or different character
    if (!selectedCharacter || selectedCharacter !== tutorId) {
      actions.reset();
      actions.selectCharacter(tutorId);
    }
  }, [selectedCharacter, actions]);

  return <ChatInterface />;
}