import type { Gloss } from './components/GlossWord';

/** Fill-in-the-blank sentence used by vocabulary, grammar and expressions. */
export interface WordQuestion {
  /** English prompt shown above the sentence. */
  prompt: string;
  /** Part of the prompt to highlight, if any. */
  keyword?: string;
  /** Korean sentence split into tappable words; the blank part holds the answer. */
  parts: readonly (string | (Gloss & { blank?: true }))[];
  answer: string;
  options: readonly string[];
  /** Full correct sentence shown in feedback. */
  sentence: string;
  explanation: string;
}

/** 맥락 맞추기: hear a sentence, choose the matching meaning. */
export interface ContextQuestion {
  script: string;
  options: readonly string[];
  answer: string;
  hint: string;
  explanation: string;
}

/** 받아쓰기: hear a sentence, write it in Korean. */
export interface DictationQuestion {
  script: string;
  hint: string;
  explanation: string;
}
