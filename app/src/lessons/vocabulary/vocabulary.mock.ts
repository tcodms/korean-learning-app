import type { Gloss } from '../components/GlossWord';
export const vocabularyOptions = ['학교','가방','우산'] as const;
/** English prompt; keyword is the meaning of the answer word and is highlighted. */
export const vocabularyPrompt = { text: 'I go to school.', keyword: 'school' } as const;
export const vocabularySentence = '저는 학교에 가요.';
export const vocabularyExplanation = '학교 means school. 에 marks where you’re going. One little word, a whole new sentence.';
/** Korean sentence split into tappable words; the blank holds the answer word. */
export const vocabularySentenceParts: readonly (string | Gloss & { blank?: true })[] = [
  { word: '저는', meaning: 'I', note: '저 is a polite way to say “I”. 는 marks the topic.' },
  ' ',
  { word: '학교', meaning: 'school', note: 'A place where you study.', blank: true },
  { word: '에', meaning: 'to', note: 'Marks the place you are going.' },
  ' ',
  { word: '가요', meaning: 'go', note: 'The polite present form of 가다, “to go”.' },
  '.',
];
