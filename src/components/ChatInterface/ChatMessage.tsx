// src/components/ChatInterface/ChatMessage.tsx
import { Avatar } from '@/components/ui/avatar';
import type { ChatMessage } from '@/types/chat';

interface ChatMessageProps {
  message: ChatMessage;
  avatarSrc?: string;
}

export function ChatMessageComponent({ message, avatarSrc }: ChatMessageProps) {
  const getMainText = () => {
    const content = message.content;
    return content.chinese || 
           content.japanese || 
           content.korean || 
           content.spanish || 
           content.english;
  };

  const getPronunciation = () => {
    const content = message.content;
    return content.pinyin || 
           content.romaji || 
           content.romanized;
  };

  const mainText = getMainText();
  const pronunciation = getPronunciation();
  const isUserMessage = message.role === 'user';

  return (
    <div className={`flex items-start space-x-2 ${isUserMessage ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {message.role === 'assistant' && (
        <Avatar className="w-8 h-8">
          {avatarSrc && <img src={avatarSrc} alt="Tutor" className="rounded-full" />}
        </Avatar>
      )}
      
      <div className={`rounded-lg p-4 max-w-[80%] ${
        isUserMessage ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'
      }`}>
        <p className="text-sm sm:text-base">{mainText}</p>
        {pronunciation && (
          <p className="text-xs sm:text-sm opacity-75 mt-1">{pronunciation}</p>
        )}
        {message.content.english && message.content.english !== mainText && (
          <p className="text-xs sm:text-sm opacity-75 mt-1 italic">
            {message.content.english}
          </p>
        )}
        {message.content.context && (
          <p className="text-xs italic mt-2 opacity-50">
            {message.content.context}
          </p>
        )}
      </div>
    </div>
  );
}