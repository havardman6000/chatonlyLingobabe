// src/components/ChatInterface/ChatMessage.tsx
import type { ChatMessage } from '@/types/chat';

interface ChatMessageProps {
  message: ChatMessage;
  avatarSrc?: string;
}

export function ChatMessageComponent({ message, avatarSrc }: ChatMessageProps) {
  const isUserMessage = message.role === 'user';

  return (
    <div className={`flex items-start gap-3 ${isUserMessage ? 'flex-row-reverse' : ''}`}>
      {!isUserMessage && (
        <img 
          src={avatarSrc} 
          alt="Tutor" 
          className="w-8 h-8 rounded-full flex-shrink-0"
        />
      )}
      
      <div className={`relative rounded-lg p-4 max-w-[80%] ${
        isUserMessage ? 'bg-green-600 text-white' : 'bg-gray-800 text-white'
      }`}>
        {/* Main text in native language */}
        <p className="text-base leading-relaxed">
          {message.content.chinese || 
           message.content.japanese || 
           message.content.korean || 
           message.content.spanish || 
           message.content.english}
        </p>

        {/* Pronunciation */}
        {(message.content.pinyin || message.content.romaji || message.content.romanized) && (
          <p className="text-sm text-gray-300 mt-1">
            {message.content.pinyin || message.content.romaji || message.content.romanized}
          </p>
        )}

        {/* English translation */}
        {message.content.english && (message.content.chinese || message.content.japanese || message.content.korean || message.content.spanish) && (
          <p className="text-sm text-gray-300 mt-1">
            {message.content.english}
          </p>
        )}

        {/* Context (in italics) */}
        {message.content.context && (
          <p className="text-sm italic text-gray-400 mt-2">
            {message.content.context}
          </p>
        )}

        {/* Audio button */}
        <button className="absolute top-2 right-2 p-1 text-gray-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}