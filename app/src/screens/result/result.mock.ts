import type { Skill } from '../../shared/types/learning';

export type ResultKind = 'daily' | 'free' | 'review';
export interface LearningResult {
  kind: ResultKind;
  answered: number;
  correct: number;
  seconds: number;
  reviewCount: number;
  areas: Skill[];
  highlights: { korean: string; meaning: string }[];
}

// Presentation fixtures only. The lesson preview does not produce real scores.
export function createResultPreview(kind: ResultKind, areas: Skill[]): LearningResult {
  const counts = {
    daily: { answered: 10, correct: 8, seconds: 302, reviewCount: 2 },
    free: { answered: 5, correct: 4, seconds: 128, reviewCount: 1 },
    review: { answered: 6, correct: 5, seconds: 184, reviewCount: 1 },
  };
  return {
    kind, ...counts[kind], areas,
    highlights: [
      { korean: '학교', meaning: 'school' },
      { korean: '물', meaning: 'water' },
      { korean: '주세요', meaning: 'please give me' },
    ],
  };
}
