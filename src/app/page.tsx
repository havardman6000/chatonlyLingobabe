// src/app/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect to language selector
    router.push('/language-selector');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-50 to-rose-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Language Learning Chat
        </h1>
        <p className="text-gray-600">
          Redirecting to language selection...
        </p>
      </div>
    </div>
  );
}