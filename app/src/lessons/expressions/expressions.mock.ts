import type { WordQuestion } from '../types';

/** Everyday expressions: choose what fits the moment. */
export const expressionsQuestions: readonly WordQuestion[] = [
  {
    prompt: 'Thank you.',
    keyword: 'Thank you',
    parts: [
      { word: '감사합니다', meaning: 'Thank you', note: 'A polite, formal thank-you.', blank: true },
      '.',
    ],
    answer: '감사합니다',
    options: ['죄송합니다', '감사합니다', '안녕히 가세요'],
    sentence: '감사합니다.',
    explanation: '감사합니다 is the polite way to say thank you. 죄송합니다 means “I’m sorry”, and 안녕히 가세요 is “goodbye” to someone leaving.',
  },
  {
    prompt: 'Nice to meet you.',
    keyword: 'Nice',
    parts: [
      { word: '만나서', meaning: 'meeting you', note: 'From 만나다, “to meet”. -아서 links it to what follows.' },
      ' ',
      { word: '반가워요', meaning: 'glad, nice', note: 'The polite form of 반갑다, “glad to see someone”.', blank: true },
      '.',
    ],
    answer: '반가워요',
    options: ['반가워요', '미안해요', '괜찮아요'],
    sentence: '만나서 반가워요.',
    explanation: '만나서 반가워요 means “Nice to meet you.” 미안해요 is “I’m sorry” and 괜찮아요 is “It’s okay”.',
  },
];
