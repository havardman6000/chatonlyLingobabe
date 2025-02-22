// src/app/chat/layout.tsx
import '@/app/globals.css';  // Use absolute path with @/ alias

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}