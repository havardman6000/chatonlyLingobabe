// src/app/layout.tsx
import '@/app/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#1e1e1e] text-white">
        {children}
      </body>
    </html>
  );
}