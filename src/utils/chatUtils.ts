// src/utils/chatUtils.ts
import type { MessageContent, ChatOption, SupportedLanguage } from '@/types/chat';

export const getLanguageContent = (
  content: MessageContent | ChatOption,
  language: SupportedLanguage
): string => {
  switch (language) {
    case 'chinese':
      return content.chinese || content.english;
    case 'japanese':
      return content.japanese || content.english;
    case 'korean':
      return content.korean || content.english;
    case 'spanish':
      return content.spanish || content.english;
    default:
      return content.english;
  }
};

export const getPronunciationContent = (
  content: MessageContent | ChatOption,
  language: SupportedLanguage
): string => {
  switch (language) {
    case 'chinese':
      return content.pinyin || '';
    case 'japanese':
      return content.romaji || '';
    case 'korean':
      return content.romanized || '';
    default:
      return '';
  }
};