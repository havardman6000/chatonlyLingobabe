// src/app/layout.tsx
import '@/app/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}

export const metadata = {
  title: 'Language Learning Chat',
  description: 'Learn languages through interactive conversations',
};