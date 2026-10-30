export type { ListeningMode } from '../../shared/types/learning';

/** 맥락 맞추기: hear a sentence, choose the matching meaning. */
export const contextQuestion = {
  script: '물 좀 주세요.',
  options: ['Please give me some water.','Please give me a drink.','Bring some water.','I bought some water.'],
  answer: 'Please give me some water.',
  hint: '주세요 makes a polite request. Listen for what is being asked for.',
  explanation: 'It means “Please give me some water.” 물 is water, 좀 makes the request softer, and 주세요 means “please give me”.',
} as const;

/** 받아쓰기: hear a sentence, write it in Korean. */
export const dictationQuestion = {
  script: '오늘 날씨가 좋아요.',
  hint: 'There are three words. 날씨 means “weather”.',
  explanation: 'It means “The weather is nice today.” 오늘 is today, 날씨 is weather, and 좋아요 means “is nice”.',
} as const;
