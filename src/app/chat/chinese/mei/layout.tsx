// src/app/chat/chinese/mei/layout.tsx
import '@/app/globals.css';

export default function MeiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#1e1e1e]">
      {children}
    </div>
  );
}