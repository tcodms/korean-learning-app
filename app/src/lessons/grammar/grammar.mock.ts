import type { WordQuestion } from '../types';

/** Particle practice: the blank is the particle after a noun. */
export const grammarQuestions: readonly WordQuestion[] = [
  {
    prompt: 'I go to school.',
    keyword: 'to',
    parts: [
      { word: '저는', meaning: 'I', note: '저 is a polite way to say “I”. 는 marks the topic.' },
      ' ',
      { word: '학교', meaning: 'school', note: 'A place where you study.' },
      { word: '에', meaning: 'to', note: 'Marks the place you are going.', blank: true },
      ' ',
      { word: '가요', meaning: 'go', note: 'The polite present form of 가다, “to go”.' },
      '.',
    ],
    answer: '에',
    options: ['에', '을', '는'],
    sentence: '저는 학교에 가요.',
    explanation: '에 marks a destination, so 학교에 means “to school”. 을 marks an object and 는 marks a topic.',
  },
  {
    prompt: 'I eat bread.',
    parts: [
      { word: '저는', meaning: 'I', note: '저 is a polite way to say “I”. 는 marks the topic.' },
      ' ',
      { word: '빵', meaning: 'bread', note: 'Bread, buns and pastries.' },
      { word: '을', meaning: '(object marker)', note: 'Marks what you eat. 빵 ends in a consonant, so it takes 을.', blank: true },
      ' ',
      { word: '먹어요', meaning: 'eat', note: 'The polite present form of 먹다, “to eat”.' },
      '.',
    ],
    answer: '을',
    options: ['를', '을', '에'],
    sentence: '저는 빵을 먹어요.',
    explanation: '빵 ends in a consonant (ㅇ), so the object marker is 을, not 를. 에 would mean “to” a place.',
  },
];
