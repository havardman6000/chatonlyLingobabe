// src/app/chat/chinese/mei/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChatInterface } from '@/components/ChatInterface';
import { useChatStore } from '@/store/chatStore';

export default function AoiChatPage() {
  const router = useRouter();
  const { selectedCharacter, actions } = useChatStore();
  const tutorId = 'aoi';

  useEffect(() => {
    if (!selectedCharacter || selectedCharacter !== tutorId) {
      console.log('Initializing chat with tutor:', tutorId);
      actions.reset();
      actions.selectCharacter(tutorId);
    }
  }, [selectedCharacter, tutorId, actions]);

  return (
    <div className="min-h-screen bg-gray-900">
      <ChatInterface />
    </div>
  );
}