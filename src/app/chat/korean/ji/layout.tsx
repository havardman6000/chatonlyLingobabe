// src/app/chat/korean/ji/layout.tsx
'use client';

import { BackButton } from '@/components/BackButton';

export default function JiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="fixed top-4 left-4 z-50">
        <BackButton />
      </div>
      {children}
    </div>
  );
}
