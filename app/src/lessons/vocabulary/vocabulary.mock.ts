import type { WordQuestion } from '../types';

export const vocabularyQuestions: readonly WordQuestion[] = [
  {
    prompt: 'I go to school.',
    keyword: 'school',
    parts: [
      { word: '저는', meaning: 'I', note: '저 is a polite way to say “I”. 는 marks the topic.' },
      ' ',
      { word: '학교', meaning: 'school', note: 'A place where you study.', blank: true },
      { word: '에', meaning: 'to', note: 'Marks the place you are going.' },
      ' ',
      { word: '가요', meaning: 'go', note: 'The polite present form of 가다, “to go”.' },
      '.',
    ],
    answer: '학교',
    options: ['학교', '가방', '우산'],
    sentence: '저는 학교에 가요.',
    explanation: '학교 means school. 에 marks where you’re going. One little word, a whole new sentence.',
  },
  {
    prompt: 'I read a book.',
    keyword: 'book',
    parts: [
      { word: '저는', meaning: 'I', note: '저 is a polite way to say “I”. 는 marks the topic.' },
      ' ',
      { word: '책', meaning: 'book', note: 'Something you read.', blank: true },
      { word: '을', meaning: '(object marker)', note: 'Marks what the action is done to. 을 follows a final consonant.' },
      ' ',
      { word: '읽어요', meaning: 'read', note: 'The polite present form of 읽다, “to read”.' },
      '.',
    ],
    answer: '책',
    options: ['의자', '책', '사과'],
    sentence: '저는 책을 읽어요.',
    explanation: '책 means book. 을 marks the thing you read, and 읽어요 means “read”.',
  },
];
