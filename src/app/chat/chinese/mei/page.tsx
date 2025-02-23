// src/app/chat/chinese/mei/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChatInterface } from '@/components/ChatInterface';
import { useChatStore } from '@/store/chatStore';

export default function MeiChatPage() {
  const router = useRouter();
  const { selectedCharacter, actions } = useChatStore();
  const tutorId = 'mei';

  useEffect(() => {
    if (!selectedCharacter || selectedCharacter !== tutorId) {
      console.log('Initializing chat with tutor:', tutorId);
      actions.reset();
      actions.selectCharacter(tutorId);
    }
  }, [selectedCharacter, tutorId, actions]);

  return (
    <div className="min-h-screen bg-gray-900">
      <div
        className="fixed top-[6%] left-[-13.5%] h-full w-[30%] bg-cover bg-no-repeat z-40"
        style={{ backgroundImage: 'url(/tutors/Tree.png)' }}
      />
      <ChatInterface />
    </div>
  );
}