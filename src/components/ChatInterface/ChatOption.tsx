// src/components/ChatInterface/ChatOptions.tsx
import { ChatOption } from '@/types/chat';
import { Button } from '@/components/ui/button';

interface ChatOptionsProps {
  options: ChatOption[];
  onSelectOption: (text: string) => void;
}

export function ChatOptions({ options, onSelectOption }: ChatOptionsProps) {
  const getPrimaryText = (option: ChatOption) => {
    return option.chinese || 
           option.japanese || 
           option.korean || 
           option.spanish || 
           option.english;
  };

  const getPronunciationText = (option: ChatOption) => {
    return option.pinyin || 
           option.romaji || 
           option.romanized;
  };

  return (
    <div className="space-y-2">
      {options.map((option, index) => {
        const primaryText = getPrimaryText(option);
        const pronunciationText = getPronunciationText(option);

        return (
          <div
            key={option.id || index}
            className="bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
            onClick={() => onSelectOption(primaryText)}
          >
            <div className="p-3">
              <p className="text-white">{primaryText}</p>
              {pronunciationText && (
                <p className="text-sm text-gray-300">{pronunciationText}</p>
              )}
              <p className="text-sm text-gray-400">{option.english}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}