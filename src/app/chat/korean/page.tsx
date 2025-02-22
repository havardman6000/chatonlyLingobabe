// src/app/chat/[language]/layout.tsx
'use client';

import { BackButton } from '@/components/BackButton';

export default function LanguageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 to-rose-100">
      <div className="fixed top-4 left-4 z-50">
        <BackButton />
      </div>
      {children}
    </div>
  );
}