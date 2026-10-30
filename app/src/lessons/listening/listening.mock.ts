import type { ContextQuestion, DictationQuestion } from '../types';
export type { ListeningMode } from '../../shared/types/learning';

/** 맥락 맞추기: hear a sentence, choose the matching meaning. */
export const contextQuestions: readonly ContextQuestion[] = [
  {
    script: '물 좀 주세요.',
    options: ['Please give me some water.', 'Please give me a drink.', 'Bring some water.', 'I bought some water.'],
    answer: 'Please give me some water.',
    hint: '주세요 makes a polite request. Listen for what is being asked for.',
    explanation: 'It means “Please give me some water.” 물 is water, 좀 makes the request softer, and 주세요 means “please give me”.',
  },
  {
    script: '화장실이 어디예요?',
    options: ['Where is the restaurant?', 'Where is the restroom?', 'Is this the restroom?', 'I went to the restroom.'],
    answer: 'Where is the restroom?',
    hint: '어디 means “where”. Listen for the place being asked about.',
    explanation: 'It means “Where is the restroom?” 화장실 is restroom, 어디 is where, and 예요 makes it a polite question.',
  },
];

/** 받아쓰기: hear a sentence, write it in Korean. */
export const dictationQuestions: readonly DictationQuestion[] = [
  {
    script: '오늘 날씨가 좋아요.',
    hint: 'There are three words. 날씨 means “weather”.',
    explanation: 'It means “The weather is nice today.” 오늘 is today, 날씨 is weather, and 좋아요 means “is nice”.',
  },
  {
    script: '이거 얼마예요?',
    hint: 'There are two words. 얼마 means “how much”.',
    explanation: 'It means “How much is this?” 이거 is “this (thing)”, and 얼마예요 asks “how much is it?”.',
  },
];
